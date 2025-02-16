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

  // User APIs
  getConsigneeUsers: {
    url: `${domain}/consignee`,
    method: "GET",
  },
  getConsignorUsers: {
    url: `${domain}/consignor`,
    method: "GET",
  },
  getAllUsers: {
    url: `${domain}/all`,
    method: "GET",
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
    url: `${domain}/products/nature`,
    method: "POST",
  },
  getAllNatures: {
    url: `${domain}/products/natures`,
    method: "GET",
  },
  getNatureById: {
    url: (id) => `${domain}/products/nature/${id}`,
    method: "GET",
  },
  updateNature: {
    url: (id) => `${domain}/products/nature/${id}`,
    method: "PUT",
  },
  deleteNature: {
    url: (id) => `${domain}/products/nature/${id}`,
    method: "DELETE",
  },

  // Product Type APIs
  createType: {
    url: `${domain}/products/type`,
    method: "POST",
  },
  getAllTypes: {
    url: `${domain}/products/types`,
    method: "GET",
  },
  getTypeById: {
    url: (id) => `${domain}/products/type/${id}`,
    method: "GET",
  },
  updateType: {
    url: (id) => `${domain}/products/type/${id}`,
    method: "PUT",
  },
  deleteType: {
    url: (id) => `${domain}/products/type/${id}`,
    method: "DELETE",
  },
};

export default SummaryApi;
