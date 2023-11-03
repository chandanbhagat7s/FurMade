const mongoose = require('mongoose');
const slugify = require('slugify');

// creating schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "name to be provide for product "],
        unique: true,
        trim: true,
        minlength: [3, "name to be atleast of 3 character"]
    },
    price: {
        type: Number,
        required: [true, "product must have a price"]
    },
    avgRating: {
        type: Number,
        default: 4.5

    },
    ratingQuantity: {
        type: Number,
        default: 4.5
    },
    type: {
        type: String,
        required: [true, "product must have type eg .. sofa , bed .."]
    },
    deliveredIn: {
        type: String,
        required: [true, "product must have a duration eg.. 3days , 2days .."]
    },
    discription: {
        type: String,
        required: [true, "must provide discription"]
    },
    colors: {
        type: [String],
        required: true
    },
    discount: Number,
    dileveryCharges: Number,
    replacmentIn: {
        type: String,
        required: [true, "product must have replacment within deadline"]
    },
    paymentMethod: {
        type: [String],
        required: [true, "method like online,Cash on Delivery"]
    },
    warranty: {
        type: String,
        required: [true, "must have a warranty for the product "]
    },
    stillSold: Number,
    coverImage: {
        type: String,
        required: true
    },
    Images: [String],
    dim: {
        type: [Number],
        required: true

    },
    about: {
        type: String,
        required: true,
        minlength: [20, "must have atleast 20 character "],
        maxlength: [450, "about cannot exceed 150 character"]
    },
    features: {
        type: [String],
        required: [true, 'product must have feature'],
        validate: {
            validator: function (v) {
                return v.length <= 5;
            },
            message: 'feature array length cannot exceed 5.'
        }
    },
    summery: {
        type: String,
        required: true,
        minlength: [40, "must have atleast 30 character "],
        maxlength: [450, "about cannot exceed 150 character"]
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },

    slug: {
        type: String
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


// we will create virtual propulate on product review
productSchema.virtual('review', {
    ref: 'Review',
    foreignField: 'ofProduct',
    localField: '_id'
})

productSchema.pre('save', function (next) {
    this.slug = slugify(this.productName, { lower: true });
    next();
});




// creating model of that schema
const product = mongoose.model('Product', productSchema)






module.exports = product;