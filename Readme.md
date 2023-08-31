# WB Test

## Contents

**front**: front end nextjs application  
**server**: expressjs server application

## How to run the app

### Docker

Just run `docker-compose up -d` on this directory.
Remember to have a working env for the server. You can check the example at `.env.example`. Fill it with your variables and rename to `.env`   

### Dev server
***Note: with more time a monorepo could be setup and have a concurrent script for running both dev servers at the same time***

For `server`:
- go to `./server`
- run `yarn`
- make sure you have a working `.env` file
- run `yarn dev`, you need nodemon

For `front`:
- go to `./front`
- run `yarn`
- run `yarn dev`

## Endpoints

