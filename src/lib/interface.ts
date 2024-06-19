export interface Booking {
  user_id: number;
  room_id: number;
  start_date: string;
  end_date: string;
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
}

export interface User {
  name: string;
  email: string;
  role: "admin" | "manager" | "receptionist" | "guest";
  phone_number: string;
  password?: string;
}

export interface Room {
  type: string;
  price: number;
  status: "available" | "booked" | "maintenance";
  img?: string;
  room_number?: number;
}

export interface Room_data {
  created_at: string;
  id: number;
  img: string;
  price: string;
  room_number: string;
  status: string;
  type: string;
  updated_at: string;
}

export interface Auth {
  email: string;
  password: string;
}

export type UseCreateBooking = {
  checkin: Date | null;
  checkout: Date | null;
  roomId: number;
};

export interface Profile {
  id: number;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  bookings?: Booking_data[];
}

interface Room_booking {
  created_at: string;
  id: number;
  img: string;
  price: string;
  room_number: string;
  status: string;
  type: string;
  updated_at: string;
}

export interface Booking_data {
  id: number;
  user_id: number;
  room_id: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: Profile;
  room: Room_booking;
}
