const axios = require('axios');
const { AUTH_URL, CLIENT_ID, CLIENT_SECRET, COMPANY_NAME, OWNER_NAME, OWNER_EMAIL, ROLL_NO } = require('../config/authConfig');

let bearerToken = null;

const authenticate = async () => {
  try {
    const authResponse = await axios.post(AUTH_URL, {
      companyName: COMPANY_NAME,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      ownerName: OWNER_NAME,
      ownerEmail: OWNER_EMAIL,
      rollNo: ROLL_NO
    });

    bearerToken = authResponse.data.access_token;
    console.log("Authenticated successfully. Token obtained.");
  } catch (error) {
    console.error("Error during authentication:", error.message);
    throw new Error("Authentication failed");
  }
};

module.exports = {
  authenticate,
  getBearerToken: () => bearerToken
};
