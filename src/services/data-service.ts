const API_URL = import.meta.env.VITE_API_URL;

type Params = { [key: string]: string };

const getAuthHeaders = () => {
  const token = window.localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : ""
  };
};

export const DataService = {
  async getData(endpoint: string, params?: Params) {
    try {
      const url = new URL(`${API_URL}${endpoint}`);
      if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: getAuthHeaders()
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async postData(endpoint: string, data: object) {
    try {
      const url = new URL(`${API_URL}${endpoint}`);
      const response = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async putData(endpoint: string, data: object) {
    try {
      const url = new URL(`${API_URL}${endpoint}`);
      const response = await fetch(url, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async deleteData(endpoint: string) {
    try {
      const url = new URL(`${API_URL}${endpoint}`);
      const response = await fetch(url, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      return { status: response.status, message: "Delete successful" };
    } catch (error) {
      throw error;
    }
  }
};
