export class Match {
     constructor(player1, player2) {
          this.player1 = player1;
          this.player2 = player2;
          this.winner = null;
          this.played = false;
          this.element = null;
     }

createElement() {
     let div = document.createElement("div");
     div.classList.add("match");

     let p1 = document.createElement("div");
     if (this.player1.skillLevel != null) {
          p1.textContent = this.player1.name + " (Skill: " + this.player1.skillLevel + ")";
     } else {
          p1.textContent = this.player1.name + " (Skill: ??)";
     }

     let p2 = document.createElement("div");
     if (this.player2.skillLevel != null) {
          p2.textContent = this.player2.name + " (Skill: " + this.player2.skillLevel + ")";
     } else {
          p2.textContent = this.player2.name + " (Skill: ??)";
     }

     div.appendChild(p1);
     div.appendChild(p2);

     this.element = div;
     return div;
}

compete() {
     if (this.played) return;
     let skill1 = this.player1.skillLevel;
     if (skill1 == null) skill1 = 4;

     let skill2 = this.player2.skillLevel;
     if (skill2 == null) skill2 = 4;

     let total = skill1 + skill2;
     let rand = Math.random() * total;

     if (rand < skill1) {
          this.winner = this.player1;
     } else {
          this.winner = this.player2;
     }

     this.played = true;

     if (this.element != null) {
          let children = this.element.children;
          for (let i = 0; i < children.length; i++) {
               if (children[i].textContent.indexOf(this.winner.name) !== -1) {
                    children[i].style.fontWeight = "bold";
                    children[i].style.color = "green";
               } else {
                    children[i].style.opacity = "0.5";
               }
          }
     }
}
}
