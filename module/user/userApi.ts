import api from "@/api/axios";

export const getAllUser = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await api.get("/users", {
      params: {
        page,
        per_page: perPage,
      },
    });

    const total = parseInt(response.headers["x-pagination-total"] || "0", 10);

    return {
      data: response.data || [],
      total,
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
