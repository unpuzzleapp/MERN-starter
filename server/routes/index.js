const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  // const err = new Error('This is root route!')
  // err.status = 404;
  // next(err, req, res, next)
  res.status(200).send('Welcome to the MERN starter backend!');
  // res.status(200).send({ title: 'Express' });
}); 

module.exports = router;
