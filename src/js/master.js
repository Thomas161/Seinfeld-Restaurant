// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }
// function ready() {
var count = 0;
var tl = new TimelineMax();
const tommy = document.getElementById("tom");
let cartItems = document.querySelectorAll(".add-cart");
let trolley = document.querySelector(".cartLi");
let box = document.querySelectorAll(".box");

tl.fromTo(tommy, 1.7, { x: -25, opacity: 0 }, { x: 0, opacity: 1, delay: 1 });
tl.fromTo(
  trolley,
  2.5,
  { opacity: 0, x: -25 },
  { opacity: 1, x: 200, ease: "power3.out" }
);
tl.fromTo(
  box,
  1.6,
  { transformOrigin: "center", scale: 0.2 },
  { scale: 1, stagger: -0.2, delay: -0.6 }
);
tl.fromTo(trolley, 2, { y: 30 }, { x: 0 });

checkLoop = () => {
  if (count > 0) tl.stop();
  else count++;
};
let productDescription = [
  {
    name: "Coffee",
    tag: "coffee",
    price: 3,
    inCart: 0,
  },
  {
    name: "Soda",
    tag: "soda",
    price: 3,
    inCart: 0,
  },
  {
    name: "Tea",
    tag: "tea",
    price: 3,
    inCart: 0,
  },
  {
    name: "Water",
    tag: "sparkling",
    price: 3,
    inCart: 0,
  },
  {
    name: "Donut",
    tag: "donut",
    price: 3.5,
    inCart: 0,
  },
  {
    name: "Croissant",
    tag: "croissant",
    price: 4,
    inCart: 0,
  },
  {
    name: "Cookie",
    tag: "cookie1",
    price: 3.5,
    inCart: 0,
  },
  {
    name: "Sandwich",
    tag: "club",
    price: 3,
    inCart: 0,
  },
  {
    name: "Calzone",
    tag: "calzone",
    price: 6.5,
    inCart: 0,
  },
  {
    name: "Pizza Slice",
    tag: "pizza",
    price: 6,
    inCart: 0,
  },

  {
    name: "Big Salad",
    tag: "bigsalad",
    price: 4,
    inCart: 0,
  },
];

for (let i = 0; i < cartItems.length; i++) {
  // console.log("Loop item", cartItems[i]);
  cartItems[i].addEventListener("click", () => {
    // console.log(e.target);
    console.log("added to cart");
    cartNumbers(productDescription[i]);
    totalCost(productDescription[i]);
  });
}

function onloadCartNumbers() {
  let getItemToStore = localStorage.getItem("cartNumbers");

  if (getItemToStore == null) {
    document.querySelector(".cartLi span").textContent = getItemToStore;
  }
}
function cartNumbers(productDescription, action) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  let prodsInCart = localStorage.getItem("productsInCart");
  prodsInCart = JSON.parse(prodsInCart);

  if (action) {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector(".cartLi span").textContent = productNumbers - 1;
    console.log("action running");
  } else if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cartLi span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartLi span").textContent = 1;
  }
  setItems(productDescription);
}

function setItems(productDescription) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  let items = localStorage.getItem("productsInCart");
  // console.log("In cart", items);
  items = JSON.parse(items);

  if (items != null) {
    let currentProduct = productDescription.tag;
    if (items[currentProduct] == undefined) {
      items = {
        ...items,
        [currentProduct]: productDescription,
      };
    }
    items[currentProduct].inCart += 1;
  } else {
    productDescription.inCart = 1;
    items = {
      [productDescription.tag]: productDescription,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(items));
}

function totalCost(productDescription, action) {
  // console.log("Price", productDescription.price);
  // let prices = productDescription.price;
  let cart = localStorage.getItem("totalCost");
  if (action) {
    cart = parseInt(cart);
    localStorage.setItem("totalCost", cart - productDescription.price);
  } else if (cart != null) {
    cart = parseInt(cart); //string to int
    localStorage.setItem(
      "totalCost",
      parseFloat(cart + productDescription.price).toFixed(2)
    );
  } else {
    localStorage.setItem(
      "totalCost",
      parseFloat(productDescription.price).toFixed(2)
    );
  }
}

function displayProducts() {
  let cartItemsStored = localStorage.getItem("productsInCart");
  cartItemsStored = JSON.parse(cartItemsStored);
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseInt(cartCost);

  let productContainer = document.querySelector(".productsList");
  let totalOrder = document.querySelector(".totalOrder");
  if (cartItemsStored && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItemsStored).map((v) => {
      productContainer.innerHTML += `
      <div class="row">
      <div class="column">
      <div class="card">
      
        <div class="card-body">
          <h5 class="card-title">${v.name}</h5>
        
          <p class="card-text">$${v.price}</p>
          <div class="quantity">
          <button id="leftArrow">-</button>
         
        <span>${v.inCart}</span>
         
          <button id="rightArrow">+</button>
          </div>
          <div>
          <p class="total">$${v.inCart * v.price}</p>
          </div>
         </div>
         </div>
        </div>
      </div>`;
    });

    // `<div class="clearOrderContainer">
    // <button onclick="function ${removeAllItemsAndHistory}">Delete</button>
    // </div>`;

    totalOrder.innerHTML += `<div class="basketTotal">
    <h4 class="basketTotalTitle">Basket Total</h4>
    <h4 class="basketTotal">$${cartCost}</h4>
    </div>`;

    // deleteButtons();
    manageQuantity();
  }
}

