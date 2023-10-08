const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('./Models/ProductSchma')

mongoose.connect('mongodb+srv://chandanbhagat7:8bkRGmCljRnA5UCl@cluster0.rmu973h.mongodb.net/productfun', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((con) => {
        // console.log(con.connection);
        console.log("database connected");
    })
    .catch(err => {

        console.log("Could not connect", err);
    });

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))


const insertData = async () => {
    await Product.insertMany(data);
    console.log("data inserted succesfully");
    process.exit();
}

const deleteData = async () => {
    await Product.deleteMany({});
    console.log("data deleted succesfully");
    process.exit();
}


try {
    if (process.argv[2] == '--import') {
        insertData()


    } else if (process.argv[2] == '--delete') {
        deleteData()
    }

} catch (error) {
    console.log(error);
}






