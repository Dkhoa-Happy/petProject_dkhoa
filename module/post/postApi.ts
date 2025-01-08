import api from "@/api/axios";

export const getAllPost = async () => {
  try {
    const response = await api.get("/posts?page=1&per_page=100");
    return response.data;
  } catch (e) {
    console.error("Error fetching posts:", e);
  }
};

export const getPostById = async (id: number) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (e) {
    console.log(`Error fetching post with id ${id}: `, e);
  }
};

export const getPostByUserId = async (user_id: number) => {
  try {
    const response = await api.get(`/users/${user_id}/posts`);
    return response.data;
  } catch (e) {
    console.log(`Error fetching post with user Id ${user_id}: `, e);
  }
};
