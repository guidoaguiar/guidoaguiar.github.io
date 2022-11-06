const ratingContainer = document.querySelector(".rating");
const thanksContainer = document.querySelector(".thanks");
const submitButton = document.querySelector(".submit-button");
const rating = document.querySelectorAll(".rating-button");
const result = document.getElementById("rating-result");

submitButton.addEventListener("click", () => {
  thanksContainer.classList.remove("hidden");
  ratingContainer.style.display = "none";
});

rating.forEach((rate) => {
  rate.addEventListener("click", () => {
    result.innerHTML = rate.innerHTML;
  });
});