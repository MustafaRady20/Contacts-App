const asyncHandler = require("express-async-handler")
const ApiError = require("../utils/apiError")
const UserModel = require("../models/UserModel")

exports.getAll = asyncHandler( async (req,res) => {
    const limit = req.query.limit * 1 || 50
    const page = req.query.page *1 || 1
    const skip = (page -1)*limit
    const users = await UserModel.find({}).skip(skip).limit(limit)
    if (!users){
        return new ApiError("No users found ...",404)
    }
    const documents = await UserModel.countDocuments()
    res.status(200).json({
        page:page,
        limit:limit,
        NumberOfPages:Math.ceil(documents/limit),
        result:users
    })
})