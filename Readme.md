# WB Test

## Contents

**front**: front end nextjs application  
**server**: expressjs server application

## How to run the app

### Docker

Just run `docker-compose up -d` on this directory.
Remember to have a working env for the server. You can check the example at `.env.example`. Fill it with your variables and rename to `.env`   

The front end will be at `localhost:3000`, and the server at `localhost:4000`. **Important** - You need to set your envs. For receiving emails, you need to have your application exposed to the web, see below

### Dev server
***Note: with more time a monorepo could be setup and have a concurrent script for running both dev servers at the same time***

For `server`:
- go to `./server`
- run `yarn`
- make sure you have a working `.env` file
- run `yarn dev`, you need nodemon

For `front`:
- go to `./front`
- create an `.env` file, the only var needed is `NEXT_PUBLIC_API_URL` which should be the server's address
- run `yarn`
- run `yarn dev`

## Receiving email

For receiving email you need a static address that's exposed to the web. This would be the `WEBHOOK_URL` found on the `.env.example` file at the server.
You can either deploy this and asign a domain to the project, or you can use a service such as ngrok to expose your localhost and get a url like so: https://8c3a-85-53-95-125.ngrok-free.app

## Deploying to VPS without docker
- You need a local instance of mongodb running, or at least an external service like Atlas for a connection string
- Clone repo
- build both packages, `front` & `server`
- install pm2 - `npm i -g pm2`
- start the server, at the dist directory with pm2, `pm2 start server.js --name server`
- start the front end, at the root of the front directory run `pm2 start 'npm run start' --name front`
- Save the processes running `pm2 save`
- Install nginx
- Now, via reverse proxy you can expose localhost:4000, and 3000 to whatever URL you have


## Endpoints

### **1. Send and Save Email**
- **Method:** `POST`
- **Endpoint:** `/email/`
- **Headers:** 
  - `api-key: "the_key_you_set"`
- **Body:**
  ```json
  {
      "From": "john@test.com",
      "To": "freeman4@gmail.com",
      "TextBody": "testEmail",
      "Subject": "Urgent tester needed"
  }

### **2. Get Email by Type**
- **Method:** `GET`
- **Endpoint:** `/email`
- **Headers:** 
  - `api-key: "the_key_you_set"`
- **Query Parameters:** 
  - `type: "sent" | "received"`

### **3. Get Email by Address**
- **Method:** `GET`
- **Endpoint:** `/email/address/{email}`
- **Headers:** 
  - `api-key: "the_key_you_set"`

### **4. Get Email by ID**
- **Method:** `GET`
- **Endpoint:** `/email/{id}`
- **Headers:** 
  - `api-key: "the_key_you_set"`
