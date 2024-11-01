const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs');
const  ApiError = require("../utils/apiError");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken")



exports.SignUp = asyncHandler(async (req, res) => {
    const {  email, password,userName } = req.body
    if (!userName || !password || !email) {
        return res.status(400).json({ "Messgae:": " userName , email or password is missing ...." })
    }
    // check if the user Already existed    
    const user = await UserModel.findOne({ email: email })
    if (user) {
        return res.status(409).json({ "message": "user is already existd " })
    }
    const newUser = await UserModel.create({
        userName,
        email,
        password
    })
    if (!newUser) {
        return new ApiError("can not save a new user", 400)
    }
    res.status(201).json({ 'success': `New user ${newUser} created!` });
})

exports.Login= asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    console.log(email,password)
    if(!email||!password) return res.status(400).json("email or password is missing try again..!")
        
    const user = await UserModel.findOne({email:email}).exec()
    if(!user){
        return next(new ApiError("User Not found ..",401))
    }
    const match = await bcrypt.compare(password,user.password)

    if(match){
        const roles =user.role
        const accessToken = jwt.sign(
            {
            "userName":user.userName,
            "role":roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        )

        const refreshToken = jwt.sign(
            {
            "userName":user.userName,
            "role":user.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        )

        user.refreshToken = refreshToken
        const result = await user.save()

        res.cookie("jwt",refreshToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:24*60*60*1000})
        res.json({
            roles,
            accessToken
        })

    }else{
        return next( new ApiError("Not Authorized",401))
    }
})

exports.RefreshToken = asyncHandler(async(req,res,next)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    
    const user = await UserModel.findOne({refreshToken}).exec()
    if(!user) return res.sendStatus(403)

    jwt.verify(refreshToken
        ,process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
        if(err||user.email!==decoded.email) return res.sendStatus(403)
        const accessToken = jwt.sign({
            "email":user.email,
            "role":user.role
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

        res.json({"role":user.role,"token":accessToken})
    })
    
})