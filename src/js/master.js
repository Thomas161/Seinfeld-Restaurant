document.addEventListener("DOMContentLoaded", function (event) {
  var count = 0;
  var tl = new TimelineMax();
  var cont, cont2, cont3;
  cont = document.querySelector(".container");
  cont2 = document.querySelector(".container2");
  cont3 = document.querySelector(".container3");
  tl.fromTo(cont, 0.9, { y: -400 }, { y: 0, ease: Power2.easeOut });
  tl.fromTo(
    cont2,
    0.9,
    { y: 400 },
    { y: 0, ease: Power2.easeOut, delay: -0.3 }
  );

  tl.fromTo(
    cont3,
    0.9,
    { x: -400 },
    { x: 0, ease: Power2.easeOut, delay: -0.3 }
  );

  event.preventDefault();

  checkLoop = () => {
    if (count > 0) tl.stop();
    else count++;
  };

  //global variables
  let reservation = document.getElementById("myList");
  let totalReservation = {
    textNodeName: $("#patron").val(),
    textNodeDate: $("#datetime24").val(),
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
      emptyDate;
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
          ` ${totalReservation.textNodeName} || ${totalReservation.textNodeDate}\n`
        )
      );
      reservation
        .appendChild(deleteButtons())
        .addEventListener("click", removeBooking, false);
      reservation.appendChild(updateButtons());

      return true;
    } else {
      alert("can't submit nothing, or invalid details");
      return false;
    }
  }

  /**Event Listeners */
  document
    .getElementById("submitButton")
    .addEventListener("click", myValidateNameAndDate, false);

  document
    .getElementById("submitButton")
    .addEventListener("click", clearFields, false);

  var checkDeleteId = document.getElementById("delete");
  if (checkDeleteId) {
    document.addEventListener("click", removeBooking, false);
  } else {
    return null;
  }

  /**Remove bookings */
  function removeBooking(evt) {
    evt.preventDefault();
    console.log("button working");
    // let { textNodeName, textNodeDate } = totalReservation;
    // reservation.removeChild(document.removeChild(textNodeName, textNodeDate));
  }

  /**CRUD Buttons */

  function deleteButtons() {
    let deleteButton;
    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "DELETE";
    deleteButton.style =
      "width:70px; height:30px; background:pink; color: blue";
    deleteButton.id = "delete";
  }

  function updateButtons() {
    let updateButton;
    updateButton = document.createElement("button");
    updateButton.innerHTML = "Update";
    updateButton.style =
      "width:70px; height:30px; background:gold; color: maroon";
    updateButton.id = "update";
  }
  /**Clear fields on submit */
  function clearFields() {
    document.getElementById("patron").value = "";
    document.getElementById("datetime24").value = "";
  }
});
