import api from "./api";

export const getVisitors = async (
  page: number,
  limit: number,
  search: string,
  status: string = ""
) => {
  const response = await api.get(
    `/visitors?page=${page}&limit=${limit}&search=${search}&status=${status}`
  );
  return response.data;
};

export const markVisitorExit = async (id: string) => {
  const response = await api.patch(`/visitors/${id}/exit`);
  return response.data;
};

export const addVisitor = async (visitorData: {
  name: string;
  phone: string;
  address?: string;
  flatNumber: string;
  purpose: string;
}) => {
  const response = await api.post("/visitors", visitorData);
  return response.data;
};

export const deleteVisitor = async (id: string) => {
  const response = await api.delete(`/visitors/${id}`);
  return response.data;
};