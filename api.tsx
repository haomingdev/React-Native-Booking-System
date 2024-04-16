import { BookingDates, Bookings } from "./screens/Types";

// api.js
const API_AUTH_URL = 'https://restful-booker.herokuapp.com';
const API_BOOKINGID_URL = 'https://restful-booker.herokuapp.com/booking';

//for auth api 
export async function getAuthToken() {
    try {
        const response = await fetch(`${API_AUTH_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'password123',
            }),
        });
        const json = await response.json();
        return json.token; // Returns the token
    } catch (error) {
        console.error('Error fetching auth token:', error);
    }
}

//get booking id, filter by user's name
export async function getBookingIds(firstName: string, lastName:string) {
    try {
        const response = await fetch(`${API_BOOKINGID_URL}?firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Booking ID for ${firstName}:`, error);
    }
}

//get booking id, filter by user's name
export async function getBookingIdsDate(firstName: string, lastName:string, dateQuery:string) {
    try {
        const response = await fetch(`${API_BOOKINGID_URL}?firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}${dateQuery}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Booking ID (date filter) for ${firstName}:`, error);
    }
}

//get all booking id
export async function getBookingIdsAll() {
    try {
        const response = await fetch(`${API_BOOKINGID_URL}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Booking ID:', error);
    }
}

//get booking id, filter by user's name
export async function getBookingIdsAllDate(dateQuery:string) {
    try {
        const response = await fetch(`${API_BOOKINGID_URL}?${dateQuery}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Booking ID (date filter):`, error);
    }
}

//create new booking
export async function createBooking(newBooking: Bookings) {
    try {
        const response = await fetch(`${API_BOOKINGID_URL}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify(newBooking),
        });
        if (!response.ok) {
            throw new Error('Something went wrong with the booking');
        }
        const responseData = await response.json();
        // Handle the response data as needed
        console.log("From createBooking api: ", responseData);
        return responseData;
    } catch (error) {
        console.error('Error creating new Booking:', error);
    }
}

// get booking details according to bookingID parameter accepted 
export async function getBookingDetail(id: string) {
    try {       
        const response = await fetch(`${API_BOOKINGID_URL}/${encodeURIComponent(id)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            return {};
            throw new Error('Something went wrong with the booking');
        }
        const responseData = await response.json();
        console.log("From getBookingDetail api: ", responseData);
        return responseData;
    } catch (error) {
        console.error(`Error getting booking detail for bookingID ${id}:`, error);
        return {};
        throw error;  
    }
}

// delete booking according to bookingID parameter accepted
export async function getDeleteBooking(id: string) {
    try {       
        console.log(`Received id: ${id}`)
        const token = await getAuthToken();
        console.log(`Token is: ${token}`)
        const response = await fetch(`${API_BOOKINGID_URL}/${encodeURIComponent(id)}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`,
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete booking: ${errorText || response.statusText}`);
        }
        console.log("From getDeleteBooking api: Delete operation was successful");
        return; 
    } catch (error) {
        console.error(`Error deleting booking for bookingID ${id}:`, error);
        throw error;
    }
}

// update booking, according to bookingID parameter accepted
export async function putUpdateBooking(id: string, bookingDetails: Bookings) {
    try {       
        console.log(`Received id: ${id}`)
        const token = await getAuthToken();
        console.log(`Token is: ${token}`)
        const response = await fetch(`${API_BOOKINGID_URL}/${encodeURIComponent(id)}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`,
            }, 
            body: JSON.stringify(bookingDetails),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update booking: ${errorText || response.statusText}`);
        }
        const responseData = await response.json();
        console.log("From putUpdateBooking api: Update operation was successful: ", responseData);
        return responseData; 
    } catch (error) {
        console.error(`Error updating booking for bookingID ${id}:`, error);
        throw error;
    }
}