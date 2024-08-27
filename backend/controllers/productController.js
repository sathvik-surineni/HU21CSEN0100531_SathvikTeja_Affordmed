const { fetchProducts } = require('../services/productServices');
const { authenticate } = require('../services/authServices');

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = [
  "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse",
  "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset",
  "Laptop", "PC"
];

const getProducts = async (req, res) => {
  const { company, category, minPrice, maxPrice, topN } = req.query;

  if (!companies.includes(company)) {
    return res.status(400).json({ message: "Invalid company name" });
  }

  if (!categories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    // Authenticate if the token is not present or expired
    await authenticate();

    // Fetch products
    const products = await fetchProducts(company, category, minPrice, maxPrice, topN);
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

module.exports = {
  getProducts
};
