
import '@babel/polyfill'
import { login, logout, signup } from './login';
import { addNewProduct, addTocartfun, deleteProduct, hideProduct, removeFromCart, unhideProductByName } from './functions';
import { alertt } from './alert';

let logins = document.querySelector('.login');
let signIn = document.querySelector('.signupPage');
let addProductform = document.querySelector('.addProduct');

let logoutbtn = document.querySelector('.logout')
let addToCart = document.querySelectorAll('.addToCart')
let removeFromCartBtn = document.querySelectorAll('.removeFromCart')
let deletProductForm = document.getElementById('deletProduct')
let hideProductForm = document.getElementById('hidePRoduct')
let unhideProductBtn = document.querySelectorAll('.unhide-btn')

if (logins) {


    logins.addEventListener('submit', e => {
        e.preventDefault();
        // console.log("came");
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('current-password').value;
        login(email, password);
    })




}

if (signIn) {


    signIn.addEventListener('submit', e => {
        e.preventDefault();
        console.log("came signin");
        const name = document.getElementsByClassName('signup-name')[0].value;
        const email = document.getElementsByClassName('signup-email')[0].value;
        const mobile = document.getElementsByClassName('signup-number')[0].value;
        const password = document.getElementsByClassName('signup-password')[0].value;
        const cnfPassword = document.getElementsByClassName('signup-cnfPassword')[0].value;
        console.log(email, password, cnfPassword, mobile);
        if (!name || !email || !mobile || !password || !cnfPassword) {
            return alertt('danger', 'please provide all the details')
        }
        signup(name, email, password, mobile, cnfPassword);
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


if (removeFromCartBtn) {
    removeFromCartBtn.forEach(e => {
        e.addEventListener('click', (e) => {
            console.log(e.target.parentElement.firstElementChild.innerText);

            removeFromCart(e.target.parentElement.firstElementChild.innerText)
        })
    })

}






if (addProductform) {


    addProductform.addEventListener('submit', e => {
        e.preventDefault();
        const productName = document.getElementById('productName').value;
        const price = document.getElementById('price').value;
        const type = document.getElementById('type').value;
        const colors = document.getElementById('colors').value;
        const deliveredIn = document.getElementById('deliveredIn').value;
        const discription = document.getElementById('Discription').value;
        const dileveryCharges = document.getElementById('dileveryCharges').value;
        const paymentMeth1 = document.getElementById('paymentMeth1');
        const paymentMeth2 = document.getElementById('paymentMeth2');
        const warranty = document.getElementById('warranty').value;
        const coverImage = document.getElementById('coverImage').value;
        const summery = document.getElementById('summery').value;
        const about = document.getElementById('about').value;
        const imageFile1 = document.getElementById('imageFile1').value;
        const imageFile2 = document.getElementById('imageFile2').value;
        const imageFile3 = document.getElementById('imageFile3').value;

        const feature1 = document.getElementById('feature1').value;
        const feature2 = document.getElementById('feature2').value;
        const feature3 = document.getElementById('feature3').value;
        const feature4 = document.getElementById('feature4').value;
        const feature5 = document.getElementById('feature5').value;

        const dim1 = document.getElementById('dim1').value;
        const dim2 = document.getElementById('dim2').value;
        const dim3 = document.getElementById('dim3').value;

        const days = document.getElementsByName('days');
        // console.log(Array.from(days));
        let d;

        d = Array.from(days).filter(el => {
            return el.checked
        })

        // console.log(paymentMeth1.checked && 'out');

        const product = {
            productName: productName.toLowerCase()
            , discription
            , price
            , type: type.toLowerCase()
            , colors: colors.split(',')
            , deliveredIn
            , dileveryCharges
            , paymentMethod: [paymentMeth1.checked && 'Online', paymentMeth2.checked && 'Cash on delevery']
            , warranty
            , coverImage
            , summery
            , about
            , Images: [imageFile1, imageFile2, imageFile3]
            , features: [feature1, feature2, feature3, feature4, feature5]
            , dim: [dim1, dim2, dim3]
            , replacmentIn: d[0].value
        }

        console.log(product);
        // console.log(email, password, cnfPassword, mobile);
        if (!product.price ||
            !product.type ||
            !product.colors ||
            !product.deliveredIn ||
            !product.dileveryCharges ||
            !product.paymentMethod ||
            !product.warranty ||
            !product.coverImage ||
            !product.summery ||
            !product.about ||
            !product.Images ||
            !product.features ||
            !product.dim ||
            !product.replacmentIn
        ) {
            return alertt('danger', 'please provide all the details')
        }
        addNewProduct(product);
    })




}



if (deletProductForm) {
    deletProductForm.addEventListener('submit', e => {
        e.preventDefault();
        const item = document.getElementsByClassName('item-del');
        deleteProduct(item[0].value)


    })
}



if (hideProductForm) {
    hideProductForm.addEventListener('submit', e => {
        e.preventDefault();
        const item = document.getElementsByClassName('item-hide');
        hideProduct(item[0].value)



    })
}


if (unhideProductBtn) {
    unhideProductBtn.forEach(el => {


        el.addEventListener('click', e => {
            e.preventDefault();
            // console.log(e.target.parentElement.firstElementChild.innerText);
            unhideProductByName(e.target.parentElement.firstElementChild.innerText)
            // const item = document.getElementsByClassName('item-hide');
            // hideProduct(item[0].value)

        })



    })
}
