
import '@babel/polyfill'
import { login, logout } from './login';


let logins = document.querySelector('.login');

let logoutbtn = document.querySelector('.logout')

if (logins) {


    logins.addEventListener('submit', e => {
        e.preventDefault();
        console.log("came");
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('current-password').value;
        login(email, password);
    })




}

if (logoutbtn) {
    logoutbtn.addEventListener('click', logout)
}






