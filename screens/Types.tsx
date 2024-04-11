import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface User {
  firstname: string;
  lastname: string;
};

export const userDefault: User = {
  firstname: "Sally",
  lastname: "Brown",
  }

export interface BookingId {
  bookingid:number;
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Bookings {
  firstname: string;
  lastname: string;
  totalprice: Double;
  bookingdates: BookingDates;
  depositpaid: boolean;
  additionalneeds: string;
  bookingid?: number;
}

  