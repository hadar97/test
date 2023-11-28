const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, userValid, loginValid, createToken } = require("../models/usersModel")
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const { authAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 4;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;

    try {
        let data = await UserModel
            .find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

router.post("/", async (req, res) => {
    let validateBody = userValid(req.body);
    if (validateBody.error) {
        return res.status(400).json(validateBody.error.details)
    }
    try {
        let user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()

        user.password = "********"
        res.status(201).json(user)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: "email already in system try login", code: 11000 })
        }
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})

router.post("/login", async (req, res) => {
    let vaildiatBody = loginValid(req.body)
    if (vaildiatBody.error) {
        return res.status(400).json(vaildiatBody.error.details)
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ msg: "user and password not match code 1" })
        }
        let authPassword = await bcrypt.compare(req.body.password, user.password)
        if (!authPassword) {
            return res.status(401).json({ msg: "user and password not match code 2" })
        }
        let newToken = createToken(user._id,user.role)
        res.json({ token: newToken })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "err", err })
    }
})


router.get("/myInfo", async (req, res) => {
    let token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ msg: "you need to send token to this endpoint url" })
    }
    try {
        let tokenData = jwt.verify(token, "Hadarsecret");
        console.log(tokenData);
        let user = await UserModel.findOne({ _id: tokenData._id }, { password: 0 })
        res.json(user)
    }
    catch (err) {
        return res.status(401).json({ msg: "Token not valid or expired!" })
    }
})




router.get("/myEmail",auth, async (req, res) => {
   
    try {
      
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { email: 1 })
        res.json(user)
    }
    catch (err) {
        return res.status(500).json({ msg: "err",err })
    }
})

router.get("/usersList", authAdmin , async(req,res) => {
    try{
      let data = await UserModel.find({},{password:0});
      res.json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({msg:"err",err})
    }  
  })
  
module.exports = router;