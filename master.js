 //DATABASE CONFIG AND METHODS

 var config = {
    apiKey: "AIzaSyDeDgV6YIjgWecHUTwNFP3nu6oPw899gls",
    authDomain: "master-project-fd122.firebaseapp.com",
    databaseURL: "https://master-project-fd122.firebaseio.com",
    projectId: "master-project-fd122",
    storageBucket: "",
    messagingSenderId: "462770541013"
  };
  firebase.initializeApp(config);

 var database= firebase.database();
 var ref = database.ref('Info');//info is the node, traversing tree
ref.on('value', gotData, errData);

  function display(){

  var name = $('#patron').val();
  console.log(name);
   var time = $('#datetime24').val();
   console.log(time);

   var newPosts = {
    "person" : name,
    "reservation": time
   }
   ref.push(newPosts);
 }

 ref.on("value", function(snapshot){
  console.log(snapshot.key);
  console.log(snapshot.val());
})

 function checker(){
   if(document.getElementById('patron').value == "" & document.getElementById('datetime24').value == ""){
     alert('no good dawg, gotta submit something');
      document.getElementById('patron').style.borderColor = "red";
      document.getElementById('datetime24').style.borderColor = "red";
   } else {
    display();
   }
     
   }


  var person, reservation;

function gotData(data){

  // var cleaner = selectAll('.cleanse');
  // for(var i =0; i < cleanse.length; i++){
    // cleaner[i].remove();
  // }

 // console.log(data.val());
  var id = data.val();
 // var reservation = data.val();
  var keys = Object.keys(id);
 // var keys = Object.keys(reservation);
 console.log(keys);
  for(var propName in keys){
     var k =keys[propName];
     var person = id[k].person;
    var reservation = id[k].reservation;
    console.log(person);
    var ul = document.getElementById('lister');
    var li = document.createElement("li");
    console.log(id);
    li.appendChild(document.createTextNode(person));
    li.appendChild(document.createTextNode(reservation)); 
   // li.class("document");
     ul.appendChild(li);
     // li.class('cleanse');
   }
  

}
function errData(err){
  console.log("Error");
  console.log(err);
}

//VALIDATION METHODS FOR USER INPUT

function myValidate(input){
  var vz = /[^a-z]/gi;
  input.value = input.value.replace(vz, "");

}
 function myValdez(input){
  var vds = /\d{2}[-\s]\d{2}[-\s]\d{4}[-\s]\d{2}[:\s]\d{2}\s\s\s\s/;
  input.value = input.value.replace(vds);

}
function complete(){
  //var frm = document.getElementByName("finished");
 document.getElementById("patron").value = '';
 document.getElementById("datetime24").value = '';
}

  //console.log(reset());
 // frm.reset();//uncaught error, reset not defined
 // return false;
// input.value = input.value.reset(destination);



// function display() {
// var data = {
  // var name = ("patron").value;
  // var name = ("datetime24").value;
// }
// ref.push(data);
// }


// function layout(){
  // var name = document.getElementById('patron').value;
   // var time = document.getElementById('datetime24').value;
	
    // ref.push(time);


//ref.push(data());

//function layout(){
  //var time = document.getElementById('datetime24').value;
  //ref.push(time);







