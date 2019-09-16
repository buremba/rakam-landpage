var teams = [
  {
    name: "Product",
    cards: [
      { title: "Test new features", description: "Ship new features and track the retention rate to see if your users are happy about the feature you shipped.", img: "team-card.svg" },
      { title: "Find your North Star Metric", description: "Define and Track your North Star metric to unite your team under single metric.", img: "team-card.svg" },
      { title: "Segment your users", description: "Create user segments and compare the segments in order to understand user persona", img: "team-card.svg" }
    ],
    dashboardId: 11607
  },
  {
    name: "Data",
    cards: [
      { title: "Test new features", description: "Ship new features and track the retention rate to see if your users are happy about the feature you shipped.", img: "team-card.svg" },
      { title: "Find your North Star Metric", description: "Define and Track your North Star metric to unite your team under single metric.", img: "team-card.svg" },
      { title: "Segment your users", description: "Create user segments and compare the segments in order to understand user persona", img: "team-card.svg" }
    ],
    dashboardId: 11607
  },
  {
    name: "Marketing",
    cards: [
      { title: "Easy way to analyze user behavior", description: "Easily analyze user behavior with funnel and retention", img: "team-card.svg" },
      { title: "Optimize your marketing campaigns", description: "Segment your users to create a better target audience for your marketing campaigns", img: "team-card.svg" },
      { title: "Be on the same page with everyone", description: "Define KPI’s and share with your team and help them to focus on the right metrics", img: "team-card.svg" }
    ],
    dashboardId: 11607
  },
  {
    name: "Business",
    cards: [
      { title: "All your organizational KPIs in a consolidated dashboard", description: "Your teams can create dashboards for their KPIs and share them with you so that you can track their metrics easily", img: "team-card.svg" },
      { title: "Empower your Product People", description: "Your product people can analyze how your users use your products and optimize UI & UX which leads to happy customers", img: "team-card.svg" },
      { title: "Empower your Marketing People", description: "Your marketing people can analyze & compare the marketing channels by analyzing the users acquired through these channels", img: "team-card.svg" }
    ],
    dashboardId: 11607
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
  document.querySelector(".selected-team").style.display = "inline-block";

  selectedTeam = teams[index].dashboardId;

  var cards = `
    <h2><strong>${teams[index].name}</strong> people love rakam</h2>
    <div class="team-card">
      <h4>${teams[index].cards[0].title}</h4>
      <p>${teams[index].cards[0].description}</p>
      <img draggable="false" src="images/onboarding/${
        teams[index].cards[0].img
      }" alt="${teams[index].cards[0].name}"/>
    </div>
    <div class="team-card">
      <h4>${teams[index].cards[1].title}</h4>
      <p>${teams[index].cards[1].description}</p>
      <img draggable="false" src="images/onboarding/${
        teams[index].cards[1].img
      }" alt="${teams[index].cards[1].name}"/>
    </div>
    <div class="team-card">
      <h4>${teams[index].cards[2].title}</h4>
      <p>${teams[index].cards[2].description}</p>
      <img draggable="false" src="images/onboarding/${
        teams[index].cards[2].img
      }" alt="${teams[index].cards[2].name}"/>
    </div>
  `;

  document.querySelector(".team-cards").insertAdjacentHTML("afterbegin", cards);
}

function closeSelectedTeam() {
  selectedTeam = "";
  document.querySelector(".selected-team").style.display = "none";
  document.querySelector(".team-cards").innerHTML = "";
}
