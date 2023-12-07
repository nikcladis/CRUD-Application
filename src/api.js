// api.js
const API_URL = "https://jsonplaceholder.typicode.com/users";

const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching data with status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchData };
