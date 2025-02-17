const domain = "http://localhost:8080";

export const SummaryApi = {
  // Authentication
  register: {
    url: `${domain}/register`,
    method: "POST",
  },
  login: {
    url: `${domain}/login`,
    method: "POST",
  },
  updateRole: {
    url: `${domain}/role`,
    method: "PUT",
  },
  updateUserById: {
    url: (id) => `${domain}/update/${id}`,
    method: "PUT",
  },
  deleteUser: {
    url: (id) => `${domain}/delete/${id}`,
    method: "DELETE",
  },
  getUserById: {
    url: (id) => `${domain}/user/${id}`,
    method: "GET",
  },
  getAllUsers: {
    url: `${domain}/all`,
    method: "GET",
  },

  // Job APIs
  createJob: {
    url: `${domain}/jobs`,
    method: "POST",
  },
  getJobs: {
    url: `${domain}/jobs`,
    method: "GET",
  },
  getJobById: {
    url: (id) => `${domain}/jobs/${id}`,
    method: "GET",
  },
  updateJob: {
    url: (id) => `${domain}/jobs/${id}`,
    method: "PUT",
  },
  deleteJob: {
    url: (id) => `${domain}/jobs/${id}`,
    method: "DELETE",
  },

  // Request APIs
  createRequest: {
    url: `${domain}/request`,
    method: "POST",
  },
  getAllRequests: {
    url: `${domain}/request`,
    method: "GET",
  },
  getRequestById: {
    url: (id) => `${domain}/request/${id}`,
    method: "GET",
  },
  updateRequest: {
    url: (id) => `${domain}/request/${id}`,
    method: "PUT",
  },
  deleteRequest: {
    url: (id) => `${domain}/request/${id}`,
    method: "DELETE",
  },

  // Product APIs
  createProduct: {
    url: `${domain}/products`,
    method: "POST",
  },
  getProducts: {
    url: `${domain}/products`,
    method: "GET",
  },
  getProductById: {
    url: (id) => `${domain}/products/${id}`,
    method: "GET",
  },
  updateProduct: {
    url: (id) => `${domain}/products/${id}`,
    method: "PUT",
  },
  deleteProduct: {
    url: (id) => `${domain}/products/${id}`,
    method: "DELETE",
  },

  // Product Nature APIs
  createNature: {
    url: `${domain}/nature`,
    method: "POST",
  },
  getAllNatures: {
    url: `${domain}/natures`,
    method: "GET",
  },
  getNatureById: {
    url: (id) => `${domain}/nature/${id}`,
    method: "GET",
  },
  updateNature: {
    url: (id) => `${domain}/nature/${id}`,
    method: "PUT",
  },
  deleteNature: {
    url: (id) => `${domain}/nature/${id}`,
    method: "DELETE",
  },

  // Product Type APIs
  createType: {
    url: `${domain}/type`,
    method: "POST",
  },
  getAllTypes: {
    url: `${domain}/types`,
    method: "GET",
  },
  getTypeById: {
    url: (id) => `${domain}/type/${id}`,
    method: "GET",
  },
  updateType: {
    url: (id) => `${domain}/type/${id}`,
    method: "PUT",
  },
  deleteType: {
    url: (id) => `${domain}/type/${id}`,
    method: "DELETE",
  },
};

export default SummaryApi;
