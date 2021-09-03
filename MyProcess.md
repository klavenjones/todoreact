# First hour: Planning the project

After receiving the email on Monday, I was thinking of ways to attack this project head-on. The first thing I thought about was making this project aesthetically pleasing to the eye. So I looked at ways to design this project and do it so that it does not stray too far from the mockups I received. I'll admit, I decided to keep it the exact structure of the mockup to be safe and prevent myself from getting too carried away. So I decided to pick some cool color schemes and move on from there. Next was going into how I should build the application. I typically build web apps with Nextjs and React, and I thought about making this app in Gatsby since the company works with it, but since I don't know Gatsby yet, I played it safe again. I wanted to make sure I follow instructions. So I decided to use the standard create-react-app.  

# The next 3 hours: App Design and Login Screen Functionality

After work, on Tuesday, I began the project. I decided to style in Sass cause it's great, and it's a joy to use because of the syntactic sugar it provides. I spent a bit designing the application, and once finished, it was on to the login functionality. Everything was going smooth until I got tripped upon making a request to the login API. I was held up for a bit because the data I sent to the API was not valid. I realized the client-side data I was sending needed to be appended to the FormData object and sent as multipart/form-data. Maybe that's a PHP thing, or maybe that's how the server was built. I'm used to sending normal application/JSON data to the server, so I was a bit stuck until google saved the day. Once I figured that out, I created a User context component to save the state of the user response. 


# The last 3 Hours: TODO Page and Refactoring

The next night, I created the TODO app functionality, saved the Todos to localStorage, and used uuid to create a unique ID for each todo. I used react-toast for the todo validation and react-hook-forms to help me with handling user input. I also used it with the Login screen. After completing the app, I did some refactoring and cleaning up, a little bit of testing, and deployed the application.



