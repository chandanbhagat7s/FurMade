

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

// edit information

//save information




























