/* JQuery calculator with flip button to write school kid messages*/

$(document).ready(function() {

  var answer = 0;
  //Store expression
  var exp = "";

  //Operator array and function to check if user input is an operator
  var operators = ["+", "-", "*", "/", "%", "="];

  function opCheck(input) {
    for (var i = 0; i < operators.length; i++) {
      if (input === operators[i]) {
        return true;
      }
    }

  }

  //Power On/Off Function
  var powerOn = false;

  function power() {
    if (powerOn === true) {
      $('.display').text("");
      $('.calc-display').text("");
      $('button').attr("disabled", true);
      $("button[data-key='ac']").removeAttr("disabled");
      exp = "";
      powerOn = false;
    } else if (powerOn === false) {
      $('.display').text("0");
      $('.calc-display').text("");
      $('button').removeAttr("disabled");
      exp = ""
      powerOn = true;
    }
  }

  //Clear function
  function clear() {
    $('.display').text("0");
    $('.calc-display').text("");
    exp = "";
  }

  // Check if input is valid based on previous selection
  function inputCheck() {
    var input = $(this).data("key");

    //Check power
    if (input === "ac") {
      return;
    }

    //Check clear
    if (input === "c") {
      clear();
      return;
    }

    //Check delete
    if (input === "ce") {
      exp = exp.substring(0, exp.length - 1);
      $('.calc-display').text(exp);
      $('.display').text("0");
      return;
    }

    //Check expression length 
    if (exp.length > 17) {
      exp = exp.substring(0, exp.length - 1);
    }

    //Prevent consecutive operators  
    if (opCheck(input)) {
      if (opCheck(exp[exp.length - 1])) {
        exp = exp.substring(0, exp.length - 1)
      }
    }

    //Add input to expression
    exp += input;

    //Check if first entry is decimal and prevent multiple decimal points
    if (exp[0] === ".") {
      exp = "0.";
    }
    if (input === ".") {
      if (exp.substring(0, exp.length - 1).includes(".")) {
        exp = exp.substring(0, exp.length - 1);
      }
    }

    //enable operators after a number
    if (opCheck(exp[0])) {
      clear();
    }

    //Check and perform percentage calculation
    if (input === "%") {
      exp = exp.substring(0, exp.length - 1)
      answer = eval(exp) / 100;
      $('.display').text(answer);
      $('.calc-display').text(exp);
      exp = "";
      return;
    }
    //Update displays

    $('.display').text(exp[exp.length - 1]);
    $('.calc-display').text(exp);

    //Return answer and reduce length if needed
    if (input === "=") {
      exp = exp.substring(0, exp.length - 1)
      answer = eval(exp);
      if (answer.toString().length > 10) {
        answer = answer.toString().substring(0, 10)
      }
      $('.display').text(answer);
      exp = "";
    }
  }

  function flip() {
    $(".calc").toggleClass('flip');
  }

  //Event handlers
  $(".flip-button").click(flip);
  $("button").click(inputCheck);
  $("button[data-key='ac']").click(power);
});