// carsapi.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://servercar.vercel.app",
});

export const getAvailableCars = async (sortBy = "date", order = "desc") => {
  try {
    const res = await API.get("/available-cars", {
      params: { sortBy, order },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Failed to fetch available cars:", error);
    return [];
  }
};
