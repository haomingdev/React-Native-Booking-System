1. Bookie Hotel Booking System 

    This is a React Native Project called "Bookie Hotel Booking System". This project is done in completion of a technical test from AMBtech. 

2. Description

    This project is coded in typescript and javascript. 
    The requirements for this project can be categorized into Basic, API, and Bonus requirements. For now, the *Basic* and *API* requirements were completed. 
    The requirements for *Basic*, *API*, and *Bonus* are as follows:

        2.1 *Basic Requirements:* (Completed as of this version)
        i. User Booking Page
            - The user should see bookings under their name organized in a list
            - The bookings should be represented by a card component
        ii. All bookings page
            - The user should see all bookings
            - The bookings should be represented by a card component
        iii. User profile page*
            - The page should display the user’s details
        iv. Create booking page
            - The user should be able to create bookings in this page. The bookings must contain some kind of user identifier
                a. E.g firstname, lastname (optionally, a user id property)
        v. Booking detail page
            - The user should be able to click into this page to view information about a booking
            - Navigation from clicking a booking card in user booking page or all bookings page

        2.2 *API:* (Completed as of this version)
        i.  Implemented REST CRUD api from: https://restfulbooker.herokuapp.com/apidoc/ in CRUD processes of the application.

        2.3 *Bonus Requirements:* (To be completed in future version)
        i. User booking page
            - Sort and filtering
                a. User can sort by price
                b. User can sort by checkin or checkout date
                c. User can filter depositpaid
            - Delete
                a. User can delete a booking they own
        ii. Update booking page
            - User can update a booking they own
        iii. All bookings page
            - Sort and filtering
                a. User can sort by price
                b. User can sort by checkin or checkout date
                c. User can filter depositpaid
            - Search
                a. User can search by additionalneeds or a property of your choice

3. Dependencies

    Required Application: 
        - Expo Go (Preferably on Android mobile)
        - Expo CLI
        - NPM / Yarn package installer

4. Getting Started and Installation

    4.1 Cloning
        4.1.1 Using GitHub CLI 
            Enter the following command in the terminal: 
            *gh repo clone haomingdev/react-native-booking-system*

        4.1.2 Using HTTPS / VS Code Git Tools
            Enter the following URL in the Git Clone column: 
            *https://github.com/haomingdev/react-native-booking-system.git*


5. Executing program

    5.1 Navigate to the root directory of the project, then in the terminal, run the following command: 
    *npm start*

    5.2 You should see a QR code in the terminal. Scan the QR code on Expo Go mobile application to access the Application.

6. Limitation

    i. The application was not styled using Tailwind Framework.
    ii. Lack of testing documentation
    