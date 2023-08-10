# Welcome to our TTP-CAPSTONE project.

# User Will Be Able To:
-  **Log in or sign up** to the service to mange his resturant.
- **Select or create the necessary tables** for his restaurant.
- **Select the food that is ordered** by the customer and be able to add it to the to table order.
- **Select or create the necessary food categories** for his restaurant.
- Finish the table order and make the table marked as free and get the checkout for the table.
- Get the daily report in Excel format.
- See **How much money he made per a day** for everyday.
***
# How to Install the code.
1. go to your terminal by going to the search bar buttom-left of the window and type terminal or go to your Vs code terminal.
2. then do `ls` in your terminal to see all your files and folder ,afterthat, do `cd` to go to the folder where you gonna install the code. 
3. At the end, copy the link from the green button `Code` on the our main page, Then do `git clone `+Link \ or just do: ```git clone https://github.com/ErlisI/TTP-CAPSTONE.git```. (if nothing from these methods work download it from the same button `Code` as ZIP file) 
***
# how to setup the program
- When you finish downloading or installing the application. Do the commend ```cd .\TTP-CAPSTONE\```
- then do the commend `code .` after the VS Code open close the terminal that you were using.
- Now go to the vs code terminal and splite it to two terminal or open a second terminal pressing the +. 
- do ```cd .\frontend\``` to go insidethe frontend folder and in the splited terminal do ```cd .\backend\```
- in the first terminal you should have in the terminal *TTP-CAPSTONE\backend>* and in the second terminal you should have *TTP-CAPSTONE\frontend>* at the last folder you entered.\
- Do the commends

|In Front-End |
| -------- | 
|npm install|
| |  

|In the backend|
| ------   |
|npm install|
- Then go to your terminal and run 
`sudo -su postgres`Then run `psql` and inside the psql terminal run these commends 
```
CREATE ROLE runner_db_user WITH LOGIN PASSWORD 'password';
ALTER ROLE runner_db_user CREATEDB;
CREATE DATABASE runner_db;
ALTER DATABASE runner_db OWNER TO runner_db_user;
```
- After that: make a .env file in the back-end folder by press add file on topleft of VScode or by running the terminal `touch .env`, Then put these
info in the `.env` file/
```
DB_USER=runner_db_user
DB_HOST=localhost
DB_NAME=runner_db
DB_PASSWORD=password
DB_PORT=5432
```
Lastly go again to the normal terminal and run these commands
```
npm install --save sequelize sequelize-cli pg-hstore
npx sequelize-cli init
npx sequelize-cli db:migrate
```
go back to where you do the npm install where the front is and then  run
in the front end and
```
npm run dev 
```
on the back end
```
npm start 
``` 
Finally, press the link that appears in the front end's terminal to open the website.

To contact us you can send us a message via emails:

Thanks for you support, Have a good one.
