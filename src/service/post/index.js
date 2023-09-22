import api from "../axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const usePostsApi = () => {
  const createPost = async (data) => api.post("/blog", { ...data }, config);
  const editPost = async (data, id) => api.patch(`/blog/${id}`, { ...data }, config);
  const getPosts = async () => api.get("/blog");
  const getOnePostById = async (id) => api.get(`/blog/${id}`);
  const deletePost = async (id) => api.delete(`/blog/${id}`, config);

  return {
    createPost,
    editPost,
    getPosts,
    getOnePostById,
    deletePost,
  };
};

export default usePostsApi;
