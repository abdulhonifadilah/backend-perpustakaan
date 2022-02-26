//src/conrollers/buku.js

const Buku = require("../models/buku");
const path = require("path");
const fs = require("fs");

//post
exports.tambahBuku = (req, res, next) => {
  const judul = req.body.judul;
  const pengarang = req.body.pengarang;
  const kategori = req.body.kategori;
  const tahun = req.body.tahun;
  const jumlah_halaman = req.body.jumlah_halaman;
  const jumlah_buku = req.body.jumlah_buku;
  const deskripsi = req.body.deskripsi;
  var image = "images/default.png";
  if (req.file) {
    image = req.file.path;
  }

  const Simpan = new Buku({
    judul: judul,
    pengarang: pengarang,
    kategori: kategori,
    tahun: tahun,
    jumlah_halaman: jumlah_halaman,
    jumlah_buku: jumlah_buku,
    deskripsi: deskripsi,
    foto: image,
  });
  Simpan.save()
    .then((result) => {
      res.status(201).json({
        message: "tambah buku berhasil",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err : ", err);
    });
};

// get semua buku
exports.getAllBuku = (req, res, next) => {
  Buku.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
//get buku byId
exports.getBukuById = (req, res, next) => {
  Buku.findById(req.params.bukuId)
    .then((result) => {
      if (!result) {
        const err = new Error("data buku tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      res.status(200).json({
        message: "data berhasil ditemukan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//update[put] buku
exports.updateBuku = (req, res, next) => {
  let{judul, pengarang, kategori, tahun,jumlah_halaman,jumlah_buku,deskripsi,tipe}="";
  if (req.body.tipe) {
    tipe = req.body.tipe;
  } else {
    judul = req.body.judul;
    pengarang = req.body.pengarang;
    kategori = req.body.kategori;
    tahun = req.body.tahun;
    jumlah_halaman = req.body.jumlah_halaman;
    jumlah_buku = req.body.jumlah_buku;
    deskripsi = req.body.deskripsi;
    
  }
const bukuId = req.params.bukuId;
  //tipe update

  Buku.findById(bukuId)
    .then((buku) => {
      if (!buku) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }
      if (req.file) {
        if (buku.foto != "images/default.png") {
          removeImage(buku.foto);
        }
        const image = req.file.path;
        buku.foto = image;
      } else {
        buku.foto = buku.foto;
      }
      if(req.body.tipe){
        buku.judul = buku.judul;
        buku.pengarang = buku.pengarang;
        buku.kategori = buku.kategori;
        buku.tahun = buku.tahun;
        buku.jumlah_halaman = buku.jumlah_halaman;
        // buku.jumlah_buku = jumlah_buku;
        buku.deskripsi = buku.deskripsi;
        if (tipe === "dipinjam") {
          buku.jumlah_buku = buku.jumlah_buku - 1;
         
        } else if (tipe === "terkonfirmasi") {
          buku.jumlah_buku = buku.jumlah_buku + 1;
        }
      }else{
        buku.judul = judul;
        buku.pengarang = pengarang;
        buku.kategori = kategori;
        buku.tahun = tahun;
        buku.jumlah_halaman = jumlah_halaman;
        buku.jumlah_buku = jumlah_buku;
        buku.deskripsi = deskripsi;
        }
      

      return buku.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "data berhasil di update",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//delete data buku
exports.deleteBuku = (req, res, next) => {
  const bukuId = req.params.bukuId;
  Buku.findById(bukuId)
    .then((buku) => {
      if (!buku) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }
      //hapus image
      if (buku.foto != "images/default.png") {
        removeImage(buku.foto);
      }
      //hapus post
      return Buku.findByIdAndRemove(bukuId);
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
