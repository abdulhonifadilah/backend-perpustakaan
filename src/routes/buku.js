//src/routes/buku.js

const express = require('express');

const router = express.Router();

const BukuControllers = require('../controllers/buku');

//POST = buku/post
router.post('/post', BukuControllers.tambahBuku);

//get buku
//get semua buku
router.get('/get', BukuControllers.getAllBuku);
//get buku byId
router.get('/get/:bukuId', BukuControllers.getBukuById);

//update buku
router.put('/update/:bukuId', BukuControllers.updateBuku);
//delete buku
router.delete('/delete/:bukuId', BukuControllers.deleteBuku);

module.exports = router;
