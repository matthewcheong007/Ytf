const prices = {
  "Dry Yong Tau Foo": 4.5,
  "Soup Yong Tau Foo": 5,
  "Laksa Yong Tau Foo": 5.5,
  "Tom Yum Yong Tau Foo": 5.5,
  Tofu: 0.8,
  "Stuffed Eggplant": 1.2,
  Vegetables: 0.5,
  "Bitter Gourd": 0.5,
  Fishball: 0.7
};

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll("[data-menu-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.menuFilter;
    document.querySelectorAll("[data-menu-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll("[data-category]").forEach((card) => {
      const isMatch = category === "all" || card.dataset.category === category;
      card.hidden = !isMatch;
    });
  });
});

const orderForm = document.querySelector("[data-order-form]");
if (orderForm) {
  const itemSelect = orderForm.querySelector("#food");
  const quantityInput = orderForm.querySelector("#quantity");
  const brothSelect = orderForm.querySelector("#broth");
  const totalOutput = document.querySelector("[data-total]");
  const itemOutput = document.querySelector("[data-summary-item]");
  const quantityOutput = document.querySelector("[data-summary-quantity]");
  const brothOutput = document.querySelector("[data-summary-broth]");
  const params = new URLSearchParams(window.location.search);
  const selectedItem = params.get("item");

  if (selectedItem && [...itemSelect.options].some((option) => option.value === selectedItem)) {
    itemSelect.value = selectedItem;
  }

  function updateSummary() {
    const item = itemSelect.value;
    const quantity = Math.max(1, Number(quantityInput.value || 1));
    const price = prices[item] || 0;
    const total = price * quantity;

    quantityInput.value = quantity;
    itemOutput.textContent = item;
    quantityOutput.textContent = String(quantity);
    brothOutput.textContent = brothSelect.value;
    totalOutput.textContent = `$${total.toFixed(2)}`;
  }

  orderForm.addEventListener("input", updateSummary);
  orderForm.addEventListener("change", updateSummary);
  updateSummary();
}

document.querySelectorAll("[data-friendly-form]").forEach((form) => {
  form.addEventListener("submit", () => {
    showToast("Thanks, your details are ready to be sent.");
  });
});
