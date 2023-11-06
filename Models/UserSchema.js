const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name to be provided"],
        trim: true,
        minLength: 1,
        maxLength: 15
    },
    email: {
        type: String,
        required: [true, "user email to be provided"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'provide the valid email address']

    },
    mobile: {
        type: Number,
        required: [true, "user Mobile number to be provided"],
        unique: true,
        // validate: [, 'provide the valid email address']

    },
    photo: String,
    password: {
        type: String,
        required: [true, "user password to be provided"],
        minLength: 8
    },
    passwordConfirm: {

        type: String,
        validate: {
            validator: function (el) {
                return el == this.password
            },
            message: "please enter correct password ",
            required: [true, "must enter password once again for conformation"]
        }
    },
    passwordChanged: Date,
    role: {
        type: String,
        default: 'USER'
    },
    userCart: [

        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            // required: [true, 'review must belong to specific Product'],
            // unique: true
        }

    ],
    buyedProduct: {


        type: mongoose.mongo.ObjectId,
        ref: 'Product',
        // required: [true, 'review must belong to specific Product']


    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordExpires: Date


})

// we want to encrypt the password before saving it to DB

// using schma middleware 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next()

})

// we need to define the password change field okk 
userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) {
        return next()
    }

    this.passwordChangedAt = Date.now() + 1000;
    next()
})

// userSchema.pre(/^find/, function (next) {
//     // this.populated('userCart')
//     this.populate({
//         path: 'userCart'
//     })
//     next()
// })

// reviewSchema.pre(/^find/, function (next) {

//     this.populate({
//         path: 'byUser',
//         select: 'name email '
//     })


//     next()
// })

userSchema.methods.correctPass = async function (inputpassword, password) {
    return await bcrypt.compare(inputpassword, password)
}

userSchema.methods.IsPasswordChanged = function (time) {
    if (this.passwordChanged) {
        let timeChanged = this.passwordChanged.getTime() / 1000;

        return time < timeChanged
    }

    return false;
}


// setting password reset token inENC

userSchema.methods.setPasswordRestToken = function () {
    let tokenO = crypto.randomBytes(32).toString('hex')



    let token = crypto.createHash('sha256').update(tokenO).digest('hex');

    this.passwordResetToken = token;
    this.passwordExpires = Date.now() + 10 * 60 * 60 * 1000;

    return tokenO;


}


// now creating model out of it 
const User = mongoose.model('User', userSchema);

module.exports = User;



























