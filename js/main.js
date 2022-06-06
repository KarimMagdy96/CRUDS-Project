let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount"); //null
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let invaliedMsg= document.getElementById('invalidMsg');
let mode = "creat";
let tmp;
let validtitle='';
let validcatgory='';


//total
function prodactTotal() {
  if (price.value != "") {
    let result =
      Number(price.value) +
      Number(tax.value) +
      Number(ads.value) -
      Number(discount.value);
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "gray";
  }
}

//creat data and save it
let prodactContainer;

if (localStorage.savedProdacts != null) {
  prodactContainer = JSON.parse(localStorage.savedProdacts);
  displayProducts();
} else {
  prodactContainer = [];
}

function submitData() {
  if(validatProdact()==true && validtitle=='valid'){
    let prodact = {
      title: title.value,
      price: price.value,
      tax: tax.value,
      ads: ads.value,
      discount: discount.value,
      count: count.value,
      total: total.innerHTML,
      category: category.value,
    };
    if (mode === "creat") {
      if (prodact.count > 1) {
        for (let i = 0; i < prodact.count; i++) {
          prodactContainer.push(prodact);
          localStorage.setItem("savedProdacts", JSON.stringify(prodactContainer));
          displayProducts();
          total.style.backgroundColor = "gray";
        }
      } else {
        prodactContainer.push(prodact);
        total.style.backgroundColor = "gray";
      }
    } else {
      prodactContainer[tmp] = prodact;
      submit.innerHTML = "Creat";
      count.style.display = "block";
      mode = "creat";
      total.style.backgroundColor = "gray";
    }
    localStorage.setItem("savedProdacts", JSON.stringify(prodactContainer));
    displayProducts();
    clearForm();
  }
  else[
    console.log('hello')
  ]
}
//CLEAR FORMt

function clearForm() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}

//display Products

function displayProducts() {
  let tablerow = ``;
  for (let i = 0; i < prodactContainer.length; i++) {
    tablerow += `
        <tr>
        <td>${i + 1}</td>
        <td>${prodactContainer[i].title}</td>
        <td>${prodactContainer[i].price}</td>
        <td>${prodactContainer[i].tax}</td>
        <td>${prodactContainer[i].ads}</td>
        <td>${prodactContainer[i].discount}</td>
        <td>${prodactContainer[i].total}</td>
        <td>${prodactContainer[i].category}</td>
        <td><button class="btn btn-danger" onclick='deleteProducts(${i})'>Delete</button></td>
        <td><button class="btn btn-warning" onclick='updateProducts(${i})'>Update</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = tablerow;
  if (prodactContainer.length > 1) {
    document.getElementById("deletBtn").innerHTML = `
  <button onclick='deleteAll()' class="btn bg-danger text-white w-100 text-capitalize mt-3 border-5 text-uppercase">delete all(${prodactContainer.length})</button>
    `;
  } else {
    document.getElementById("deletBtn").innerHTML = ``;
  }
}

//deleteProdacts

function deleteProducts(index) {
  prodactContainer.splice(index, 1);
  localStorage.setItem("savedProdacts", JSON.stringify(prodactContainer));
  displayProducts();
}

//delete all
function deleteAll() {
  prodactContainer.splice(0);
  localStorage.clear();
  displayProducts();
}

//update

function updateProducts(updateIndex) {
  title.value = prodactContainer[updateIndex].title;
  price.value = prodactContainer[updateIndex].price;
  tax.value = prodactContainer[updateIndex].tax;
  discount.value = prodactContainer[updateIndex].discount;
  category.value = prodactContainer[updateIndex].category;
  submit.innerHTML = "Update";
  count.style.display = "none";
  mode = "update";
  prodactTotal();
  tmp = updateIndex;
}

//prepare for update
let updateMode = "title";

function perpUpdate(id) {
  let search = document.getElementById("search");
  if (id == "searchTittle") {
    updateMode = "title";
  } else {
    updateMode = "category";
  }
  search.placeholder = "Search By " + updateMode;

  search.focus();
  search.value = "";
  displayProducts();
}

function SearchProdacts(value) {
  let tablerow = ``;
  for (let i = 0; i < prodactContainer.length; i++) {
    if (updateMode == "title") {
      if (
        prodactContainer[i].title.toLowerCase().includes(value.toLowerCase()) ==
        true
      ) {
        tablerow += `
        <tr>
        <td>${i + 1}</td>
        <td>${prodactContainer[i].title}</td>
        <td>${prodactContainer[i].price}</td>
        <td>${prodactContainer[i].tax}</td>
        <td>${prodactContainer[i].ads}</td>
        <td>${prodactContainer[i].discount}</td>
        <td>${prodactContainer[i].total}</td>
        <td>${prodactContainer[i].category}</td>
        <td><button class="btn btn-danger" onclick='deleteProducts(${i})'>Delete</button></td>
        <td><button class="btn btn-warning" onclick='updateProducts(${i})'>update</button></td>
        </tr>
        `;
      }
    } else {
      if (
        prodactContainer[i].category
          .toLowerCase()
          .includes(value.toLowerCase()) == true
      ) {
        tablerow += `
        <tr>
        <td>${i + 1}</td>
        <td>${prodactContainer[i].title}</td>
        <td>${prodactContainer[i].price}</td>
        <td>${prodactContainer[i].tax}</td>
        <td>${prodactContainer[i].ads}</td>
        <td>${prodactContainer[i].discount}</td>
        <td>${prodactContainer[i].total}</td>
        <td>${prodactContainer[i].category}</td>
        <td><button class="btn btn-danger" onclick='deleteProducts(${i})'>Delete</button></td>
        <td><button class="btn btn-warning" onclick='updateProducts(${i})'>update</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tablerow;
}
function validatProdact(validId){
  
  let regxTittle=/^[A-Z]{2,9} ?[A-Za-z]{0,9} ? [A-Z]{1,3}[1-9]{0,5}[0]{0,2} ?[A-Z]{0,9}$/gi;
  let refgxCategory=/^([A-Z]{2,9}|I PHONE)$/gi;
  if(validId=='title'){
  if(regxTittle.test(title.value)==true){
    title.classList.replace('is-invalid','is-valid');
    invaliedMsg.classList.add('d-none');
    validtitle='valid';
    return true;
  }
  else{
    title.classList.add('is-invalid');
    invaliedMsg.classList.replace('d-none','d-block');
    return false;
  }}
  else{
    if(refgxCategory.test(category.value)==true){
      title.classList.replace('is-invalid','is-valid');
      invalidMsgForCat.classList.add('d-none');
      return true;
    }
    else{
      title.classList.add('is-invalid');
      invalidMsgForCat.classList.replace('d-none','d-block');
      return false;
    }
  }
}