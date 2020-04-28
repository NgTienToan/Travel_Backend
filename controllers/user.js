const User = require('../models/user');
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/authentication')

const logIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email && !password) {
            return res.status(400).json({
                success: false,
                message: 'Email or password is required'
            })
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Email is not existed'
            })
        }

        if(user.password !== password){
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                data: {
                    token: jwt.sign({userID: user._id}, 'TRAVEL', {
                        expiresIn: 60 * 60 * 24 * 1000,
                    })
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const signUp = async (req, res, next) => {
    try {
        const {email, password, name} = req.body;
        if(!email && !password && !name) {
            return res.status(400).json({
                success: false,
                message: 'Email, password or name is required'
            })
        }
        const user = await User.findOne({email: email});
        if(user) {
            return res.status(400).json({
                success: false,
                message: 'email is existed'
            })
        }
        const newUser = new User({
            email, password, name
        })
        let newUserRes = await newUser.save();
        if(!newUserRes) {
            return res.status(400).json({
                success: false,
                message: 'sign up fail'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'sign up is succesfully',
                data: {
                    token: jwt.sign({userID: newUserRes._id}, 'TRAVEL', {
                        expiresIn: 60 * 60 * 24 * 1000,
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getme = async (req,res) => {
    let {userID} = req.user;
    let user = await User.findOne({_id: userID});
    if(!user){
        return res.status(400).json({
            success: false,
            message: 'user is not existed'
        })
    }
    else {
        return res.status(200).json({
            success: true,
            message: 'successfully',
            data: {
                user
            }
        })
    }
}

const updatePassword = async (req, res) => {
    let {oldPassword, newPassword, comfirmPassword} = req.body;
    let {userID} = req.user;
    let user = await User.findById(userID);
    if(oldPassword == null || newPassword == null || comfirmPassword == null) {
        return res.status(400).json({
            success: false,
            message: 'Password is required'
        })
    }
    if(user.password !== oldPassword) {
        return res.status(400).json({
            success: false,
            message: 'Old password is incorrect'
        })
    }
    if(newPassword!==comfirmPassword){
        return res.status(400).json({
            success: false,
            message: 'Comfirm password is incorrect'
        })
    }
    if(oldPassword===newPassword){
        return res.status(400).json({
            success: false,
            message: 'Password used to '
        })
    }
    let newUser = await User.findOneAndUpdate({_id: userID}, {password: newPassword});
    if(newUser){
        return res.status(200).json({
            success: true,
            message: 'Password is updated successfully '
        })
    }
}

module.exports = {
    logIn,
    signUp,
    getme,
    updatePassword
}