import api from "@/api/axios";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants";

export const getAllPost = async (
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PER_PAGE,
) => {
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
