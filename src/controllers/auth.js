//src/controllers/auth.js

const User = require("../models/user");
const jwt = require("jsonwebtoken");
//membuat jwt token dari id dan role user
const generateJwtToken = (_id, role)=>{
  return jwt.sign({_id, role}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })
}
//login
exports.signin = (req, res, next) => {
  User.findOne({nim_nidn_niy : req.body.noId}).exec(async(error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        //membuat token jwt
        const token = generateJwtToken(user._id, user.role);
        const _id = user._id;
        const nama = user.nama;
        const noId = user.nim_nidn_niy;
        const email = user.email;
        const telp = user.telp;
        const role = user.role;
        const tipe = user.tipe;
        res.cookie('token', token, {
          httpOnly : true
        });
        res.status(200).json({
         token,
          user: {
            _id,
            nama,
            noId,
            email,
            telp,
            role,
            tipe
          },
        });
      } else {
        //jika password salah
        return res.status(400).json({
          message: "Password salah",
        });
      }
    } else {
      return res.status(400).json({
        message: "User tidak terdaftar",
      });
    }
  });
};

//membuat authenticate login
exports.loggedIn = (req, res)=>{
  try{
    const token = req.cookies.token;
    if(!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  }catch (err){
    res.json(false);
  }
}


//logout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};

