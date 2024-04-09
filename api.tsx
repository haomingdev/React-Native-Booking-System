// api.js
const API_BASE_URL = 'https://restful-booker.herokuapp.com';

//for auth api 
// arrow function: export const getAuthToken = async () => {
export async function getAuthToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth`, {
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

// You can define other API calls here and export them similarly.