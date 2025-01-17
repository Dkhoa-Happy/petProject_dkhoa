import api from "@/api/axios";

export const getCommentByPostId = async (
  post_id: number,
  page: number = 1,
  limit: number = 10,
) => {
  try {
    const response = await api.get(`/posts/${post_id}/comments`, {
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return response.data;
  } catch (e) {
    console.log(
      `Error fetching comments for post ID ${post_id}, page ${page}: `,
      e,
    );
    throw new Error("Failed to fetch comments!");
  }
};
