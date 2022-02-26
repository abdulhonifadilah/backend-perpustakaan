//src/controllers/peminjaman.js

const Peminjaman = require("../models/peminjaman");

// input data ke db
exports.inputPeminjaman = (req, res, next) => {
  const idBuku = req.body.idBuku;
  const judul = req.body.judul;
  const idAnggota = req.body.idAnggota;
  const anggota = req.body.anggota;
  const tanggal_pinjam = req.body.tanggal_pinjam;
  const batas_kembali = req.body.batas_kembali;
  const tanggal_kembali = req.body.tanggal_kembali;
  const status = req.body.status;
  const admin = req.body.admin;
  const foto = req.body.foto;

  //persiapan data yang akan disimpan
  const Simpan = new Peminjaman({
    buku: {
      idBuku: idBuku,
      judul: judul,
    },
    anggota: {
      idAnggota: idAnggota,
      anggota: anggota,
    },
    tanggal_pinjam: tanggal_pinjam,
    batas_kembali: batas_kembali,
    tanggal_kembali: tanggal_kembali,
    status: status,
    admin: admin,
    foto: foto
  });
  //simpan data yang sudah siap
  Simpan.save()
    .then((result) => {
      res.status(201).json({
        message: "input peminjaman berhasil",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err : ", err);
    });
};

//ambil data dari db
//get semua peminjaman
exports.getSemuaPeminjaman = (req, res, next) => {
  Peminjaman.find()
    .then((result) => {
      res.status(200).json({
        message: "data berhasil di panggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
//ambil data peminjaman oleh user masing-masing
exports.getByUserId = (req, res, next) => {
  const id = req.body.idAnggota;
  const anggota = req.body.anggota;
  Peminjaman.find({ anggota: { idAnggota: id, anggota: anggota } })
    .then((result) => {
      res.status(200).json({
        message: "data berhasil di panggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//get satu peminjaman dengan id peminjaman
exports.getPeminjaman = (req, res, next) => {
  Peminjaman.findById(req.params.peminjamanId)
    .then((result) => {
      if (!result) {
        const err = new Error("data tidak ada");
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

//pengembalian peminjaman
exports.updatePeminjaman = (req, res, next) => {
  let {
    idBuku,
    judul,
    idAnggota,
    anggota,
    tanggal_pinjam,
    tanggal_kembali,
    status,
    admin,
    tipe,
    foto,
  } = "";
  if (req.body.tipe) {
    tipe = req.body.tipe;
    tanggal_kembali = req.body.tanggal_kembali;
    status = req.body.status;
    admin= req.body.admin;
  }else {
    idBuku = req.body.idBuku;
    judul = req.body.judul;
    idAnggota = req.body.idAnggota;
    anggota = req.body.anggota;
    tanggal_pinjam = req.body.tanggal_pinjam;
    batas_kembali = req.body.batas_kembali;
    tanggal_kembali = req.body.tanggal_kembali;
    status = req.body.status;
    admin = req.body.admin;
    foto=req.body.foto;
  }

  Peminjaman.findById(req.params.peminjamanId)
    .then((peminjaman) => {
      if (!peminjaman) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }
      if(req.body.tipe){
        peminjaman.buku=peminjaman.buku;
        peminjaman.anggota= peminjaman.anggota
        peminjaman.tanggal_pinjam = peminjaman.tanggal_pinjam;
        peminjaman.batas_kembali = peminjaman.batas_kembali;
        peminjaman.foto= peminjaman.foto
        if (tipe === "dikembalikan") {
          peminjaman.tanggal_kembali = tanggal_kembali;
          peminjaman.status = "dikembalikan";
          peminjaman.admin=peminjaman.admin
        } else{
          peminjaman.status = "terkonfirmasi";
        peminjaman.tanggal_kembali = peminjaman.tanggal_kembali;
          peminjaman.admin= admin
        } 
        
      }else{
        peminjaman.buku = {
          idBuku: idBuku,
          judul: judul,
        };
        peminjaman.anggota = {
          idAnggota: idAnggota,
          anggota: anggota,
        };
        peminjaman.tanggal_pinjam = tanggal_pinjam;
        peminjaman.batas_kembali = batas_kembali;
        peminjaman.tanggal_kembali = tanggal_kembali;
        peminjaman.status = status;
        peminjaman.admin = admin;
      }
      

      //save ke db
      return peminjaman.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "update berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

//hapus data
exports.deletePeminjaman = (req, res, next) => {
  const peminjamanId = req.params.peminjamanId;
  Peminjaman.findById(peminjamanId)
    .then((peminjaman) => {
      if (!peminjaman) {
        const err = "data tidak ada";
        err.errorStatus = 404;
        throw err;
      }
      return Peminjaman.findByIdAndRemove(peminjamanId);
    })
    .then((result) => {
      res.status(200).json({
        message: "data telah dihapus",
        data: {},
      });
    })
    .catch((err) => {
      next(err);
    });
};
