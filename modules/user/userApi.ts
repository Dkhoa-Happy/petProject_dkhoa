import api from "@/api/axios";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants";

export const getAllUser = async (
  page: number = DEFAULT_PAGE,
  perPage: number = DEFAULT_PER_PAGE,
) => {
  try {
    const response = await api.get("/users", {
      params: {
        page,
        per_page: perPage,
      },
    });

    // Use the custom total property from the response
    return {
      data: response.data || [],
      total: response.total || 0,
    };
  } catch (e) {
    console.error(
      `Error fetching users for page ${page} with perPage ${perPage}:`,
      e,
    );
    return {
      data: [],
      total: 0,
    };
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

export const searchUser = async (name?: string, email?: string) => {
  try {
    const params: Record<string, string> = {};

    if (name) params.name = name;
    if (email) params.email = email;

    const response = await api.get("/users/", { params });

    return response.data;
  } catch (e) {
    console.error(
      `Error searching for user with${name ? ` name "${name}"` : ""}${email ? ` email "${email}"` : ""}:`,
      e,
    );
    return null;
  }
};

export const filterStatusUser = async (status?: string) => {
  try {
    const params = status ? { status } : {};

    const response = await api.get("/users/", { params });

    return response.data;
  } catch (e) {
    console.error(
      `Error fetching users with${status ? ` status "${status}"` : ""}:`,
      e,
    );
    return [];
  }
};
