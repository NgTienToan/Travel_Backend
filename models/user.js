const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        
    }
)
/**
 * Tạo mã hóa mật khẩu
 */
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

/**
 * Kiểm tra mật khẩu có trùng khớp
 */
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;

