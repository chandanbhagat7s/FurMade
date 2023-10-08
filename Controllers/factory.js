const Apifeature = require("../utils/apiFeature");
const runAsync = require("../utils/catchAsync");


exports.createOne = Model => runAsync(async (req, res, next) => {
    const doc = await Model.create({
        ...req.body
    })
    if (!doc) {
        return next(new appError('failed to create doc please try again to create !!', 404))
    }


    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})


exports.getAll = Model => runAsync(async (req, res, next) => {

    let features = new Apifeature(Model.find(), req.query).filter().sort().fields().pagination()

    let doc = await features.query;

    if (!doc) {
        return next(new appError('failed to get all the Doc !!', 404))
    }

    res.status(200).json({
        status: 'success',
        totalResult: doc.length,
        data: {
            data: doc
        }
    })
})


exports.getOne = Model => runAsync(async (req, res, next) => {

    const doc = await Model.findById(req.params.id)

    if (!doc) {
        console.log("entred");
        return next(new appError('unable to find documnet  ', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })


})


exports.deleteOne = Model => runAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)


    res.status(200).json({
        status: 'success',
        data: null
    })
})


exports.updateOne = Model => runAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        runValidators: true,
        new: true
    })


    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})













