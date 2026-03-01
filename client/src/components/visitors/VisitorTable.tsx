import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Pagination,
    Stack,
} from "@mui/material";
import StatusChip from "./StatusChip";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";

interface Visitor {
    _id: string;
    name: string;
    phone: string;
    flatNumber: string;
    address?: string;
    entryTime: string;
    exitTime?: string;
    status: string;
}

interface Props {
    visitors: Visitor[];
    totalPages: number;
    page: number;
    onPageChange: (value: number) => void;
    onExit: (id: string) => void;
    onDelete: (id: string) => void;   // ✅ Added delete prop
}

const VisitorTable = ({
    visitors,
    totalPages,
    page,
    onPageChange,
    onExit,
    onDelete,
}: Props) => {
    const { role } = useAuth();   // ✅ Role inside component

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Flat</TableCell>
                        <TableCell>Entry</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {visitors.map((visitor) => (
                        <TableRow key={visitor._id}>
                            <TableCell>{visitor.name}</TableCell>
                            <TableCell>{visitor.phone}</TableCell>
                            <TableCell>{visitor.address || "-"}</TableCell>
                            <TableCell>{visitor.flatNumber}</TableCell>
                            <TableCell>
                                {new Date(visitor.entryTime).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <StatusChip status={visitor.status} />
                            </TableCell>

                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {/* Exit Button */}
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<ExitToAppIcon />}
                                        disabled={visitor.status === "Exited" || visitor.status === "Deleted"}
                                        onClick={() => onExit(visitor._id)}
                                    >
                                        Exit
                                    </Button>

                                    {/* Delete Button (Admin Only) */}
                                    {role === "Admin" && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => onDelete(visitor._id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => onPageChange(value)}
                sx={{ mt: 2 }}
            />
        </>
    );
};

export default VisitorTable;