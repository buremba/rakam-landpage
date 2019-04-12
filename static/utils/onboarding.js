var teams = [
  {
    name: "product",
    title: "Product Managers",
    cards: [
      { title: "Title 1", description: "Description 1", img: "team-card.svg" },
      { title: "Title 2", description: "Description 2", img: "team-card.svg" },
      { title: "Title 3", description: "Description 3", img: "team-card.svg" }
    ]
  },
  {
    name: "engineering",
    title: "Engineers",
    cards: [
      { title: "Title 1", description: "Description 1", img: "team-card.svg" },
      { title: "Title 2", description: "Description 2", img: "team-card.svg" },
      { title: "Title 3", description: "Description 3", img: "team-card.svg" }
    ]
  },
  {
    name: "design",
    title: "Designers",
    cards: [
      { title: "Title 1", description: "Description 1", img: "team-card.svg" },
      { title: "Title 2", description: "Description 2", img: "team-card.svg" },
      { title: "Title 3", description: "Description 3", img: "team-card.svg" }
    ]
  }
];

var selectedTeam = "";

function showOnboarding() {
  document.querySelector(".onboarding").style.display = "inline-block";

  for (var i = 0; i < teams.length; i++) {
    var teamButton = document.createElement("button");
    teamButton.setAttribute("class", "team-button button--wayra");
    teamButton.innerHTML = teams[i].name;
    teamButton.addEventListener("click", selectTeam.bind(this, i), false);
    document.getElementsByClassName("select-team")[0].appendChild(teamButton);
  }
}

function selectTeam(index) {
  document.querySelector(".selected-team").style.display = "block";

  selectedTeam = teams[index].name;

  var cards = `
    <h2><strong>${teams[index].title}</strong> love rakam</h2>
    <div class="team-card">
      <h4>${teams[index].cards[0].title}</h4>
      <p>${teams[index].cards[0].description}</p>
      <img draggable="false" src="images/onboarding/${
        teams[index].cards[0].img
      }" alt="${teams[index].cards[0].title}"/>
    </div>
    <div class="team-card">
      <h4>${teams[index].cards[1].title}</h4>
      <p>${teams[index].cards[1].description}</p>
      <img draggable="false" src="images/onboarding/${
        teams[index].cards[1].img
      }" alt="${teams[index].cards[1].title}"/>
    </div>
    <div class="team-card">
      <h4>${teams[index].cards[2].title}</h4>
      <p>${teams[index].cards[2].description}</p>
      <img draggable="false" src="images/onboarding/${
        teams[index].cards[2].img
      }" alt="${teams[index].cards[2].title}"/>
    </div>
  `;

  document.querySelector(".team-cards").insertAdjacentHTML("afterbegin", cards);
}

function closeSelectedTeam() {
  selectedTeam = "";
  document.querySelector(".selected-team").style.display = "none";
  document.querySelector(".team-cards").innerHTML = "";
}
