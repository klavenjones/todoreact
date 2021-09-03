# First hour: Planning the project

After receiving the email, Monday, I was thinking of ways I can attack this project head on. First thing I thought about was making this project aesthetically pleasing to the eye. So I looked at ways to design this project, and doing it in a way that does not stray to far from the mockups I received. I'll admit, I decided to keep it the exact structure of the mockup to be safe, and prevent myself from getting too carried away. So I decided to just pick some cool color schemes and move on from there. Next, was going into how I should build the application. I typically build web apps, with Nextjs and React, and I thought about building this app in Gatsby, since the company works with it, but I since don't know Gatsby yet, and again I played it safe. I wanted to make sure I follow instructions. So I decided to use the standard create-react-app.  

# The next 3 hours: App Design and Login Screen Functionality

After work, on Tuesday, I began the project, I decided to style in Sass, cause it's great and it's a joy to use because of the Syntatic Sugar it provides. I spent a bit designing the application, and once I was done it was on to the Login functionality. Everything was going smooth until I got tripped up on making a request to the login api. I was held up for a bit, because the data, I was sending to the API was not valid, I realized the client side data I was sending needed to be appended to the FormData object, and sent as multipart/form-data. Maybe that's a PHP thing or maybe that's how the server was setup. I'm used to sending normal application/json data to the server, so I was a bit stuck, until google saved the day. Once I figured that out I created a User context component to save the state of the user response. 


# The last 3 Hours: TODO Page and Refactoring

The next night, I created the TODO app functionality, I saved the Todos to localStorage, and used uuid to create a unique ID for each todo. I also saved the userId of the user logged in, each time I created a todo, so that I can associate that user with them. I used react-toast for the todo validation, and react-hook-forms to help me with handling user input. I also used it with the Login screen. After completing the app, I did some refactoring, and cleaning up and deployed the application.



