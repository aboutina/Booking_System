// utils/api.js

// utils/api.js
import axios from "axios";
import { Auth, Booking, Room, User } from "./interface";
import useAuth from "./../components/hooks/useAuth";
import { cache } from "react";

export const API_URL = "http://127.0.0.1:8000/api"; // Replace with your Laravel backend URL
// Bookings
export const getBookings = async (token: string) => {
  const response = await axios.get(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createBooking = async (bookingData: Booking, token: string) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBooking = async (
  id: number,
  bookingData: Booking,
  token: string
) => {
  const response = await axios.put(`${API_URL}/bookings/${id}`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteBooking = async (id: number, token: string) => {
  const response = await axios.delete(`${API_URL}/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Users
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(`${API_URL}/users/email/${email}`);
  return response.data;
};

export const createUser = async (userData: User) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id: number, userData: User) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

// Rooms
export const getRooms = async () => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data;
};

export const getRoom = async (id: number) => {
  const response = await axios.get(`${API_URL}/rooms/${id}`);
  return response.data;
};

export const createRoom = async (formData: FormData, token: string) => {
  const response = await axios.post(`${API_URL}/rooms`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateRoom = async (id: number, roomData: Room, token: string) => {
  const response = await axios.put(`${API_URL}/rooms/${id}`, roomData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteRoom = async (id: number, token: string) => {
  const response = await axios.delete(`${API_URL}/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//auth
export const login = async (auth: Auth) => {
  const response = await axios.post(`${API_URL}/login`, auth);
  return response.data;
};
