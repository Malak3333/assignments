import { fetchHouses, getScareLevelText, getScareLevelCLass, formatPrice } from './utils.js';
import { Booking } from './booking.js';

let currentHouse = null;
let currentBooking = null;

document.addEventListener('DOMContentLoaded', async () => {
     const urlParams = new URLSearchParams(window.location.search);
     const houseId = urlParams.get('id');

     if (!houseId) {
          showError("Huset hittades inte. Gå tillbaka till startsidan.");
          return;
     }
     
     try {
          const response = await fetchHouses('houses.json');
          const houses = await response.json();
          currentHouse = houses.find(h => h.id.toString() === houseId.toString());

          if (!currentHouse) {
               showError("Huset hittades inte.");
          }
     } catch (error) {
          showError("Ett fel inträffade. Försök igen senare.");
     }
});

function renderHouseDetails(house) {
     const container = document.getElementById('house-details');
     const scareText = getScareLevelText(house.scareLevel);
     const scareClass = getScareLevelCLass(house.scareLevel);

     container.innerHTML = `
     <div class="house-detail-card">
      <img src="images/${house.image}" alt="${house.name}" class="detail-image">
      <div class="detail-info">
        <h1>${house.name}</h1>
        <p class="location"><strong>Plats:</strong> ${house.location}</p>
        <p class="price"><strong>Pris:</strong> ${formatPrice(house.pricePerNight)}/natt</p>
        <p class="${scareClass}"><strong>Skräcknivå:</strong> ${scareText}</p>
        <p><strong>Max antal gäster:</strong> ${house.maxGuests}</p>
        <p><strong>WiFi:</strong> ${house.hasWifi ? 'Ja' : 'Nej'}</p>
        
        <h3>Spöktyper i huset:</h3>
        <ul>
          ${house.ghostTypes.map(type => `<li>👻 ${type}</li>`).join('')}
        </ul>
        
        <p class="description">${house.description || 'Ett fantastiskt hemsökt boende med rik spökhistoria.'}</p>
      </div>
    </div>
  `;
}

