import api from "@/api/axios";

export const getAllUser = async () => {
  try {
    const response = await api.get("/users?page=1&per_page=100");
    return {
      data: response.data,
      total: response.headers["x-pagination-total"],
    };
  } catch (e) {
    console.error("Error fetching posts:", e);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (e) {
    console.log("Error fetching post with id ${id}: ", e);
  }
};
