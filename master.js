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
ref.delete('Info');
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
   
function removeIfRequired() {
  var del = firebase.database().ref('Info/');
  del.remove().
    then( ()=> {
      console.log('Successfully deleted the records');
      }).
    catch( (error)=> {
      console.log('got an error in deleting records', error);
     })
  console.log('removed objects',del);
   }
 


  var person, reservation;

function gotData(data){

  var id = data.val();

  var keys = Object.keys(id);

 console.log(keys);
  for(var propName in keys){
     var k =keys[propName];
     var person = id[k].person;
    var reservation = id[k].reservation;
    
    console.log(person);
    var ul = document.getElementById('lister');
    var li = document.createElement("li");
    var x = document.createElement('span');
    x.textContent = 'x';
    console.log(id);
    li.appendChild(document.createTextNode(person));
    li.appendChild(document.createTextNode(reservation)); 
    li.appendChild(x);
   // li.class("document");
     ul.appendChild(li);
     // li.class('cleanse');
    
    x.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement;
      db.collection('Info').doc(id).delete();
    })
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

function complete(){
 document.getElementById("patron").value = '';
 document.getElementById("datetime24").value = '';
}


// $('input').click(function () {
//   ('#lister').remove();
// })

// function remove(e) {
//   //use an event
//   var li = e.target;
//   //select the li elements
//   var listItems = document.querySelectorAll("li");
//   //target the ul
//   var ul = document.getElementById("candidate");
//   //remove the li from ul
//   ul.parentNode.removeChild(li);
// }

// document.getElementById("ul").addEventListener("click", function(e) {
//   var tgt = e.target;
//   if (tgt.tagName == "li") {
//     tgt.parentNode.removeChild(tgt); // or tgt.remove();
//   }
// });












