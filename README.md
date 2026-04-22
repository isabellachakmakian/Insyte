Insyte 
====================

>##### Insyte is a web appication that allows you to view IOS application reviews and ratings by the click of a button.

## Setup

### Frontend
#### Prerequisites: Installing Node.js & npm

Before you can run the app, if you haven't already, you need to download Node.js (npm comes with it)
1. Download: Go to [node.js](https://nodejs.org/en/download) 
2. Verify: Open your terminal and run these commands to view the version you have installed
   
   ```
   node -v
   npm -v
   ```
   You might see something like this v20.x.x
   
#### Running the application 
  1. Navigate to the client folder from the root directory by running this command in your terminal 
     ```
     cd client
     ```
  2. Install your dependencies:
     ```
     npm install
     ```
  3. Start Development Server 
     ```
     npm run dev
     ```
     Vite will provide a URL (ex. http://localhost:5173/). Open this in your browser to see the app!
  


### Backend
#### Prerequisites: Installing Python and pip

Before you can run the app make sure you have installed the following: Python 3.x and pip

1. You can check by running
   ```
   python3 --version
   pip3 --version
   ```
#### Running the application for the first time 
   1. Navigate to the server folder from the root directory by running this command in the terminal
      ```
      cd server
      ```
   2. Create and activate environment
      ```
      python3 -m venve env
      source env/bin/activate # Mac/Linus
      ```
   3. Install dependencies
      ```
      pip3 install -r requirements.txt
      ```
   4. Run database setup
      ```
      python3 manage.py migrate
      ```
   5. Start server
      ```  
      python3 manage.py runserver
      ```

#### Daily Development
##### If you're working on the backend this is what you will run everytime you come back to work
 1. Navigate to the server folder from the root directory by running this command in the terminal
      ```
      cd server
      ```
2. Activate environment
      ```
      source env/bin/activate # Mac/Linus
      ```
3. Get changes from main. 
      ```
      git pull 
      ```
4. Install dependencies and Run Database setup.
   Note: Running these each time is a safety net in case things have changed and you weren't aware. 
      ```
      pip install -r requirements.txt
      python3 manage.py migrate 
      ```

6. Start server
      ```  
      python3 manage.py runserver
      ```
