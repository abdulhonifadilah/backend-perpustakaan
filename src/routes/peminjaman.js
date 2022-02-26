//src/routes/peminjaman.js

const express = require('express');

const router = express.Router();

const PeminjamanControllers = require('../controllers/peminjaman')

//Post = peminjaman/post
router.post('/post', PeminjamanControllers.inputPeminjaman);

//get= peminjaman/get
router.get('/get', PeminjamanControllers.getSemuaPeminjaman);
//get dengan id= peminjaman/get/:peminjamanId
router.get('/get/:peminjamanId', PeminjamanControllers.getPeminjaman);
//update = peminjaman/update/peminjamanId
router.put('/update/:peminjamanId', PeminjamanControllers.updatePeminjaman);
//by user id
router.post('/getByUserId', PeminjamanControllers.getByUserId);


//delete = peminjaman/delete/:peminjamanId
router.delete('/delete/:peminjamanId', PeminjamanControllers.deletePeminjaman);


//export router peminjaman
module.exports = router;