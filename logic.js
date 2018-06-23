var config = {
  apiKey: "AIzaSyCOq_uKuz54ZK2pDTPte0jrSutG-Faobpw",
  authDomain: "timesheet-79afb.firebaseapp.com",
  databaseURL: "https://timesheet-79afb.firebaseio.com",
  projectId: "timesheet-79afb",
  storageBucket: "timesheet-79afb.appspot.com",
  messagingSenderId: "981970627302"
};
firebase.initializeApp(config)
var database = firebase.database()

$(".btn").on("click", function (event) {
  event.preventDefault()
  var name = $("#name").val().trim()
  var role = $("#role").val().trim()
  var date = moment($("#startDate").val().trim(), "MM/DD/YY").format("X")
  var rate = $("#rate").val().trim()
  database.ref().push({
    name: name,
    role: role,
    date: date,
    rate: rate
  })
  alert("Employee successfully added")
})

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val())
  var fbname = (childSnapshot.val().name)
  var fbrole = (childSnapshot.val().role)
  var fbdate = (childSnapshot.val().date)
  var fbrate = (childSnapshot.val().rate)

  var datePretty = moment.unix(fbdate).format("MM/DD/YY")
  var timeElapsed = moment().diff(moment(fbdate, "X"), "months")
  console.log(timeElapsed)
  var pay = timeElapsed * fbrate
  console.log(pay)

  $("tbody").append("<tr><td>" + fbname + "</td><td>" + fbrole + "</td><td>" + datePretty + "</td><td>" + timeElapsed + "</td><td>" + fbrate + "</td><td>" + pay + "</td></tr>")

}, function (error) {
  console.log(error.code)
})

