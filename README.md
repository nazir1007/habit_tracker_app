# Habit_Tracker_App

A Habit Tracker App are created using express, ejs and mongoDb. A user can register and login using email
and create a new habit and can see in daily and weekly views and also track habit.

Following features are implementd in the app which is given below : 

Features : 
   - Add multiple habits to track like reading a book, going to the gym etc.
   - Track each habit everyday. These are the 3 statuses of a habit :
   
         - Done - Mark the habit as done for a day
         - Not done - Mark the habit as not done for a day
         - None - User did not take any action on a habit for a day
         
   - A view to show all current habits. Here given an add button we can add a new habit and can track habit.
   - A view to display 7 days of each habit :
   
         - Show today where user can mark todays habit.
         - And user can show the previous 6 days and the status of that habit for each day
         - A user can toggle between the three statuses of a habit.
         - Also I should be able to change any of the previous days status.


## Version

- ejs - v3.1.8
- node - v16.14.2
- dotenv - v16.0.3
- connect-flash - v0.1.1
- express - v4.18.2
- express-ejs-layouts - v2.5.1
- express-session - v1.17.3
- mongoose - v6.9.1
- nodemon - v2.0.20

## created_at

07 feb 2023

## To Start

- `$ npm start`
- `$ base url = 127.0.0.1:5000`
