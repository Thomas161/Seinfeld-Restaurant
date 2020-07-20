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

  // (function checkNull() {
  //   if (el && el2) {
  //     el.addEventListener("onkeyup", myValidateNameAndDate, false);
  //     el2.addEventListener("onkeyup", myValidateNameAndDate, false);
  //   } else {
  //     return false;
  //   }
  // });

  function display(e) {
    var name = $("#patron").val();
    var time = $("#datetime24").val();
    if (name && time !== myValidateNameAndDate(e)) {
      console.log("Perfect");
    } else {
      console.log("Error");
    }
    e.preventDefault();
  }

  // function validateInput() {
  //   if (!myValidateNameAndDate()) {
  //     try {
  //       this.style.border = "3px solid red";
  //       document.getElementsByName("button").disabled = true;
  //       throw "error";
  //     } catch (err) {
  //       return err;
  //     }
  //   } else {
  //     this.style.border = "3px solid green";
  //     document.getElementsByName("button").diabled = false;
  //     return display();
  //   }
  // }

  // var person, reservation;

  // function gotData(data) {
  //   var id = data.val();
  //   var keys = Object.keys(id);

  //   console.log(keys);
  //   for (var propName in keys) {
  //     var k = keys[propName];
  //     var person = id[k].person;
  //     var reservation = id[k].reservation;

  //     console.log(person);
  //     var ul = document.getElementById("lister");
  //     var li = document.createElement("li");

  //     console.log(id);
  //     li.appendChild(document.createTextNode(person));
  //     li.appendChild(document.createTextNode(reservation));

  // li.class("document");
  // ul.appendChild(li);
  // li.class('cleanse');

  /**Error helper function */
  //   function errData(err) {
  //     console.log("Error");
  //     console.log(err);
  //   }

  /**Validate name and date inputs */

  function myValidateNameAndDate(e) {
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
      document.getElementById("submitButton").disabled = false;

      return true;
    } else {
      console.log("false they dont match");
      document.getElementById("submitButton").disabled = true;
      return false;
    }
    e.preventDefault();
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

/**Firebase plugged in => comeback to later */
//DATABASE CONFIG AND METHODS

// var config = {
//   apiKey: "AIzaSyDeDgV6YIjgWecHUTwNFP3nu6oPw899gls",
//   authDomain: "master-project-fd122.firebaseapp.com",
//   databaseURL: "https://master-project-fd122.firebaseio.com",
//   projectId: "master-project-fd122",
//   storageBucket: "",
//   messagingSenderId: "462770541013",
// };
// firebase.initializeApp(config);

// var database = firebase.database();
// var ref = database.ref("Info"); //info is the node, traversing tree
// ref.on("value", gotData, errData);

// var newPosts = {
//   person: name,
//   reservation: time,
// };
// ref.push(newPosts);
//

// ref.on("value", function (snapshot) {
//   console.log(snapshot.key);
//   console.log(snapshot.val());
