document.addEventListener("DOMContentLoaded", function (event) {
  var count = 0;
  var tl = new TimelineMax();
  var cont, cont2, cont3;
  cont = document.querySelector("#containerTop");
  cont2 = document.querySelector("#containerMiddle");
  cont3 = document.querySelector("#containerBottom");
  tl.fromTo(cont, 0.75, { x: 960 }, { x: 0, ease: Power2.easeOut, delay: 0.5 });
  tl.fromTo(
    cont2,
    0.75,
    { x: 960 },
    { x: 0, ease: Power2.easeOut, delay: -0.3 }
  );

  tl.fromTo(
    cont3,
    0.75,
    { x: 960 },
    { x: 0, ease: Power2.easeOut, delay: -0.3 }
  );

  event.preventDefault();

  checkLoop = () => {
    if (count > 0) tl.stop();
    else count++;
  };

  /**Validate name and date inputs */

  function myValidateNameAndDate(e) {
    e.preventDefault();
    var name,
      address,
      email,
      inputName,
      inputAddress,
      inputEmail,
      nameResult,
      emailResult,
      addressResult,
      emptyName,
      emptyEmail,
      emptyAddress,
      deleteButton,
      updateButton,
      reservation;
    reservation = document.getElementById("myList");
    let totalReservation = {
      textNodeName: $("#person").val(),
      textNodeEmail: $("#emailInput").val(),
      textNodeAddress: $("#address").val(),
    };
    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "DELETE";
    deleteButton.style =
      "width:70px; height:30px; background:pink; color: blue";
    deleteButton.id = "delete";
    updateButton = document.createElement("button");
    updateButton.innerHTML = "Update";
    updateButton.style =
      "width:70px; height:30px; background:gold; color: maroon";
    updateButton.id = "update";
    inputName = $("#person").val();
    inputEmail = $("#emailInput").val();
    inputAddress = $("#address").val();
    name = new RegExp(/^[a-zA-Z]{3,}$/);
    email = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/);
    address = new RegExp(
      /\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{4}/
    );
    nameResult = name.test(inputName);
    emailResult = email.test(inputEmail);
    addressResult = address.test(inputAddress);
    emptyName = null;
    emptyAddress = null;
    emptyEmail = null;
    if (
      nameResult &&
      emailResult &&
      addressResult &&
      inputName != emptyName &&
      inputEmail != emptyEmail &&
      inputAddress != emptyAddress
    ) {
      console.log("true input matches expression");
      let { textNodeName, textNodeEmail, textNodeAddress } = totalReservation;
      reservation.appendChild(
        document.createTextNode(
          ` ${textNodeName}||${textNodeEmail}||${textNodeAddress}`
        )
      );
      reservation.style.visibility = "visible";
      reservation
        .appendChild(deleteButton)
        .addEventListener("click", removeBooking, false);
      reservation.appendChild(updateButton);

      return true;
    } else {
      alert("can't submit nothing, or invalid details");
      return false;
    }
  }

  /**Validate if defined/undefined */
  let checkDeleteId = document.getElementById("delete");
  let checkUpdateId = document.getElementById("update");
  let checkSubmitButton = document.getElementById("submitButton");
  let checkUpdateButton = document.getElementById("update");
  if (
    checkDeleteId &&
    checkUpdateId &&
    checkSubmitButton &&
    checkUpdateButton
  ) {
    document.addEventListener("click", removeBooking, false);
    document.addEventListener("click", myValidateNameAndDate, false);
    document.addEventListener("click", clearFields, false);
    document.addEventListener("click", newReservation, false);
  } else {
    return null;
  }

  /**Remove bookings */
  function removeBooking(evt) {
    evt.preventDefault();
    console.log("button working");
    let pre = document.getElementById("myList");
    pre.remove();
  }

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
  function clearFields() {
    document.getElementById("patron").value = "";
    document.getElementById("datetime24").value = "";
  }
});
