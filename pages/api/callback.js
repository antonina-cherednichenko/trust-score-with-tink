import fetch from 'isomorphic-unfetch'
require('dotenv').config()

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const TINK_API_URL = process.env.TINK_API_URL;

export default async (req, res) => {
  try {
    const code = req.url.split('code=')[1];
    const tokenResponse = await getAccessToken(code);
    const dataResponse =  await getData(tokenResponse.access_token);
    res.status(200).json(dataResponse);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: err.toString() });
  }
}

async function getAccessToken(code) {
  const body = {
    code: code,
    client_id: CLIENT_ID, // Your OAuth client identifier.
    client_secret: CLIENT_SECRET, // Your OAuth client secret. Always handle the secret with care.
    grant_type: "authorization_code"
  };

  const req = {
    method: "POST",
    body: Object.keys(body)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
      .join("&"),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  }

  const response = await fetch(TINK_API_URL + "/oauth/token", req);

  return handleResponse(response);
}

async function getData(accessToken) {
  const [
    categoryData,
    userData,
    accountData,
    investmentData,
    transactionData,
    statisticsData,
  ] = await Promise.all([
    getCategoryData(accessToken),
    getUserData(accessToken),
    getAccountData(accessToken),
    getInvestmentData(accessToken),
    getTransactionData(accessToken),
    getStatistics(accessToken),
  ]);

  // Print results
  console.log("Category data = ", categoryData);
  console.log("User data = ", userData);
  console.log("Account data = ", accountData);
  console.log("Investment data = ", investmentData);
   console.log("Transaction data = ", transactionData);
   console.log("Statistics data = ", statisticsData);

  return {
    categoryData,
    userData,
    accountData,
    investmentData,
    transactionData,
    statisticsData
  };
}

async function getUserData(token) {
  const response = await fetch(TINK_API_URL + "/user", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return handleResponse(response);
}

async function getAccountData(token) {
  const response = await fetch(TINK_API_URL + "/accounts/list", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  return handleResponse(response);
}

async function getInvestmentData(token) {
  const response = await fetch(TINK_API_URL + "/investments", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });

  return handleResponse(response);
}

async function getTransactionData(token) {
  const response = await fetch(TINK_API_URL + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ limit: 5 })
  });

  return handleResponse(response);
}

async function getCategoryData(token) {
  const response = await fetch(TINK_API_URL + "/categories", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return handleResponse(response);
}

async function getStatistics(token) {
  console.log("body = ", {
    description: "ed909bd383f245aabab53d3e3ee8e4bf",
    padResultUntilToday: true,
    periods: ["2014-02-11","2014-02-12"],
    resolution: "DAILY",
    types: ["expenses-by-category"]
  });

  const response = await fetch(TINK_API_URL + "/statistics/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      description: "ed909bd383f245aabab53d3e3ee8e4bf",
      padResultUntilToday: true,
      periods: ["2019"],
      resolution: "YEARLY",
      types: ["expenses-by-category"]
    })
  });

  return handleResponse(response);
}


async function handleResponse(response) {
  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}
