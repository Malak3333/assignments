import { Match } from "./Match.js";

let currentMatches = [];
let currentMatchIndex = 0;
let tournamentFinished = false;


let tournamentDiv = document.getElementById("tournament");
let playBtn = document.getElementById("play-round");
let restartBtn = document.getElementById("restart");

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
          
          roundDiv.appendChild(match.createElement());
          matches.push(match);

     }
     currentMatches = matches;
     currentMatchIndex = 0;
}

function createNextRound(prevMatches) {
     let winners = prevMatches.map(m => m.winner).filter(Boolean);
     if (winners.length < 2) return null;

     let roundDiv = document.createElement("div");
     roundDiv.classList.add("round");

     let h2 = document.createElement("h2");
     h2.textContent = winners.length === 4 ? "Semifinal" : "Final";

     roundDiv.appendChild(h2);
     tournamentDiv.appendChild(roundDiv);

     let matches = [];

     for (let i = 0; i < winners.length; i += 2) {
          let match = new Match(winners[i], winners[i + 1]);
          let matchElement = match.createElement();
          
          roundDiv.appendChild(match.createElement());
          matches.push(match);
     }

     return matches;
}

playBtn.addEventListener("click", function () {
     if (tournamentFinished) return;

     let match = currentMatches[currentMatchIndex];
     if (!match) return;

     match.compete();
     currentMatchIndex++;

     if (currentMatchIndex >= currentMatches.length) {
          let next = createNextRound(currentMatches);

          if (!next) {
               tournamentFinished = true;
               return;
          }
          
          currentMatches = next;
          currentMatchIndex = 0;
     }

});

restartBtn.addEventListener("click", function () {
     tournamentDiv.innerHTML = "";
     tournamentFinished = false;
     loadContestants();

});
