// --- Tarot Deck (loaded from JSON) ---
let deck = [];

// Load tarot.json dynamically
fetch("tarot.json")
  .then(response => response.json())
  .then(data => {
    deck = data;
    console.log("Tarot deck loaded:", deck.length, "cards");
  })
  .catch(err => console.error("Error loading tarot.json:", err));


// --- UI Elements ---
const singleBtn = document.getElementById("singleBtn");
const spreadBtn = document.getElementById("spreadBtn");
const singleCard = document.getElementById("singleCard");
const threeCard = document.getElementById("threeCard");
const drawOne = document.getElementById("drawOne");
const drawThree = document.getElementById("drawThree");


// --- Mode switching ---
singleBtn.onclick = () => {
  singleCard.classList.remove("hidden");
  threeCard.classList.add("hidden");
};

spreadBtn.onclick = () => {
  threeCard.classList.remove("hidden");
  singleCard.classList.add("hidden");
};


// --- Helpers ---
function drawRandomCard() {
  if (deck.length === 0) {
    console.warn("Deck not loaded yet!");
    return null;
  }

  const card = deck[Math.floor(Math.random() * deck.length)];
  const reversed = Math.random() < 0.5;
  return { ...card, reversed };
}

function createCardElement(card) {
  const wrapper = document.createElement("div");
  wrapper.className = "card";

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const back = document.createElement("div");
  back.className = "card-back";

  const front = document.createElement("div");
  front.className = "card-front";
  front.style.backgroundImage = `url(${card.img})`;

  wrapper.appendChild(inner);
  inner.appendChild(back);
  inner.appendChild(front);

  setTimeout(() => wrapper.classList.add("flipped"), 100);

  const meaning = document.createElement("p");
  meaning.innerHTML = `<strong>${card.name}</strong><br>
    ${card.reversed ? "(Reversed)" : "(Upright)"}<br><br>
    ${card.reversed ? card.reversed : card.upright}`;

  const container = document.createElement("div");
  container.appendChild(wrapper);
  container.appendChild(meaning);

  return container;
}


// --- Single Card Draw ---
drawOne.onclick = () => {
  const container = singleCard.querySelector(".card-container");
  container.innerHTML = "";

  const card = drawRandomCard();
  if (!card) return;

  container.appendChild(createCardElement(card));
};


// --- Three Card Spread ---
drawThree.onclick = () => {
  const slots = threeCard.querySelectorAll(".slot");

  slots.forEach(slot => {
    slot.innerHTML = `<h3>${slot.dataset.pos}</h3>`;
    const card = drawRandomCard();
    if (!card) return;

    slot.appendChild(createCardElement(card));
  });
};
