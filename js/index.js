let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("prductCategory");
let productDesc = document.getElementById("productDesc");
let rowData = document.getElementById("rowData");
let prductImage = document.getElementById("prductImage");
let searchTerm = document.getElementById("searchTerm");
let addbtn = document.querySelector('.btn-outline-primary');
let updatebtn = document.querySelector('.btn-outline-warning');

let products;

if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
    displayProduct(products);
} else {
    products = [];
}

function validateForm() {
    let validName = validateProductName();
    let validPrice = validateProductPrice();
    let validCategory = validateProductCategory();
    let validDesc = validateProductDesc();
    let validImage = validateProductImage();
    return validName && validPrice && validCategory && validDesc && validImage;
}

function addProduct() {
    if (validateForm()) {
        let product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDesc.value,
            image: `images/${prductImage.files[0].name}`
        };
        clearForm();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        console.log(products);
        displayProduct(products);
    }
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
    prductImage.value = '';
    let inputs = [productName, productPrice, productCategory, productDesc, prductImage];
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
        input.nextElementSibling.innerText = "";
    });
}

function displayProduct(arr) {
    let cartoona = '';
    for (let i = 0; i < arr.length; i++) {
        cartoona += `           
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card shadow p-2">
                <div class="card-img">
                     <img src="${arr[i].image}" class="w-100 card-img" alt="">
                </div>
                <div class="card-body text-capitalize">
                    <h3 class="card-title">${arr[i].name}</h3>
                    <p class="text-danger h5">${arr[i].price} $</p>
                    <h5><i class="fa-solid fa-tags"></i> ${arr[i].category}</h5>
                    <h5 class="text-secondary fs-6">${arr[i].description}</h5>
                    <button class="btn btn-danger p-2 m-2 w-100" onclick="deleteProduct(${i})">Delete</button>
                    <a href="#productName"><button class="btn btn-warning p-2 m-2 w-100"  onclick="setUpdateForm(${i})">Update</button></a>
                </div>
            </div>
        </div>`;
    }
    rowData.innerHTML = cartoona;
}

function deleteProduct(id) {
    products.splice(id, 1);
    localStorage.setItem('products', JSON.stringify(products));
    console.log(products);
    displayProduct(products);
}

function search() {
    let searchRes = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLocaleLowerCase().includes(searchTerm.value.toLocaleLowerCase())) {
            searchRes.push(products[i]);
        }
    }
    displayProduct(searchRes);
    console.log(searchTerm.value);
}

let currentId;

function setUpdateForm(id) {
    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
    productName.value = products[id].name;
    productPrice.value = products[id].price;
    productCategory.value = products[id].category;
    productDesc.value = products[id].description;
    currentId = id;
}

function updateProduct() {
    if (validateForm()) {
        products[currentId].name = productName.value;
        products[currentId].price = productPrice.value;
        products[currentId].category = productCategory.value;
        products[currentId].description = productDesc.value;
        products[currentId].image= `images/${prductImage.files[0].name}`
        
        addbtn.classList.remove('d-none');
        updatebtn.classList.add('d-none');
        localStorage.setItem('products', JSON.stringify(products));
        console.log(products);
        displayProduct(products);
        clearForm();
    }
}

productName.addEventListener('input', validateProductName);
productPrice.addEventListener('input', validateProductPrice);
productCategory.addEventListener('input', validateProductCategory);
productDesc.addEventListener('input', validateProductDesc);
prductImage.addEventListener('change', validateProductImage);




function validateProductName() {
    if (productName.value.trim().length > 3) {
        setValid(productName);
        return true;
    } else {
        setInvalid(productName, "Product name must be longer than 3 characters.");
        return false;
    }
}

function validateProductPrice() {
    if (parseFloat(productPrice.value) > 1000) {
        setValid(productPrice);
        return true;
    } else {
        setInvalid(productPrice, "Product price must be more than 1000.");
        return false;
    }
}

function validateProductCategory() {
    if (productCategory.value.trim() !== "") {
        setValid(productCategory);
        return true;
    } else {
        setInvalid(productCategory, "Product category must be selected.");
        return false;
    }
}

function validateProductDesc() {
    if (productDesc.value.trim().length > 20) {
        setValid(productDesc);
        return true;
    } else {
        setInvalid(productDesc, "Product description must be longer than 20 characters.");
        return false;
    }
}

function validateProductImage() {
    const file = prductImage.files[0];
    if (file && (/\.(jpg|jpeg|png|gif)$/i).test(file.name)) {
        setValid(prductImage);
        return true;
    } else {
        setInvalid(prductImage, "Please select a valid image file.");
        return false;
    }
}

function setInvalid(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.nextElementSibling.innerText = message;
    input.nextElementSibling.classList.remove('d-none');

}

function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.nextElementSibling.innerText = "";
    input.nextElementSibling.classList.add('d-none');

}