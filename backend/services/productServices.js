const axios = require('axios');
const { API_URL } = require('../config/authConfig');
const { getBearerToken } = require('../services/authServices');

const fetchProducts = async (company, category, minPrice, maxPrice, n) => {
  let products = [];
  const bearerToken = getBearerToken();

  try {
    const response = await axios.get(
      `${API_URL}/${company}/categories/${category}/products`,
      {
        params: { top: n, minPrice, maxPrice },
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    products = response.data;
  } catch (error) {
    console.error(`Error fetching products from ${company}:`, error.message);
  }

  return products;
};

module.exports = {
  fetchProducts
};
