const tipChoice = document.getElementById("input-service");
const totalBill = document.getElementById("input-bill");
const totalSplit = document.getElementById("input-users");
const loader = document.querySelector(".loader");
const results = document.querySelector(".results");
const nestedHtml = results.querySelectorAll("span");
const feedback = document.querySelector(".feedback");


// Create three choice elements.
const goodTip = document.createElement("option");
goodTip.text = "Great  -20%";
goodTip.value = 1;

const okayTip = document.createElement("option");
okayTip.text = "Okay  -10%";
okayTip.value = 2;

const badTip = document.createElement("option");
badTip.text = "Bad  -5%";
badTip.value = 3;

// Add new choice options to the select element.
const newChoice = [goodTip, okayTip, badTip];
for (let i = 0; i < newChoice.length; i++) {
  tipChoice.appendChild(newChoice[i]);
}

const submitButton = document.querySelector(".submitBtn");

const calculateTip = (event) => {
  event.preventDefault();
  let billAmount = Number(totalBill.value);
  let billSplit = Number(totalSplit.value);
  let rating = Number(tipChoice.value);
  // Check if th no. of people who shared it is more than zero, else display an alert.
  if (billSplit > 0) {
    let tip;
    switch (true) {
      case (rating === 1):
        tip = billAmount * 0.20;
        break;
      case (rating === 2):
        tip = billAmount * 0.10;
        break;
      case (rating === 3):
        tip = billAmount * 0.05;
        break;
      default:
        console.log(`The rating is ${rating}`);
    };
    let newTotal = tip + billAmount;
    let personalBill = newTotal / billSplit;
    results.children[2].style.display = "block";
    //  Get the "$" elements nested in the divs and set them to the values of the operations.
    nestedHtml[0].innerHTML = `: $${(tip).toFixed(2)}`;
    nestedHtml[2].innerHTML = `: $${newTotal.toFixed(2)}`;
    nestedHtml[4].innerHTML = `: $${personalBill.toFixed(2)}`;
    // check if the number of people who split the bill is 1 and hide the redundant (Each person owes statement)
    if (billSplit == 1) {
      results.children[2].style.display = "none";
    };
    // Load the gif by setting it's display to block and after at least five seconds, make it none.
    //  Nest anothet timeout function that shows the results by setting it's display to block.
    //  Inside the nested tieout, set the results display to none to hide it and also reset the input values.
    setTimeout(() => {
      loader.style.display = "none";
      setTimeout(() => {
        results.style.display = "none";
        totalBill.value = "";
        totalSplit.value = "";
        tipChoice.value = 0;
      }, 2000);
      results.style.display = "block";
    }, 2000);
    loader.style.display = "block";
    // feedback text-center alert text-capitalize p-1 showItem alert-danger
  } else {
    feedback.innerHTML = "Number of people who shared the bill must be more one or more."
    setTimeout(() => {
      feedback.style.display = "none";
      feedback.classList.remove("showItem", "alert-danger");
    }, 5000);
    feedback.style.display = "block";
    feedback.classList.add("showItem", "alert-danger");
  };

};

// Wire up the submit button
submitButton.addEventListener("click", calculateTip);
