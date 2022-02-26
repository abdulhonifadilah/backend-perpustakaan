//src/controllers/user.js

const path = require("path");
const fs = require("fs");
const User = require("../models/user");

//post = tambah user
exports.tambahUser = (req, res, next) => {
  const nama = req.body.nama;
  const noId = req.body.noId;
  const email = req.body.email;
  const telp = req.body.telp;
  const role = req.body.role;
  const tipe = req.body.tipe;
  const password = req.body.password;
  var image = "images/default.png";
  if (req.file) {
    image = req.file.path;
  }
  User.findOne({ nim_nidn_niy: req.body.noId }).exec((kosong, ada) => {
    if(ada){
      return res.status(400).json({
        message: 'User sudah ada'
      })
    }else{
      const Simpan = new User({
        nama: nama,
        nim_nidn_niy: noId,
        email: email,
        telp: telp,
        foto: image,
        role: role,
        tipe: tipe,
        password: password,
      });
      Simpan.save()
        .then((result) => {
          return res.status(201).json({
            message: "Tambah user berhasil",
            data: result,
          });
        })
        .catch((err) => {
          console.log("err : ", err);
        });
    }
  });
};

//get = ambil semua data user kecuali admin yang mengakses
exports.getAllUser = (req, res, next) => {
  User.find()
    .then((result) => {
      return res.status(200).json({
        message: "data berhasil di panggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//get by id = ambil data user dengan id tertentu
exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((result) => {
      if (!result) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }
      return res.status(200).json({
        message: "data berhasil ditemukan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//update[put] user
exports.updateUser = (req, res, next) => {
  const nama = req.body.nama;
  const noId = req.body.noId;
  const email = req.body.email;
  const telp = req.body.telp;
  const role = req.body.role;
  const tipe = req.body.tipe;
  const userId = req.params.userId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }
      if (req.file) {
        if (user.foto != "images/default.png") {
          removeImage(user.foto);
        }
        const image = req.file.path;
        user.foto = image;
      } else {
        user.foto = user.foto;
      }
      if (req.body.password === "") {
        user.hash_password = user.hash_password;
      } else {
        const password = req.body.password;
        user.password = password;
      }
      user.nama = nama;
      user.nim_nidn_niy = noId;
      user.email = email;
      user.telp = telp;
      user.role = role;
      user.tipe = tipe;

      return user.save();
    })
    .then((result) => {
      return res.status(200).json({
        message: "data berhasil di update",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error("data tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      if (user.foto != "images/default.png") {
        removeImage(user.foto);
      }
      return User.findByIdAndDelete(userId);
    })
    .then((result) => {
      res.status(200).json({
        message: "data berhasil dihapus",
        data: {},
      });
    })
    .catch((err) => {
      next(err);
    });
};

//function remove image
const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
