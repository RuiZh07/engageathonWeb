import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL_LOGIN = "https://app.engageathon.com/api/auth/login/";
const API_BASE_URL_REGISTER = "https://app.engageathon.com/api/auth/register/";
const API_BASE_URL_INVITE = "https://app.engageathon.com/api/auth/invite/";
const API_BASE_URL_PASSWORD_RESET = "https://app.engageathon.com/api/auth/password/reset/email/";

const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  try {
    const response = await axios.post(`${API_BASE_URL_LOGIN}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { account_type, email, first_name, last_name, id, token } =
      response.data;

    // You can use the user data and token as needed in the application
    console.log("User Data:", {
      account_type,
      email,
      first_name,
      last_name,
      id,
      token,
    });
    console.log("Access Token:", token);

    await AsyncStorage.setItem("AccessToken", token)
    return {
      userData: { account_type, email, first_name, last_name, id },
      token,
    };
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

const signup = async (accountType, email, firstName, lastName, password) => {
  const data = {
    account_type: accountType,
    email,
    first_name: firstName,
    last_name: lastName,
    password,
  };

  try {
    const response = await axios.post(`${API_BASE_URL_REGISTER}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { account_type, email } = response.data;

    console.log("User Data:", {
      accountType: account_type,
      email,
    });

    return {
      userData: {
        accountType: account_type,
        email,
      },
    };
  } catch (error) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};

const invite = async (user_email, invitee_email) => {
  const data = {
    user_email,
    invitee_email,
  };

  try {
    const response = await axios.post(`${API_BASE_URL_INVITE}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Invite Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Invite failed:", error.message);
    throw error;
  }
};

const resetPassword = async (user_email) => {
  const data = {
    email: user_email,
  };

  try {
    const response = await axios.post(`${API_BASE_URL_PASSWORD_RESET}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Password Reset Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Password Reset failed:", error.message);
    throw error;
  }
};

export default {
  login,
  signup,
  invite,
  resetPassword,
};