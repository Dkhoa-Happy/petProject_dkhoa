import api from "@/api/axios";

export const getAllPost = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (e) {
    console.error("Error fetching posts:", e);
  }
};
