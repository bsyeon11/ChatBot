import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    useremail: String,
    username: String,
    userphone: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.statics.findByUseremail = function(useremail) {
    return this.findOne({ useremail });
};

UserSchema.statics.isValidUser = function(useremail, username, userphone) {
    return this.findOne({ useremail, username, userphone });
};

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
            useremail: this.useremail,
            userphone: this.userphone,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
};

const User = mongoose.model('User', UserSchema);
export default User;