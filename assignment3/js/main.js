import { Match } from "./Match.js";

let currentMatches = [];
let tournamentDiv = document.getElementById("tournament");

let playBtn = document.getElementById("play-round");
let restartBtn = document.getElementById("restart");
let tournamentFinished = false;

async function loadContestants() {
     let response = await fetch("./contestants.json");
     let contestants = await response.json();
     console.log("Deltagare:", contestants);

     createQuarterFinals(contestants);
}

loadContestants();

function createQuarterFinals(contestants) {
     let matches = [];

     let roundDiv = document.createElement("div");
     roundDiv.classList.add("round");

     let h2 = document.createElement("h2");
     h2.textContent = "Kvartsfinal";
     roundDiv.appendChild(h2);

     tournamentDiv.appendChild(roundDiv);

     for (let i = 0; i < contestants.length; i += 2) {
          let match = new Match(contestants[i], contestants[i + 1]);

          let matchElement = match.createElement();
          roundDiv.appendChild(matchElement);

          match.compete();
          matches.push(match);

     }
     currentMatches = matches;
     
}

function createNextRound(prevMatches) {
     let winners = [];
     let roundName = "";

     if (prevMatches.length === 4) roundName = "Semifinal";
     else if (prevMatches.length === 2) roundName = "Final";

     for (let i = 0; i < prevMatches.length; i++) {
          winners.push(prevMatches[i].winner);
     }

     if (winners.length < 2) return;

     let roundDiv = document.createElement("div");
     roundDiv.classList.add("round");

     let h2 = document.createElement("h2");
     h2.textContent = roundName;
     roundDiv.appendChild(h2);
     tournamentDiv.appendChild(roundDiv);

     let matches = [];

     for (let i = 0; i < winners.length; i += 2) {
          let match = new Match(winners[i], winners[i + 1]);
          let matchElement = match.createElement();
          roundDiv.appendChild(matchElement);

          match.compete();
          matches.push(match);
     }

     if (winners.length > 1) {
          let nextRoundName = "";
          
          if (winners.length === 4) nextRoundName = "Semifinal";
          else if (winners.length === 2) nextRoundName = "Final";
          
          return matches; 
     }
}

restartBtn.addEventListener("click", function () {
     tournamentDiv.innerHTML = "";
     tournamentFinished = false;
     loadContestants();
});

playBtn.addEventListener("click", function () {
     if (tournamentFinished) return;
    
     let next = createNextRound(currentMatches);
     currentMatches = next;

     if (!next) {
          tournamentFinished = true;
     }

});