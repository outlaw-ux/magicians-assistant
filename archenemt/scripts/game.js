const actionButton = document.getElementById("action-button");

const Cards = {
  shuffle: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  },

  image: (card) => {
    const cardArtSource =
      card.image_uris?.border_crop || card.image_uris?.large;
    const artImage = new Image();
    artImage.loading = "eager";
    artImage.src = cardArtSource;
    artImage.onload = () => {
      actionButton.disabled = false;
    };

    return artImage;
  },

  title: (card) => {
    const header = document.createElement("h2");
    const content = document.createTextNode(card.name);
    header.appendChild(content);

    return header;
  },

  description: (card) => {
    const paragraph = document.createElement("p");
    const content = document.createTextNode(card.oracle_text);
    paragraph.appendChild(content);

    return paragraph;
  },

  deal: (cards, index) => {
    const currentCard = cards[index];
    const root = document.getElementById("root");
    root.innerHTML = "";

    root.appendChild(Cards.title(currentCard));
    root.appendChild(Cards.description(currentCard));
    root.appendChild(Cards.image(currentCard));

    return currentCard;
  },
};

function startGame(schemeCards) {
  const onGoing = [];
  let currentCardIndex = 0;
  const shuffledCards = Cards.shuffle(schemeCards.data);
  const currentScheme = Cards.deal(shuffledCards, currentCardIndex);

  if (currentScheme.type_line.includes("Ongoing")) {
    onGoing = [...onGoing, currentScheme];
  }

  actionButton.onclick = () => {
    actionButton.disabled = true;
    currentCardIndex += 1;
    Cards.deal(shuffledCards, currentCardIndex);
  };
}

function requestListener() {
  const parsedData = JSON.parse(this.responseText);

  actionButton.textContent = "Start Game";
  actionButton.disabled = false;
  actionButton.onclick = () => {
    actionButton.disabled = true;
    actionButton.textContent = "Draw Next Scheme";
    startGame(parsedData);
  };
}

window.onload = (event) => {
  // API Documentation https://scryfall.com/docs/api/cards/search
  const apiParameters = JSON.stringify({ q: "t:scheme" });
  const apiRoute = "https://api.scryfall.com/cards/search?q=t:scheme";
  const request = new XMLHttpRequest();

  request.addEventListener("load", requestListener);
  request.open("GET", apiRoute);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");

  request.send(apiParameters);
};
