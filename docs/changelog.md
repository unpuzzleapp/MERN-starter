# Changelog

## 24 Jun 2021

### Backend Updation
Reverted optional chaining from file `server/helper/puzzlepiece.js`

## 20 Jun 2021

### Backend Enhancement
Before we were using firebase hosted backend on the platform which is completely replaced by the self hosted backend on own. You can find the URL [Here](https://unpuzzle-integrated-backend.herokuapp.com/api)

**Guidelines**
- updated the url for listing the unpuzzle from `/api/puzzlepieces` to `api/puzzlepiece` for maintaing the REST API guidelines

**Limitation**
- Firebase notification - since the firebase has been removed from the application, We won't be able to get/set notification from existing application. In case one needs to setup the notification service by own
- Firebase Image - Same as notification, one won't be able to update the images since the platform has been removed

**Why we are not hosting to Netlify**
Since netlify does not support out of the box stand alone applications, one needs to wrap things into functions and then only will be able to deploy things over netlify. Since the starter is not specific to functions but MERN. It won't be containing the functions and in case of deployment things needs to wrap around the functions
[Read more here](https://www.netlify.com/blog/2018/09/13/how-to-run-express.js-apps-with-netlify-functions/)