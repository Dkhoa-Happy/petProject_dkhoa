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
    return [];
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

export const createPost = async (
  user_id: number,
  title: string,
  body: string,
) => {
  try {
    const response = await api.post(`/users/${user_id}/posts`, {
      title,
      body,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating post:", error);
    // Ném lỗi để hàm gọi có thể xử lý
    throw error.response?.data || error.message || "Unknown error occurred";
  }
};

export const updatePost = async (id: number, title: string, body: string) => {
  try {
    const response = await api.put(`/posts/${id}`, {
      title,
      body,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
};

export const deletePost = async (id: number) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const searchPost = async (title?: string, body?: string) => {
  try {
    const params: Record<string, string> = {};

    if (title) params.title = title;
    if (body) params.body = body;

    const response = await api.get("/posts", { params });

    return response.data;
  } catch (e) {
    console.error(
      `Error searching for post with${title ? ` title "${title}"` : ""}${
        body ? ` body "${body}"` : ""
      }:`,
      e,
    );
    return null;
  }
};
