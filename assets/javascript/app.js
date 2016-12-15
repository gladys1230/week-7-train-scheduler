/*-- Kit Chan
Coding Bootcamp UT-Austin
Oct 2016
Assignment week-7 Train Scheduler
*/
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDF3pNy_y01yW2ojejTUUBsYzudmAzJl5E",
    authDomain: "whateveryouwant-e07da.firebaseapp.com",
    databaseURL: "https://whateveryouwant-e07da.firebaseio.com",
    storageBucket: "whateveryouwant-e07da.appspot.com",
    messagingSenderId: "775885227944"
  };
  firebase.initializeApp(config);

  //list of variables
  var database = firebase.database();
  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;

  //submit button is clicked
  $("#submit").on("click", function(event){
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });
  });


database.ref().on("child_added", function(snap){

  var trainTime = snap.val().firstTrainTime;
  var convertedTime = moment(trainTime, "HH:mm");
  //console.log("converted =" + convertedTime.format("HH:mm"));
  var minutesAway = (moment().add(convertedTime, "minutes"));
  var timeRemaining = (minutesAway % snap.val().frequency);
  var nextTrain = moment().add(timeRemaining, "m").format("HH:mm");
   //append the data entered
  var newRow =$("<tr>");
  newRow.append($("<td>" + snap.val().trainName + "</td>"));
  newRow.append($("<td>" + snap.val().destination + "</td>"));
  newRow.append($("<td>" + snap.val().frequency + "</td>"));
  newRow.append($("<td>" + nextTrain + "</td>"));
  newRow.append($("<td>" + timeRemaining + "</td>"));


$("tbody").append(newRow);

});
 

