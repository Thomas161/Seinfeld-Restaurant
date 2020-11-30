// document.addEventListener("DOMContentLoaded", function (event) {
var count = 0;
var tl = new TimelineMax();
const tommy = document.getElementById("tom");
let cartItems = document.querySelectorAll(".add-cart");
let productDescription = [
  {
    name: "Coffee",
    tag: "cafe",
    price: 3,
    inCart: 0,
  },
  {
    name: "Soda",
    tag: "pepsi",
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
    tag: "H20",
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
    tag: "pastry",
    price: 4,
    inCart: 0,
  },
  {
    name: "Cookie",
    tag: "cookie",
    price: 3.5,
    inCart: 0,
  },
  {
    name: "Sandwich",
    tag: "sandwich",
    price: 3,
    inCart: 0,
  },
  {
    name: "Calzone",
    tag: "foldover",
    price: 6.5,
    inCart: 0,
  },
  {
    name: "Pizza Slice",
    tag: "slice",
    price: 6,
    inCart: 0,
  },

  {
    name: "Big Salad",
    tag: "salad",
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
  console.log(
    "Items stored that will be stored on DOM",
    JSON.parse(cartItemsStored)
  );

  let productContainer = document.querySelector(".productsList");
  if (cartItemsStored && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItemsStored).map((i) => {
      productContainer.innerHTML += `<div class="productsList"><span>${i.name}</span></div>`;
    });
  }
}
onloadCartNumbers();
displayProducts();
// window.localStorage.clear();
// });
