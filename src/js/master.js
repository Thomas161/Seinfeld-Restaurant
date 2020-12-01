// document.addEventListener("DOMContentLoaded", function (event) {
var count = 0;
var tl = new TimelineMax();
const tommy = document.getElementById("tom");
let cartItems = document.querySelectorAll(".add-cart");
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

tl.fromTo(tommy, 1.7, { x: -25, opacity: 0 }, { x: 0, opacity: 1, delay: 1 });

// event.preventDefault();

checkLoop = () => {
  if (count > 0) tl.stop();
  else count++;
};

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
function cartNumbers(productDescription) {
  let getItemToStore = localStorage.getItem("cartNumbers");

  getItemToStore = parseInt(getItemToStore);
  if (getItemToStore) {
    localStorage.setItem("cartNumbers", getItemToStore + 1);
    document.querySelector(".cartLi span").textContent = getItemToStore + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cartLi span").textContent = 1;
  }
  setItems(productDescription);
}

function setItems(productDescription) {
  let items = localStorage.getItem("productsInCart");
  console.log("In cart", items);
  items = JSON.parse(items);

  if (items != null) {
    if (items[productDescription.tag] == undefined) {
      items = {
        ...items,
        [productDescription.tag]: productDescription,
      };
    }
    items[productDescription.tag].inCart += 1;
  } else {
    productDescription.inCart = 1;
    items = {
      [productDescription.tag]: productDescription,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(items));
}

function totalCost(productDescription) {
  // console.log("Price", productDescription.price);

  let cartCost = localStorage.getItem("totalCost");
  let prices = productDescription.price;
  console.log(typeof cartCost); //string
  if (cartCost != null) {
    cartCost = parseInt(cartCost); //string to int
    localStorage.setItem("totalCost", parseFloat(cartCost + prices).toFixed(2));
  } else {
    localStorage.setItem("totalCost", parseFloat(prices).toFixed(2));
  }
}

function displayProducts() {
  let cartItemsStored = localStorage.getItem("productsInCart");
  cartItemsStored = JSON.parse(cartItemsStored);
  let productContainer = document.querySelector(".productsList");
  console.log(cartItemsStored);
  let cartCost = localStorage.getItem("totalCost");
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
          <i class="fas fa-angle-double-left"></i>
          <span>${v.inCart}</span>
          <i class="fas fa-angle-double-right"></i>
         
          </div>
          <div>
          <p class="total">$${v.inCart * v.price}</p>
          </div>
         </div>
         </div>
        </div>
      </div>`;
    });

    totalOrder.innerHTML += `<div class="basketTotal">
    <h4 class="basketTotalTitle">Basket Total</h4>
    <h4 class="basketTotal">$${cartCost}</h4>
    </div>`;
  }
}

onloadCartNumbers();
displayProducts();
// window.localStorage.clear();
// });
