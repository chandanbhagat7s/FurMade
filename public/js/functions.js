

// add to cart 

import axios from "axios";
import { alertt } from "./alert";


export const addTocartfun = async (productName) => {
    // console.log(email, password);
    try {
        // const res = await axios({
        //     method: 'POST',
        //     url: 'http://127.0.0.1:3000/api/v1/user/login',
        //     data: {
        //         email,
        //         password
        //     }
        // });

        const res = await axios.patch('http://127.0.0.1:3000/api/v1/user/addToCart', { productName })
        console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product added to cart")

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};

// remove from cart
export const removeFromCart = async (productName) => {
    // console.log(email, password);
    try {
        // const res = await axios({
        //     method: 'POST',
        //     url: 'http://127.0.0.1:3000/api/v1/user/login',
        //     data: {
        //         email,
        //         password
        //     }
        // });

        const res = await axios.patch('http://127.0.0.1:3000/api/v1/user/removeFromCart', { productName })
        console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product removed from cart")
            window.setTimeout(() => {
                location.reload(true)
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};

// edit information

//save information



// add new product
export const addNewProduct = async (product) => {

    try {

        console.log(product);
        const res = await axios.post('http://127.0.0.1:3000/api/v1/product', product)
        console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product added ")
            window.setTimeout(() => {
                // location.assign('/me')
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};


// edit product 
export const editProduct = async (id, product) => {

    try {

        // console.log(product);
        const res = await axios.patch(`http://127.0.0.1:3000/api/v1/product/${id}`, product)
        // console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product has been Updated..")
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};



export const deleteProduct = async (item) => {

    try {

        // console.log(product);
        let id = await axios.get(`http://127.0.0.1:3000/api/v1/product/getByName/${item}`)
        id = id.data.data.product[0]._id
        // console.log(id);
        const res = await axios.delete(`http://127.0.0.1:3000/api/v1/product/${id}`)
        // )
        //     console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product deleted ")
            window.setTimeout(() => {
                location.assign('/deleteProduct')
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};



export const hideProduct = async (item) => {

    try {

        // console.log(product);
        let res = await axios.patch(`http://127.0.0.1:3000/api/v1/product/hideproduct/${item}`)

        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product hidden successfully ")
            window.setTimeout(() => {
                location.assign('/hideProduct')
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};


export const unhideProductByName = async (item) => {

    try {

        // console.log(product);
        let res = await axios.patch(`http://127.0.0.1:3000/api/v1/product/unhideProduct/${item}`)

        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Product unhidden successfully ")
            window.setTimeout(() => {
                location.assign('/getAllHiddenProductList')
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};




export const addReviewByTour = async (id, data) => {
    // console.log(email, password);
    try {


        const res = await axios.post(`http://127.0.0.1:3000/api/v1/product/${id}/review`, data)
        console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " Review Added")
            window.setTimeout(() => {
                location.reload(true)
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};

export const editProfileFun = async (id, data) => {
    // console.log(email, password);
    try {


        const res = await axios.patch(`http://127.0.0.1:3000/api/v1/user/updateUser/${id}`, data)
        console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, " You are Updated ")
            window.setTimeout(() => {
                location.assign('/me')
            }, 1500)

        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};





export const proceedPaymentProcess = async (info) => {
    try {
        console.log(info);
        const user = await axios.get(`http://127.0.0.1:3000/api/v1/user/${info.pid}`)
        const product = await axios.get(`http://127.0.0.1:3000/api/v1/product/${info.uid}`)

        const data = {
            name: user.name,
            // amount: product.price,
            amount: 1,
            // number: user.mobile,
            number: '7498688775',
            MUID: "MUID" + Date.now(),
            transactionId: 'T' + Date.now(),
        }
        const res = await axios.post('http://127.0.0.1:3000/api/v1/payment/payment', { 
            MUID: data.MUID,
            name: data.name,
            amount: data.amount,
            number: data.number,
            transactionId: data.transactionId
        })
        // console.log(res);
        // if (res.data.status && res.data.status == 'success') {
        //     alertt(res.data.status, " procedded ")

        // }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};














