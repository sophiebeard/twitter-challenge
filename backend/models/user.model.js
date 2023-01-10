import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    namePeep: {
        type: String,
        required: [true, `Please enter your first name`],
        match: [/^[a-z]+$/i, `Incorrect format - name can only contain letters`]
    },
    lastNamePeep: {
        type: String,
        required: [true, `Please enter your last name`],
        match: [/^[a-z]+$/i, `Incorrect format - last name can only contain letters`]
    },
    username: {
        type: String,
        required: [true, `Please enter your username`],
        trim: true,
        match: [/^[a-z0-9]+$/i, `Invalid format`],
        unique: [true, `Username already exists - username can only contain letters and numbers`]
    },
    email: {
        type: String,
        required: [true, `Please enter your email address`],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, `Invalid email format`]
    },
    password: {
        type: String,
        required: [true, `Please enter your password`],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, `Password must contain: at least 1 upper case, numeric, and a special character`]
    }
});

const User = mongoose.model('User', userSchema);

export default User;