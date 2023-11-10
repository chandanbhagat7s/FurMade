
import '@babel/polyfill'
import { login, logout, signup } from './login';
import { addNewProduct, addReviewByTour, addTocartfun, deleteProduct, editProduct, hideProduct, removeFromCart, unhideProductByName } from './functions';
import { alertt } from './alert';

let logins = document.querySelector('.login');
let signIn = document.querySelector('.signupPage');
let addProductform = document.querySelector('.addProduct');
let editProductform = document.querySelector('.editProduct');

let logoutbtn = document.querySelector('.logout')
let addToCart = document.querySelectorAll('.addToCart')
let addToCart2 = document.querySelector('.addToCart2')
let removeFromCartBtn = document.querySelectorAll('.removeFromCart')
let submitReview = document.querySelector('.submitReview')
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
            // console.log();
            addTocartfun(e.target.dataset.product)
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
if (addToCart2) {
    // console.log(addToCart2);
    addToCart2.addEventListener('click', (e) => {
        // e.data =

        // console.log(e.isTrusted);
        // console.log(e.target.parentElement.firstElementChild.innerText);
        // console.log();
        addTocartfun(e.target.dataset.product)

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
            // console.log(e.target.parentElement.firstElementChild.innerText);

            removeFromCart(e.target.dataset.product)
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
        const coverImage = document.getElementById('coverImage').files[0];
        const summery = document.getElementById('summery').value;
        const about = document.getElementById('about').value;
        const imageFile1 = document.getElementById('imageFile1').files[0];
        const imageFile2 = document.getElementById('imageFile2').files[0];
        const imageFile3 = document.getElementById('imageFile3').files[0];

        const feature1 = document.getElementById('feature1').value;
        const feature2 = document.getElementById('feature2').value;
        const feature3 = document.getElementById('feature3').value;
        const feature4 = document.getElementById('feature4').value;
        const feature5 = document.getElementById('feature5').value;

        const dim1 = Number.parseInt(document.getElementById('dim1').value)
        const dim2 = Number.parseInt(document.getElementById('dim2').value)
        const dim3 = Number.parseInt(document.getElementById('dim3').value)

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
            , features: [feature1, feature2, feature3, feature4, feature5]
            , dim: [dim1 * 1, dim2 * 1, dim3 * 1]
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
            !product.features ||
            !product.dim ||
            !product.replacmentIn
        ) {
            return alertt('danger', 'please provide all the details')
        }

        const form = new FormData()
        for (const key in product) {
            const value = product[key];
            console.log(`Key: ${key}, Value: ${value}`);
            form.append(key, product[key])
        }

        form.append('Images', imageFile1)
        form.append('Images', imageFile2)
        form.append('Images', imageFile3)


        addNewProduct(form);
    })




}


if (editProductform) {
    console.log(editProductform);

    editProductform.addEventListener('submit', e => {
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
        // const coverImage = document.getElementById('coverImage').files[0];
        const summery = document.getElementById('summery').value;
        const about = document.getElementById('about').value;
        // const imageFile1 = document.getElementById('imageFile1').files[0];
        // const imageFile2 = document.getElementById('imageFile2').files[0];
        // const imageFile3 = document.getElementById('imageFile3').files[0];

        const feature1 = document.getElementById('feature1').value;
        const feature2 = document.getElementById('feature2').value;
        const feature3 = document.getElementById('feature3').value;
        const feature4 = document.getElementById('feature4').value;
        const feature5 = document.getElementById('feature5').value;

        const dim1 = Number.parseInt(document.getElementById('dim1').value)
        const dim2 = Number.parseInt(document.getElementById('dim2').value)
        const dim3 = Number.parseInt(document.getElementById('dim3').value)

        const days = document.getElementsByName('days');
        // console.log(Array.from(days));
        let d;

        days ? d = Array.from(days).filter(el => {
            return el.checked
        }) : ''



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
            // , coverImage
            , summery
            , about
            , features: [feature1, feature2, feature3, feature4, feature5]
            , dim: [dim1 * 1, dim2 * 1, dim3 * 1]
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
            !product.summery ||
            !product.about ||
            !product.features ||
            !product.dim ||
            !product.replacmentIn
        ) {
            return alertt('danger', 'please provide all the details')
        }



        // const form = new FormData()
        // for (const key in product) {
        //     const value = product[key];
        //     console.log(`Key: ${key}, Value: ${value}`);
        //     form.append(key, product[key])
        // }

        // form.append('Images', imageFile1)
        // form.append('Images', imageFile2)
        // form.append('Images', imageFile3)
        console.log(e.target.dataset.id);

        editProduct(e.target.dataset.id, product);
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



if (submitReview) {





    submitReview.addEventListener('submit', e => {
        e.preventDefault()
        console.log("cameee");
        // extra the data
        console.log(e);
        const review = document.querySelector('.reviewUser').value;
        const rating = (document.querySelector('.ratingUser').value) * 1;
        console.log("id is", e.target.dataset.pid);
        addReviewByTour(e.target.dataset.pid, { review, rating })
    })
}