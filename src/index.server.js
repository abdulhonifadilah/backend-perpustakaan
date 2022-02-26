// folder src/index.server.js
const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");

//routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const bukuRouter = require("./routes/buku");
const peminjamanRouter = require("./routes/peminjaman");

//environment variable or you can say constant
env.config();

//set folder penyimpanan
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
//filter file yang akan disimpan berupa (png,jpg,jpeg)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//server mongodb connection
//koneksi database menggunakan database mongodb local
mongoose
  .connect(`mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database terkoneksi");
  })
  .catch(() => {
    console.log("ada yang salah dengan koneksi");
  });

//setting agar data yang di get oleh front end berupa json bukan bson
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//memberikan akses image
app.use("/images", express.static(path.join(__dirname, "../images")));

//set multer penyimpanan file image
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

//authentikasi (login,logout)
app.use("/auth", authRouter);

//user
app.use("/user", userRouter);

//buku
app.use("/buku", bukuRouter);

//peminjaman
app.use("/peminjaman", peminjamanRouter);

//membuat respon error dan pesan sukses setiap error status yang di kirim dari controllers
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

//menentukan port yang akan di gunakan
app.listen(process.env.PORT, () => {
  console.log(`server berjalan di port ${process.env.PORT}`);
});
