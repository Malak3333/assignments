import { getHouses } from "./utils.js";

async function init() {
     try {
          const houses = await getHouses();
          console.log(houses);
     } catch (error) {
          console.error(error);
     }
}

init();

function renderHouses(houses) {
     const container = document.getElementById("houses");
     let html = "";

     houses.forEach(house => {
          html += ``
          <div>
               
     })
}