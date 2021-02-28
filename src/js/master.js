// window.addEventListener("DOMContentLoaded", function (evt) {
//   console.log("Event fired", evt);

/**Global Variables */
const sections = document.querySelectorAll("section");
// console.log(sections.length);
const homeButton = document.getElementById("top");
const homeButton2 = document.getElementById("topHome");
const bottomButton = document.getElementById("bottom");
const navBar = document.querySelector("#navbar__list");
const sec1 = document.getElementById("section1");
const sec2 = document.getElementById("section2");
let xhttp = new XMLHttpRequest();
// let header = document.getElementById("navbar-upper");
// let sticky = header.offsetTop;

const products = [
  {
    name: "Tea",
    price: 3,
    logo: "../items/tea.jpg",
  },
  {
    name: "Coffee",
    price: 3,
    logo: "../items/coffee.jpg",
  },
  {
    name: "Soda",
    price: 3.5,
    logo: "../items/soda.jpg",
  },
  {
    name: "Water",
    price: 2,
    logo: "../items/water.jpg",
  },
  {
    name: "Cookie",
    price: 4,
    logo: "../items/cookie.jpg",
  },
  {
    name: "Donut",
    price: 4,
    logo: "../items/donut.jpg",
  },
  {
    name: "Croissant",
    price: 3,
    logo: "../items/croissant.jpg",
  },
  {
    name: "Sandwich",
    price: 5,
    logo: "../items/sandwich.jpg",
  },
  {
    name: "Calzone",
    price: 6,
    logo: "../items/calzone.jpg",
  },
  {
    name: "Pizza",
    price: 10,
    logo: "../items/pizza.jpg",
  },
  {
    name: "Big Salad",
    price: 7,
    logo: "../items/bigsalad.jpg",
  },
];
let cart = {
  items: [],
  totalPrice: 0,
};

const digiClock = () => {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let seconds = date.getSeconds();

  hour = updateTime(hour);
  min = updateTime(min);
  seconds = updateTime(seconds);
  document.getElementById("clock").innerHTML =
    hour + " : " + min + " : " + seconds;

  setTimeout(() => {
    digiClock();
  }, 1000);
};

function updateTime(time) {
  if (time < 10) return "0" + time;
  else return time;
}
digiClock();

