document.addEventListener("DOMContentLoaded", function () {
    const foodItems = [
      { id: 1, name: "Burger", category: "Fast Food", price: 5.99 },
      { id: 2, name: "Pizza", category: "Italian", price: 8.99 },
      { id: 3, name: "Sushi", category: "Japanese", price: 12.99 },
      // Add more items here
    ];
  
    const categories = ["All", "Fast Food", "Italian", "Japanese"];
  
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const categorySelect = document.getElementById("categorySelect");
    const itemsContainer = document.getElementById("itemsContainer");
    const cartItems = document.getElementById("cartItems");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const paymentForm = document.getElementById("paymentForm");
    const paymentSuccessMsg = document.getElementById("paymentSuccessMsg");
  
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      console.log("Registered:", username);
      // Add logic for user registration (e.g., send to backend)
    });
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;
      console.log("Logged in:", username);
      // Add logic for user login (e.g., check credentials with backend)
    });
  
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.toLowerCase();
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  
    function displayItems(selectedCategory) {
      itemsContainer.innerHTML = "";
      const filteredItems = selectedCategory === "all"
        ? foodItems
        : foodItems.filter(item => item.category.toLowerCase() === selectedCategory);
  
      filteredItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "food-item";
        itemDiv.innerHTML = `
          <h3>${item.name}</h3>
          <p>Category: ${item.category}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;
        itemsContainer.appendChild(itemDiv);
      });
  
      document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
          const itemId = parseInt(this.getAttribute("data-id"), 10);
          const selectedItem = foodItems.find(item => item.id === itemId);
          addToCart(selectedItem);
        });
      });
    }
  
    function addToCart(item) {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
      `;
      cartItems.appendChild(cartItem);
    }
  
    categorySelect.addEventListener("change", function () {
      const selectedCategory = categorySelect.value.toLowerCase();
      displayItems(selectedCategory);
    });
  
    checkoutBtn.addEventListener("click", function () {
      paymentForm.style.display = "block";
    });
  
    paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Simulate payment success (in a real app, integrate with a payment gateway)
      paymentSuccessMsg.style.display = "block";
      setTimeout(() => {
        resetApp();
      }, 3000);
    });
  
    function resetApp() {
      paymentForm.style.display = "none";
      paymentSuccessMsg.style.display = "none";
      cartItems.innerHTML = "";
      displayItems("all");
    }
  
    displayItems("all");
  });
  