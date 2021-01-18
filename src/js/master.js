// window.addEventListener("DOMContentLoaded", function (evt) {
//   console.log("Event fired", evt);

/**Global Variables */
const sections = document.querySelectorAll("section");
console.log(sections.length);
const homeButton = document.getElementById("button");
const navBar = document.querySelector("#navbar__list");
const sec1 = document.getElementById("section1");
const sec2 = document.getElementById("section2");

const products = [
  {
    name: "Tea",
    price: 3,
  },
  {
    name: "Coffee",
    price: 3,
  },
  {
    name: "Soda",
    price: 3.5,
  },
  {
    name: "Water",
    price: 2,
  },
  {
    name: "Cookie",
    price: 4,
  },
  {
    name: "Donut",
    price: 4,
  },
  {
    name: "Croissant",
    price: 3,
  },
  {
    name: "Sandiwch",
    price: 5,
  },
  {
    name: "Calzone",
    price: 6,
  },
  {
    name: "Pizza",
    price: 10,
  },
  {
    name: "Big Salad",
    price: 7,
  },
];
let cart = {
  items: [],
  totalPrice: 0,
};

/**Dynamically built nav */
const createNavLinks = () => {
  [...sections].forEach((sec) => {
    let liElements = document.createElement("li");
    console.log(liElements);
    let cl, ids;
    cl = liElements.className.add = "menu__link";
    console.log(cl); //menu__link
    ids = liElements.id = "nav-" + sec.id;
    console.log(ids); //nav-section1-4
    console.log(liElements.id); //section 1-4
    if (liElements.id == "nav-section1") {
      liElements.innerHTML = '<i class="fa fa-home" style="font-size:50px"</i>';
    }
    if (liElements.id == "nav-section2") {
      liElements.innerHTML = '<img src="../icons/cart.svg" style="left:10px"/>';
    }
    navBar.appendChild(liElements);
    liElements.addEventListener("click", function () {
      console.log("clicked");
      sec.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};

function renderAllProducts() {
  const productsTable = document.getElementById("products");
  productsTable.innerHTML = "";
  products.forEach((product, index) => {
    productsTable.innerHTML += `
      <tr>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td><button class="btn btn-success" onclick="addToCart(${index})">Add to cart</button></td>
      </tr>
      `;
  });
}
function renderAllCartItems() {
  const cartItemsTable = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
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
    cartItemsTable.innerHTML += `
      <tr>
      <td>${cartItem.name}</td>
      <td>$${cartItem.price}</td>
      <td>${cartItem.quantity}</td>
      <td>$${cartItem.total}</td>
      <td><button class="btn btn-danger" onclick="removeFromCart(${cartItem.name})">Remove to cart</button></td>
      </tr>
      `;
  });
  totalPriceElement.innerText = `Total is: ${totalPrice}`;
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
    console.log("Type of event fired when scrolled", event.type);

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

createNavLinks();

renderAllProducts();
renderAllCartItems();
addActiveClassWhenInViewport();
// });
