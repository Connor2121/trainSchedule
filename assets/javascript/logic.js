
var config = {
    apiKey: "AIzaSyD1Jykzcajy6YOv1t3VjLqDT5AtfG8zB44",
    authDomain: "train-schedule-467ff.firebaseapp.com",
    databaseURL: "https://train-schedule-467ff.firebaseio.com",
    projectId: "train-schedule-467ff",
    storageBucket: "train-schedule-467ff.appspot.com",
    messagingSenderId: "596797230401"
  };
  firebase.initializeApp(config);
  var trainDatabase = firebase.database();

    // event for capturing values of new train input upon clicking submit button
  $('.btn-primary').on('click', function(event) {
      event.preventDefault();
      var trainName = $('#trainName').val();
      var destination = $('#destination').val();
      var firstTrain = $('#nextArrival').val();
      var frequency = $('#frequency').val();
      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);

      
      // push vars to firebase  
      trainDatabase.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });

      // reset input fields after submission
      $('#trainName').val('');
      $('#destination').val('');
      $('#nextArrival').val('');
      $('#frequency').val('');
  });

  // event for adding train to the datbase
  trainDatabase.ref().on('child_added', function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());

    // captures values that are added to database
      var trainName = childSnapshot.val().trainName;
      var destination = childSnapshot.val().destination;
      var firstTrain = childSnapshot.val().firstTrain;
      var frequency = childSnapshot.val().frequency; 
      // converts first train input into readable military time
      var firstTrainConverted = moment(firstTrain, "hhmm");
      // subtracts current time from the first train military time input
      var diff = moment().diff(moment(firstTrainConverted), "minutes");
      // gives remainder from how many time frequency goes in diff
      var timeRemainder = diff % frequency;
      var minutesAway = frequency - timeRemainder;
      var nextArrival = moment().add(minutesAway, "minutes").format('hh:mm');
     
      

     // appends new train input to the table

      $('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' +
    frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

  });

