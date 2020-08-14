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
      date,
      inputName,
      inputDate,
      nameResult,
      dateResult,
      emptyName,
      emptyDate,
      deleteButton,
      updateButton,
      reservation;
    reservation = document.getElementById("myList");
    let totalReservation = {
      textNodeName: $("#patron").val(),
      textNodeDate: $("#datetime24").val(),
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
    inputName = $("#patron").val();
    inputDate = $("#datetime24").val();
    name = new RegExp(/^[a-zA-Z]{3,}$/);
    date = new RegExp(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    nameResult = name.test(inputName);
    dateResult = date.test(inputDate);
    emptyName = null;
    emptyDate = null;
    if (
      nameResult &&
      dateResult &&
      inputName != emptyName &&
      inputDate != emptyDate
    ) {
      console.log("true input matches expression");
      reservation.appendChild(
        document.createTextNode(
          ` ${totalReservation.textNodeName}||${totalReservation.textNodeDate}`
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

  // document
  //   .getElementById("takeaway")
  //   .addEventListener("click", takeaway, false);

  /**Validate if defined/undefined */
  let checkDeleteId = document.getElementById("delete");
  let checkUpdateId = document.getElementById("update");
  let checkEatInCheckbox = document.getElementById("eatIn");
  let checkSubmitButton = document.getElementById("submitButton");
  let checkUpdateButton = document.getElementById("update");
  if (
    checkDeleteId &&
    checkUpdateId &&
    checkEatInCheckbox &&
    checkSubmitButton &&
    checkUpdateButton
  ) {
    document.addEventListener("click", removeBooking, false);
    document.addEventListener("click", newReservation, false);
    document.addEventListener("click", updateCheckbox, false);
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

  function updateCheckbox(evt) {
    evt.preventDefault();
    let checkedBox = document.getElementById("eatIn");
    let text = document.getElementById("pText");
    // console.log(checkedBox);
    if (checkedBox.checked == true) {
      console.log("checked");
      text.style.display = "block";
    } else {
      console.log("unchecked");
      text.style.display = "none";
    }
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
