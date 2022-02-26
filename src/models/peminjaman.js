//src/models/peminjaman.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Peminjaman = new Schema (
    {
        buku : {
            type : Object
        },
        anggota : {
            type : Object
        },
        tanggal_pinjam : {
            type : String,
            required : true
        },
        batas_kembali :{
            type: String,
            required: true

        },
        tanggal_kembali : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        },
        admin : {
            type : String,
            required : false
        },
        foto : {
            type : String,
            required: false
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('dbpeminjaman', Peminjaman);