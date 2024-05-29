//array of objects in the code  
let goods = [
  {
    image:
      "https://images.unsplash.com/photo-1613061527119-56ad37b8a581?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFza2V0fGVufDB8fDB8fHww",
    nameOfProduct: "Basket",
    price: 100,
    isClicked: false,
    quantity: 0,
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664302318670-29dee41e85e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c29ja3N8ZW58MHx8MHx8fDA%3D",
    nameOfProduct: "Socks",
    price: 20,
    isClicked: false,
    quantity: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    nameOfProduct: "Bag",
    price: 50,
    isClicked: false,
    quantity: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNha2V8ZW58MHx8MHx8fDA%3D",
    nameOfProduct: "Cake",
    price: 500,
    isClicked: false,
    quantity: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1627140290942-7c8f9f56e870?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtYm9yZ2hpbmklMjB1cnVzfGVufDB8fDB8fHww",
    nameOfProduct: "Lamborghini",
    price: 250000,
    isClicked: false,
    quantity: 0,
  },
];
//getting the product cards and total price element 
const cardContainer = document.getElementById("list-products");
const totalBody = document.querySelector(".total");
let sum = 0;

//function to update the total price
const updatePrice = () => {
  sum = goods.reduce((total, good) => total + good.price * good.quantity, 0);
  totalBody.textContent = sum;
};

//function for plus icon
const add = (good) => {
  good.quantity++;
  updatePrice();
  updateUi();
};

//function for minus icon
const remove = (index) => {
  goods.splice(index, 1);
  updatePrice();
  updateUi();
};

//function to change star color to gold 
const toggleStarColor = (index) => {
  const starIcon = document.getElementById(`star-icon-${index}`);
  starIcon.addEventListener("click", () => {
    goods[index].isClicked = !goods[index].isClicked;
    starIcon.style.color = goods[index].isClicked ? 'gold' : 'black';
    updateUi();
  });
};


//function to update UI
const updateUi = () => {
  cardContainer.innerHTML = "";



  // Creating and appending product cards for each product in the goods array

  goods.forEach((good, index) => {
    const cardBody = document.createElement("div");

    //importing the html for product card
    cardBody.innerHTML = `
      <div class="card-body">
        <div class="card" style="width: 18rem">
          <img src=${good.image} class="card-img-top" alt="${good.nameOfProduct}" />
          <div class="card-body">
            <h5 class="card-title">${good.nameOfProduct}</h5>
            <p class="card-text">This is a ${good.nameOfProduct}</p>
            <h4 class="unit-price">${good.price} $</h4>
            <div class="display">
              <i id="plus-${index}" class="fas fa-plus-circle"></i>
              <span class="quantity">${good.quantity}</span>
              <i id="minus-${index}" class="fas fa-minus-circle"></i>
            </div>
            <div>
              <ion-icon name="star-outline" id="star-icon-${index}" style="color: ${good.isClicked ? 'gold' : 'black'}"></ion-icon>
              <i class="fas fa-trash-alt" id="trash-icon-${index}"></i>
              <i class="fas fa-heart" id="heart-icon-${index}" style="color: ${good.isLiked ? 'red' : 'black'}"></i>
            </div>
            <div>
            <button class="addtocart" id="submit-${index}">Submit Request</button>
            <div>
          </div>
        </div>
      </div>
    `;

     // Appending the product card to the container
    cardContainer.appendChild(cardBody);


    // Adding event listeners for the plus, minus, trash, heart, and submit buttons
    document.getElementById(`plus-${index}`).addEventListener("click", () => {
      add(good);
    });

    document.getElementById(`minus-${index}`).addEventListener("click", () => {
      if (good.quantity > 0) good.quantity--;
      updatePrice();
      updateUi();
    });

    document.getElementById(`trash-icon-${index}`).addEventListener("click", () => {
      remove(index);
    });

    document.getElementById(`heart-icon-${index}`).addEventListener("click", () => {
      good.isLiked = !good.isLiked;
      updateUi();
    });

    // Add the star color toggle event listener
    toggleStarColor(index);
    // Add event listener for the Submit Request button
    document.getElementById(`submit-${index}`).addEventListener("click", () => {
      alert('Thank you for your request');
    });
  });
};

// Initial UI update
updateUi();