/**Dynamically built nav */
const createNavLinks = () => {
  [...sections].forEach((sec) => {
    let liElements = document.createElement("li");
    // console.log(liElements);
    let cl, ids;
    cl = liElements.className.add = "menu__link";
    // console.log(cl); //menu__link
    ids = liElements.id = "nav-" + sec.id;
    // console.log(ids); //nav-section1-4
    // console.log(liElements.id); //section 1-4
    if (liElements.id == "nav-section1") {
      liElements.innerHTML = '<i class="fa fa-home"</i>';
    }
    if (liElements.id == "nav-section2") {
      liElements.innerHTML =
        '<img src="../icons/cart.svg" id="shopping"/><span id="basketTotal">0</span>';
    }

    navBar.appendChild(liElements);
    liElements.addEventListener("click", function () {
      // console.log("clicked");
      sec.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};

$.ajax({
  url: "https://seinfeld-quotes.herokuapp.com/quotes",
  dataType: "JSON",
  method: "GET",
})
  .then((res) => {
    document.getElementById("demo").innerHTML = `"${res.quotes[1].quote}"`;
    console.log("Response text is ", res.quotes[1].quote); //entire list of quotes
  })
  .catch((err) => {
    console.log("error", err);
  });

setTimeout(cb, 3000);

function cb() {
  const hamburgerIcon = document.querySelector(".burger-nav");

  let isOpen = false;
  hamburgerIcon.addEventListener("click", (event) => {
    console.log(event.target);

    if (!isOpen) {
      hamburgerIcon.classList.add("open");

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      isOpen = true;
    } else {
      hamburgerIcon.classList.remove("open");

      isOpen = false;
    }
  });
}

function renderAllProducts() {
  const productsTable = document.getElementById("products");
  productsTable.innerHTML = "";
  products.forEach((product, index) => {
    productsTable.innerHTML += `
      <tr>
      <td>${product.name} <img src='${product.logo}' id="items"/></td>
      <td>$${product.price}</td>
      <td><button class="btn btn-success" onclick="addToCart(${index})">Add to cart</button></td>
      </tr>
      `;
  });
}
function renderAllCartItems() {
  const cartItemsTable = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  let inBasket = document.getElementById("basketTotal");
  let baskTotal = 0;
  let totalPrice = 0;
  cartItemsTable.innerHTML = "";
  if (cart.items.length === 0) {
    cartItemsTable.innerHTML = `
      <tr>
      <td colspan="5">
      Nothing here
      </td>
      </tr>
      `;
  }
  cart.items.forEach((cartItem, index) => {
    totalPrice += cartItem.total;
    baskTotal += cartItem.quantity;
    cartItemsTable.innerHTML += `
      <tr>
      <td>${cartItem.name}</td>
      <td>$${cartItem.price}</td>
      <td>${cartItem.quantity}</td>
      <td>$${cartItem.total}</td>
      <td><button class="btn btn-danger" onclick="removeFromCart('${cartItem.name}')">Remove from cart</button></td>
      </tr>
      `;
  });
  totalPriceElement.innerText = `Total : $${totalPrice}`;
  inBasket.innerText = `${baskTotal}`;
}
function addToCart(productIndex) {
  console.log(productIndex);
  const product = products[productIndex];
  let isAlreadyInCart = false;

  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name === product.name) {
      isAlreadyInCart = true;
      const newItem = {
        ...item,
        quantity: item.quantity + 1,
        total: (item.quantity + 1) * item.price,
      };
      localStorage.setItem("newCartItem", JSON.stringify(newItem));
      console.log(localStorage.getItem("newCartItem"));

      return [...state, newItem];
    }
    return [...state, item];
  }, []);
  if (!isAlreadyInCart) {
    newCartItems.push({
      ...product,
      quantity: 1,
      total: product.price,
    });
  }
  cart = {
    ...cart,
    items: newCartItems,
  };
  renderAllCartItems();
}
function removeFromCart(productName) {
  console.log(productName);

  let newCartItems = cart.items.reduce((state, item) => {
    if (item.name === productName) {
      const newItem = {
        ...item,
        quantity: item.quantity - 1,
        total: (item.quantity - 1) * item.price,
      };
      if (newItem.quantity > 0) {
        localStorage.getItem("newCartItem");
        return [...state, newItem];
      } else {
        return state;
      }
    }
    return [...state, item];
  }, []);
  cart = {
    ...cart,
    items: newCartItems,
  };
  renderAllCartItems();
}

/**Add active class when it is in viewport */
function addActiveClassWhenInViewport() {
  window.addEventListener("scroll", (event) => {
    // console.log("Type of event fired when scrolled", event.type);

    for (let i = 0; i < sections.length; i++) {
      console.log(sections[i].getBoundingClientRect());
      let top = sections[i].getBoundingClientRect().top;
      let bottom = sections[i].getBoundingClientRect().bottom;

      if (top <= 150 && bottom >= 150) {
        console.log("In viewport");
        sections[i].classList.add("your-active-class");
      } else {
        console.log("Not in viewport");
        sections[i].classList.remove("your-active-class");
      }
    }
  });
}

document.addEventListener("scroll", () => {
  addActiveClassWhenInViewport();
});

homeButton.onclick = function (e) {
  e.preventDefault();

  window.scrollTo({ top: 0, behavior: "smooth" });
};

bottomButton.onclick = function (e) {
  e.preventDefault();

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

homeButton2.onclick = function (e) {
  e.preventDefault();

  window.scrollTo({ top: 0, behavior: "smooth" });
};
// window.onscroll = function () {
//   stickyHeader();
// };

// function stickyHeader() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }

createNavLinks();

renderAllProducts();
renderAllCartItems();
addActiveClassWhenInViewport();

// });
