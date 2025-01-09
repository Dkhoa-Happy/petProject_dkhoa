import api from "@/api/axios";

export const getAllPost = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for page ${page}:`, error);
    return []; // Return an empty array if an error occurs
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
