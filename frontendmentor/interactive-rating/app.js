const ratingContainer = document.querySelector(".rating");
const thanksContainer = document.querySelector(".thanks");
const submitButton = document.querySelector(".submit-button");
const rating = document.querySelectorAll(".rating-button");
const result = document.getElementById("rating-result");
var ratingFocusList = []
ratingFocusList.push(rating)

// check for focus
submitButton.addEventListener("click", () => {
  if (result.innerHTML != 0) {
    var activeElement = document.activeElement;
    var myElement = []
    myElement.push(activeElement)
    console.log(myElement)
    console.log(activeElement)
    if (myElement.includes("rating-button")){
      thanksContainer.classList.remove("hidden");
      ratingContainer.style.display = "none";
    }
  }
  else {
    alert ("Please select one option!")
  }
});
var pets = []
pets.push(rating)
rating.forEach((rate) => {
  rate.addEventListener("click", () => {
    result.innerHTML = rate.innerHTML;
    console.log(document.activeElement)
    console.log(document.querySelectorAll(".rating-button"))
    console.log(pets.includes('at'));
    });
});