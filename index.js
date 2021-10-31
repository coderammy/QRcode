const express = require("express")
const app = express();
const port = 8000
const bp = require("body-parser")
const qr = require("qrcode")
// const localtunnel = require("localtunnel")
const mongoose = require("mongoose")
const { register, login } = require("./helper/registerLogin")
const { authSchema, authValidate } = require("./vallidation/joi")
const { schema, luthValidate } = require("./vallidation/joil")


app.set("view engine", "ejs")
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())
mongoose.connect('mongodb+srv://amangoswami19ty33:rajkumar@cluster0.os0y0.mongodb.net/student?authSource=admin&replicaSet=atlas-137e32-shard-0&w=majority&readPreference=primary')
  .then((connect) => {
    console.log("connetion successful")
  }).catch((error) => {
    console.log("not connect")
  })

app.get("/", (req, res) => {
  res.render("register")

})

app.get("/login", (req, res) => {
  res.render("login")

})
app.get("/qr", (req, res) => {
  res.render("qr")

})


app.get("/scan/:email", (req, res) => {
  const url = ("PRESENT by AMAN SWAMI")


  if (url.length === 0) res.send("Empty Data!")
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("error occured")

    res.render("scan", { src })
  })
})

app.get("/register", authValidate, register)
app.get("/api/login", luthValidate, login)

app.listen(port, async () => {
  console.log("server🤷‍♀️🤷‍♀️ run🙌")
  // const localtunnel = require('localtunnel');


})