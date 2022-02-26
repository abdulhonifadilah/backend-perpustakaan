//src/models/user.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const Schema = mongoose.Schema;

const User = new Schema(
  {
    nama : {
      type : String,
      required : true
    },
    nim_nidn_niy : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : false
    },
    telp : {
      type : String,
      required : false
    },
    foto : {
      type: String,
      required : false
    },
    role : {
      type : String,
      required : false
    },
    tipe : {
      type: String,
      required : false
    },
    hash_password : {
      type : String,
      required : false
    }
  },
  {
    timestamps: true,
  }
);

//hash password(ubah password ke bcrypt)
User.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});
//authenticate hash_password bcrypt => password
User.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}




module.exports = mongoose.model('User', User);