function manageQuantity() {
  let increaseButtons = document.querySelectorAll("#rightArrow");
  let decreaseButtons = document.querySelectorAll("#leftArrow");
  let currentQuantity = 0;
  let currentProduct = "";
  let cartItemsStored = localStorage.getItem("productsInCart");
  cartItemsStored = JSON.parse(cartItemsStored);

  for (let i = 0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener("click", () => {
      console.log(cartItemsStored);
      currentQuantity = decreaseButtons[i].parentElement.querySelector("span")
        .textContent;
      console.log(currentQuantity);
      currentProduct = decreaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      if (cartItemsStored[currentProduct].inCart > 1) {
        cartItemsStored[currentProduct].inCart -= 1;
        cartNumbers(cartItemsStored[currentProduct], "decrease");
        totalCost(cartItemsStored[currentProduct], "decrease");
        localStorage.setItem("productsInCart", JSON.stringify(cartItemsStored));
        displayProducts();
      }
    });
    increaseButtons[i].addEventListener("click", () => {
      console.log(cartItems);
      currentQuantity = increaseButtons[i].parentElement.querySelector("span")
        .textContent;
      console.log(currentQuantity);
      currentProduct = increaseButtons[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(currentProduct);

      cartItemsStored[currentProduct].inCart += 1;
      cartNumbers(cartItemsStored[currentProduct]);
      totalCost(cartItemsStored[currentProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItemsStored));
      displayProducts();
    });
  }
}
onloadCartNumbers();
displayProducts();
// }
// function deleteButtons() {
//   let deleteButtons = document.querySelectorAll(".product ion-icon");
//   let productNumbers = localStorage.getItem("cartNumbers");
//   let cartCost = localStorage.getItem("totalCost");
//   let cartItems = localStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);
//   let productName;
//   console.log(cartItems);

//   for (let i = 0; i < deleteButtons.length; i++) {
//     deleteButtons[i].addEventListener("click", () => {
//       productName = deleteButtons[i].parentElement.textContent
//         .toLocaleLowerCase()
//         .replace(/ /g, "")
//         .trim();

//       localStorage.setItem(
//         "cartNumbers",
//         productNumbers - cartItems[productName].inCart
//       );
//       localStorage.setItem(
//         "totalCost",
//         cartCost - cartItems[productName].price * cartItems[productName].inCart
//       );

//       delete cartItems[productName];
//       localStorage.setItem("productsInCart", JSON.stringify(cartItems));

//       displayCart();
//       onLoadCartNumbers();
//     });
//   }
// }

// let currentInCart = document.getElementById("currentlyInCart").value;
// currentInCart = JSON.parse(currentInCart);
// console.log(currentInCart); //number

// console.log(c);
// console.log(cartItemsStored);
// for (const [value] of Object.entries(cartItemsStored)) {
// console.log("In cart currently", key, " value " + value.inCart); //number
// let num = value.inCart++;
// if (num <= 100) {
// console.log(typeof num); //number
// let t = value.inCart * value.price;
// console.log(typeof t);
// console.log(num);
// currentInCart.value = `${num}`;
// t = Math.round(t * 100) / 100;

// document.getElementsByClassName("total")[0].textContent = `$${t}`;
// return num;
// increasingAmounts();
// }
// }
// }
// return objToArr;

// const decreaseAmounts = () => {
//   let cartItemsStored = localStorage.getItem("productsInCart");
//   cartItemsStored = JSON.parse(cartItemsStored);
//   let currentInCart = document.getElementById("currentlyInCart");
//   console.log(cartItemsStored);
//   // let objToArr = Object.entries(cartItemsStored);
//   for (const [key, value] of Object.entries(cartItemsStored)) {
//     console.log("In cart currently", key, " value " + value.inCart); //number
//     if (value.inCart >= 0) currentInCart.textContent = value.inCart - 1;
//   }
//   console.log("decrease");
// };
// let left = document.getElementById("leftArrow");
// console.log(left);
// let right = document.getElementById("rightArrow");
// console.log(right);

// left.addEventListener("click", decreaseAmounts);
// right.addEventListener("click", increasingAmounts);

// console.log();
// });
// function removeAllItemsAndHistory() {
//   console.log("delete");
// }

// window.localStorage.clear();
