
import '@babel/polyfill'
import { login, logout } from './login';
import { addTocartfun } from './functions';


let logins = document.querySelector('.login');

let logoutbtn = document.querySelector('.logout')
let addToCart = document.querySelectorAll('.addToCart')

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

if (addToCart) {
    // console.log(addToCart);
    addToCart.forEach(e => {
        e.addEventListener('click', (e) => {
            // e.data =
            // console.log(e);
            // console.log(e.isTrusted);
            // console.log(e.target.parentElement.firstElementChild.innerText);
            addTocartfun(e.target.parentElement.firstElementChild.innerText)
        })
    })
    // console.log("came into adddddd");
    // let productName = document.querySelector('.productName')
    // console.log(productName.innerText);
    // addToCart.addEventListener('click', (e) => {
    //     console.log(e);
    //     // addTocartfun(productName.innerText)
    // })
}




