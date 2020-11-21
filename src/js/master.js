document.addEventListener("DOMContentLoaded", function (event) {
  var count = 0;
  var tl = new TimelineMax();
  // var cont, cont2, cont3, tommy, kramer, seinfeld;
  // cont = document.querySelector("#containerTop");
  // cont2 = document.querySelector("#containerMiddle");
  // cont3 = document.querySelector("#containerBottom");
  const tommy = document.getElementById("tom");
  // kramer = document.getElementById("imageContainer");
  // seinfeld = document.getElementById("imageContainer2");
  // tl.fromTo(cont2, 1, { y: -860 }, { y: 0, ease: Power1.easeOut });
  // tl.fromTo(cont, 1, { y: -460 }, { y: 0, ease: Power1.easeOut, delay: 0.9 });
  // tl.fromTo(
  //   cont3,
  //   1,
  //   { autoAlpha: 0 },
  //   { autoAlpha: 1, ease: Power1.easeOut, delay: 0.5 }
  // );
  tl.fromTo(tommy, 1.7, { x: -25, opacity: 0 }, { x: 0, opacity: 1, delay: 1 });
  // (function playBackReverseFooterImages() {
  //   var footerTimeline = new TimelineMax();
  //   footerTimeline.fromTo(
  //     kramer,
  //     1,
  //     { scaleX: 0, transformOrigin: "center center" },
  //     { scaleX: 1, y: 0, ease: Power1.easeIn }
  //   );
  //   footerTimeline.to(kramer, 1, {
  //     scaleX: 0,
  //     y: 0,
  //     delay: 2,
  //   });
  //   footerTimeline.fromTo(
  //     seinfeld,
  //     1,
  //     { scaleX: 0, transformOrigin: "center center" },
  //     {
  //       scaleX: 1,
  //       y: 0,
  //       ease: Power1.easeIn,
  //       delay: 2,
  //     }
  //   );

  //   footerTimeline.to(kramer, 1, {
  //     scaleX: 0,
  //     y: 0,
  //     delay: 2,
  //   });
  //   footerTimeline.delay(6).repeat(-1);
  // })();

  // cont.addEventListener("mouseover", function () {
  //   cont.style.transform = "scale(1.15)";
  // });
  // cont.addEventListener("mouseout", function () {
  //   cont.style.transform = "scale(1)";
  // });
  // cont2.addEventListener("mouseover", function () {
  //   cont2.style.transform = "scale(1.15)";
  // });
  // cont2.addEventListener("mouseout", function () {
  //   cont2.style.transform = "scale(1)";
  // });
  // cont3.addEventListener("mouseover", function () {
  //   cont3.style.transform = "scale(1.15)";
  // });
  // cont3.addEventListener("mouseout", function () {
  //   cont3.style.transform = "scale(1)";
  // });

  event.preventDefault();

  checkLoop = () => {
    if (count > 0) tl.stop();
    else count++;
  };
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
