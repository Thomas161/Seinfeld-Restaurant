document.addEventListener("DOMContentLoaded", function (event) {
  var count = 0;
  var tl = new TimelineMax();
  const tommy = document.getElementById("tom");
  let cartItems = document.querySelectorAll(".add-cart");

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
      localStorage.setItem(
        "totalCost",
        parseFloat(cartCost + prices).toFixed(2)
      );
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

  // let increaseProduct = document.querySelector(".fas fa-angle-double-left");

  // increaseProduct.addEventListener("click", increasingAmounts);
  // let decreaseProduct = document.querySelector(".fas fa-angle-double-left");
  // decreaseProduct.addEventListener("click", decreaseAmounts);

  // function increasingAmounts() {
  //   let cartItemsStored = localStorage.getItem("productsInCart");
  //   cartItemsStored = JSON.parse(cartItemsStored);
  //   Object.values(cartItemsStored).map((i) => {
  //     console.log(i.inCart + "" + i.price);
  //   });
  // }
  // function decreaseAmounts() {
  //   let cartItemsStored = localStorage.getItem("productsInCart");
  //   cartItemsStored = JSON.parse(cartItemsStored);
  //   Object.values(cartItemsStored).map((i) => {
  //     console.log(i.inCart + "" + i.price);
  //   });
  // }

  onloadCartNumbers();
  displayProducts();
  // window.localStorage.clear();
});
