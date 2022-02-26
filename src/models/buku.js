//src/models/buku.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Buku = new Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    pengarang: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    tahun: {
      type: String,
      required: true,
    },
    jumlah_halaman: {
      type: String,
      required: true,
    },
    jumlah_buku: {
      type: Number,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Dbbooks' ,Buku);


