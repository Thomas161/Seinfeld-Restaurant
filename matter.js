
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBg_RapS8EOiLa8I3i1pTCE_0Oj13Da4qY",
    authDomain: "my-master-extension.firebaseapp.com",
    databaseURL: "https://my-master-extension.firebaseio.com",
    projectId: "my-master-extension",
    storageBucket: "",
    messagingSenderId: "634404212316"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref('feedback');


function sender(){
    var customer = $('#fname').val();
  console.log(customer);
   var address = $('#email').val();
   console.log(address);
   var tips = $('#subject').val();
   console.log(tips);

   var newPosts = {
    "person" : customer,
    "reservation": address,
    "notes": tips
   }
   ref.push(newPosts);
 };

 function doneskies(){
  //var frm = document.getElementByName("finished");
 document.getElementById("fname").value = '';
 document.getElementById("email").value = '';
 document.getElementById("subject").value = '';
}
