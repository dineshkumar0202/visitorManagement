import { Chip } from "@mui/material";

const StatusChip = ({ status }: { status: string }) => {
  let color: "success" | "warning" | "error" | "default" = "default";
  if (status === "Entered") color = "success";
  if (status === "Exited") color = "warning";
  if (status === "Deleted") color = "error";

  return (
    <Chip
      label={status}
      color={color}
      size="small"
    />
  );
};

export default StatusChip;