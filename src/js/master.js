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
      reservation,
      node,
      textNodeName,
      textNodeDate;
    reservation = document.getElementById("myList");
    node = document.createElement("li");
    textNodeName = $("#patron").val();
    textNodeDate = $("#datetime24").val();
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
        document.createTextNode(textNodeName + "<button>Delete</button>")
      );
      reservation.appendChild(
        document.createTextNode(`${textNodeDate} <button>Delete</button>`)
      );
      return true;
    } else {
      alert("can't submit nothing, or invalid details");
      return false;
    }
  }

  document
    .getElementById("submitButton")
    .addEventListener("click", myValidateNameAndDate, false);

  document
    .getElementById("submitButton")
    .addEventListener("click", clearFields, false);

  /**Clear fields on submit */
  function clearFields() {
    document.getElementById("patron").value = "";
    document.getElementById("datetime24").value = "";
  }
});
