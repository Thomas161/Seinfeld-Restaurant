document.addEventListener("DOMContentLoaded", function (event) {
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

  event.preventDefault();

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

  (function onloadCartNumbers() {
    let getItemToStore = localStorage.getItem("cartNumbers");

    if (getItemToStore) {
      document.querySelector(".cartLi span").textContent = getItemToStore;
    }
  })();
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
});

/**Validate name and date inputs */

// function myValidateNameAndDate(e) {
//   e.preventDefault();
//   var name,
//     address,
//     email,
//     inputName,
//     inputAddress,
//     inputEmail,
//     nameResult,
//     emailResult,
//     addressResult,
//     emptyName,
//     emptyEmail,
//     emptyAddress;
// deleteButton,
// updateButton,
// reservation;
// reservation = document.getElementById("myList");
// let totalReservation = {
//   textNodeName: $("#person").val(),
//   textNodeEmail: $("#emailInput").val(),
//   textNodeAddress: $("#address").val(),
// };
// deleteButton = document.createElement("button");
// deleteButton.innerHTML = "DELETE";
// deleteButton.style =
//   "width:70px; height:30px; background:pink; color: blue";
// deleteButton.id = "delete";
// updateButton = document.createElement("button");
// updateButton.innerHTML = "Update";
// updateButton.style =
//   "width:70px; height:30px; background:gold; color: maroon";
// updateButton.id = "update";
// inputName = $("#person").val();
// inputEmail = $("#emailInput").val();
// inputAddress = $("#address").val();
// name = new RegExp(/^[a-zA-Z]{3,}$/);
// email = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/);
// address = new RegExp(/^\d+\s[A-z]+\s[A-z]+/);
// nameResult = name.test(inputName);
// emailResult = email.test(inputEmail);
// addressResult = address.test(inputAddress);
// emptyName = null;
// emptyAddress = null;
// emptyEmail = null;
// if (
//   nameResult &&
//   emailResult &&
//   addressResult &&
//   inputName != emptyName &&
//   inputEmail != emptyEmail &&
//   inputAddress != emptyAddress
// ) {
//   console.log("true input matches expression");
// let { textNodeName, textNodeEmail, textNodeAddress } = totalReservation;
// reservation.appendChild(
//   document.createTextNode(
//     ` ${textNodeName}||${textNodeEmail}||${textNodeAddress}`
//   )
// );
// reservation.style.visibility = "visible";
// reservation
//   .appendChild(deleteButton)
//   .addEventListener("click", removeBooking, false);
// reservation.appendChild(updateButton);

//     return true;
//   } else {
//     alert("can't submit nothing, or invalid details");
//     return false;
//   }
// }

/**Validate if defined/undefined */
// let checkDeleteId = document.getElementById("delete");
// let checkUpdateId = document.getElementById("update");
// let checkSubmitButton = document.getElementById("submitButton");
// let checkUpdateButton = document.getElementById("update");
// if (
// checkDeleteId &&
// checkUpdateId &&
// checkSubmitButton != null
// checkUpdateButton
// ) {
// document.addEventListener("click", removeBooking, false);
// document.addEventListener("click", myValidateNameAndDate, false);
// document.addEventListener("click", clearFields, false);
// document.addEventListener("click", newReservation, false);
// } else {
//   return null;
// }

/**Remove bookings */
// function removeBooking(evt) {
//   evt.preventDefault();
//   console.log("button working");
//   let pre = document.getElementById("myList");
//   pre.remove();
// }

/**Update Booking */

// function newReservation() {
//   let newName, newDate;
//   newName = prompt("Change Name : ");
//   newDate = prompt("Change Date : ");
//   updatedReservation(newName, newDate);
// }
// function updatedReservation(newName, newDate) {
//   document.getElementById("patron").innerHTML = newName;
//   document.getElementById("datetime24").innerHTML = newDate;
// }

/**Clear fields on submit */
//   function clearFields() {
//     document.getElementById("person").value = "";
//     document.getElementById("emailInput").value = "";
//     document.getElementById("address").value = "";
//   }
// })
