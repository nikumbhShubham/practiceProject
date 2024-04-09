import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudnary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'
const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation
    //check if the {email,user} is already in use or not
    //check for {images} and {avatar}
    //upload them on cloudinary,avatar
    //create user object -create entry in db
    //remove pass and refresh token field from response
    //check for user creation  success then send response otherwise error

    const { fullname, email, username, password } = req.body
    console.log("email: ", email)
    // if (fullname == "") {
    //     throw new ApiError(400, "fullname is required")
    // }
    if (
        [fullname, email, username, password].some((field) => (field?.trim() === "")
        )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with  this username or Email already exists.")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }



    // console.log(avatarLocalPath)
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudnary(avatarLocalPath)
    const coverImage = await uploadOnCloudnary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")

    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "something went wrong Server error");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )


})

export { registerUser }