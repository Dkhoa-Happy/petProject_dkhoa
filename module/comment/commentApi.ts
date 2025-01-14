import api from "@/api/axios";

export const getCommentByPostId = async (post_id: number) => {
  try {
    const response = await api.get(`/posts/${post_id}/comments`);
    return response.data;
  } catch (e) {
    console.log(`Error fetching post with user Id ${post_id}: `, e);
    throw new Error("Failed to fetch comment!");
  }
};
