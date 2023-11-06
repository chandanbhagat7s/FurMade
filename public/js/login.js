import axios from "axios";
import { alertt } from "./alert";

export const login = async (email, password) => {
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
        const res = await axios.post('http://127.0.0.1:3000/api/v1/user/login', { email, password })
        console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, "you are succesfully logged in !")
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};

export const signup = async (name, email, password, mobile, cnfPassword) => {
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

        if (password != cnfPassword) {
            return alertt('danger', "please check password and cnfPassword!")
        }

        const res = await axios.post('http://127.0.0.1:3000/api/v1/user/signup', { name, email, password, mobile })
        // console.log(res);
        if (res.data.status && res.data.status == 'success') {
            alertt(res.data.status, "you are succesfully logged in !")
            window.setTimeout(() => {
                location.assign('/');
            }, 1500)
        }


    } catch (err) {
        console.log(err);
        alertt('danger', err.response.data.msg)
    }
};


export const logout = async () => {
    try {
        // const res = await axios.get('http://127.0.0.1:3000/api/v1/user/logoutt')
        const res = await fetch('http://127.0.0.1:3000/api/v1/user/logout')
        const data = await res.json();
        console.log(data);
        if (data.status === 'success') {
            alertt('success', "you are logged out")
            location.assign('/')
            // location.reload(true)
        }
    } catch (error) {
        console.log("the error is", error);
        alertt('danger', "something went wrong in logging out")
    }
}




















