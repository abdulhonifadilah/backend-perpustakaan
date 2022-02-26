//src/routes/user.js

const express = require('express');

const router = express.Router();

const UserControllers = require('../controllers/user');

//POST = /user/post
router.post('/post', UserControllers.tambahUser);
//get = /user/get
router.get('/get', UserControllers.getAllUser);
//get by id = /user/get/:userId
router.get('/get/:userId', UserControllers.getUser);
//put = /user/update/:userId
router.put('/update/:userId', UserControllers.updateUser);
//delete = /user/delete/:userId
router.delete('/delete/:userId', UserControllers.deleteUser);


module.exports= router;