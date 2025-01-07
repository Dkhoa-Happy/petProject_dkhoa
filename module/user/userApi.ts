import api from "@/api/axios";

export const getAllUser = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (e) {
    console.error("Error fetching posts:", e);
  }
};
