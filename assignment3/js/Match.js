export class Match {
     #player1;
     #player2;
     #winner;
     #played;

     constructor(player1, player2) {
          this.#player1 = player1;
          this.#player2 = player2;
          this.#winner = null;
          this.#played = false;
          this.element = null;
     }
     
     createElement() {
          let div = document.createElement("div");     
          div.classList.add("match");

          let p1 = document.createElement("div");
          p1.textContent = this.#player1.name;

          let p2 = document.createElement("div");
          p2.textContent = this.#player2.name;

          div.appendChild(p1);
          div.appendChild(p2);

          this.element = div;
          return div;
     }

     compete() {
          if (this.#played) return;

          let skill1 = this.#player1.skillLevel || 4;
          let skill2 = this.#player2.skillLevel || 4;

          let total = skill1 + skill2;
          let random = Math.random() * total;

          if (random < skill1) {
               this.#winner = this.#player1;
          } else {
               this.#winner = this.#player2;
          }

          this.#played = true;

          if (this.element) {
               let children = this.element.children;

            for (let i = 0; i < children.length; i++) {
                    if (children[i].textContent.includes(this.#winner.name)) {
                         children[i].style.color = "green";
                         children[i].style.fontWeight = "bold";
                    } else {
                         children[i].style.opacity = "0.5";
                    }
               }
          }
     }

     get winner () {
          return this.#winner;
     }
     }
