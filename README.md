# StreetsOfCanada

Streets of Canada is a website that has the perfect activity for you! This page is for anyone interested in posting or reviewing experiences throughout the city. If you enjoyed hiking in your neighborhood park, saw an artisan fair, or went through a beautiful graffiti wall, share your experiences with our community!

---

## Working in progress/ Next steps

- Upgrade the photo feature - to make it possible for the user to upload their photo
- Implement Redux for state management

---

## Getting Started

The project is deployed and it can be found in the link below:

[Streets of Canada](https://streets-of-canada.onrender.com/)

OR

If you prefer to open the project locally, you can access Streets of Canada by making the clone of this repository in your code editor:

- Go to "Code" in this repository and copy the path HTTPS
- In your code editor, copy the path and clone the project in a new folder
- On the main folder, give the following commands:
  $ npm run build
  $ npm start
- Open the path "http://localhost:3000/" in your browser

---

## Usage

First of all, what is an Activity? Activities are experiences posted by the users about a place they enjoyed, had a good meal, viewed something breathtaking, or just about good hiking in the neighborhood.
On the Home page, you will find a brief explanation of the website and a list of activities. In this first contact with the page, you will be able to filter the activities by city or its "tag" which indicates the type of the place (city, nature, lake/beach, art...)

![Home Page](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/Home_page_fxogby.jpg)
![Home Activity List](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/Home_list_ysn4pr.jpg)

You will also be able to enter a specific activity and view more information about it. These experiences contain a title, description, photo, location on a map, tags, and reviews left by other users.

![Activity view](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/activity_view_uqzlw7.jpg)

After Register or Login, the user now can create activities and make reviews in other posts.

![create Activity](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/create_activity_tcoxem.jpg)

And if you don't like your post or review don't worry, only the owner of the activity or review can Edit or Delete it.

![edit review](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/edit_review_o2xetv.jpg)

This website has also a responsive design to accommodate different sizes of screens.

![Responsive design Activity list](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/Home_list_mobile_y4fyum.jpg)
![Responsive design Activity view](https://res.cloudinary.com/deiacifoni/image/upload/v1677967429/projects/StreetsOfCanada/activity_view_mobile_xn4bd0.jpg)

---

## About the project

The main idea behind this project is to have a page where people can share good experiences and nice places to visit without necessarily being famous locations. Touristic attractions are usually crowded and expensive, so why not explore good experiences in our community?

### Planning

The first approach to building Streets of Canada was to make a rough sketch of the page with its very detailed functionalities, and the features to be added to enhance the user experience.

After learning PostgreSQL, I made a list of all the elements that would need to be included in the database and sketched the possible SQL tables needed as follows:

![Illustration of SQL tables](https://res.cloudinary.com/deiacifoni/image/upload/v1678304460/projects/StreetsOfCanada/diagram-tables_zqx4ah.jpg)

After the database tables were defined, it was crucial to make a list of CRUD (Create, Read, Update, Delete) functions related to the main elements such as Activities, Reviews, Users, and others, and list the respective REST API routes to be used in the back-end.

The project was then broken down into smaller tasks to be accomplished and I started the build of the database Schema, the back-end routes, and the front-end.

### Features

Streets of Canada has some differentiated features to enhance the user experience.

- Session cookies - authenticates the user to stay logged in to the webpage, and also authorizes the user to create posts and reviews, and edit and delete their creations.
- Reviews - it allows other users to make comments and rate the experiences posted.
- Responsiveness - the style of the page is supported for different sizes of screen.
- Map - to localize and show where the activity takes place for the users.
- Filters - it will select the activities of the chosen city or tag.
- Autocomplete - it will help the user by showing the right name of the city or tag.
- Multiple Autocomplete - the user will be able to select multiple tags for the activity they are posting.

### Built with

This application was built with:

- JavaScript
- React
- Express.js
- PostgreSQL
- Maps - Leaflet
- Tailwind
- Material UI
- HTML

---

## Contact

Andreia Cifoni - andreiacifoni@gmail.com

Linkedin: https://linkedin.com/in/andreiacifoni
