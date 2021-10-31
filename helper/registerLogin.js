const bcrypt = require("bcrypt")
const userModel = require("../mongoose/mongoose");
const joi = require("joi");
const qr =require("qrcode")
const register = async (req, res) => {
  try {
    const { query } = req;
    
    const salt = await bcrypt.genSalt(10);
    query.password = await bcrypt.hash(req.query.password, salt);


    const user = await userModel.create(query);
    console.log("...........register")

    return res.redirect('/login');
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    console.log("....login")

    const { email, password } = req.query;
    console.log(password)

    const user = await userModel.findOne({ email });
   
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log(user.password)
   console.log(passwordValid)
    console.log("cgfghi")
    if (!passwordValid) {
      throw new Error("wrong password OR email");
    }
 const url = JSON.stringify(user)
    if(url.length === 0) res.send("Empty Data!")
    qr.toDataURL(url,(err,src)=>{
        if (err) res.send("error occured")

        res.render("scan",{src})
    })

    // return res.redirect(`/scan/${email}`)
  } catch (error) {
    console.log("error", error);
    res.send("error")
  }
};


module.exports = { register, login };