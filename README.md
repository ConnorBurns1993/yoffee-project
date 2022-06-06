Live Link: https://yoffee.herokuapp.com/
GitHub Wiki: https://github.com/ConnorBurns1993/yoffee-project/wiki

About

Do you ever wish you could just find a new coffee shop, without sifting through restaurants? Yoffee is exactly like the popular site Yelp, except for coffee! Find the best coffee in town with Yoffee!

Building Instructions

1. Download the repository from GitHub.
2. Navigate into both the frontend and backend directories and run npm install to download the necessary dependencies.
3. In the backend directory, create an .env file with appropriate corresponding data to the already existing .env.example file.
4. Run npx dotenv sequelize db:migrate and npx dotenv sequelize db:seed:all to migrate and seed the database.
5. In both the frontend and backend directories in seperate terminals, run npm start to start the server and to view the site on localhost 3000.

Future Features

-Likes
-Google API
-Friends
