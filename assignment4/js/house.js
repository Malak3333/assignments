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

function setupBookingEvents() {
     const checkInInput = document.getElementById('check-in');
     const checkOutInput = document.getElementById('check-out');
     const guestsInput = document.getElementById('guests');
     const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
     const form = document.getElemenrById('booking-form');

     guestsInput.max = currentHouse.maxGuests;

     function updateBookingState() {
          currentBooking.checkIn = checkInInput.value;
          currentBooking.checkOut = checkOutInput.value;
          currentBooking.guests = Number(guestsInput.value);

          const selectedExtras = [];
          extrasCheckboxes.forEach(cb => {
               if (cb.checked) {
                    selectedExtras.push(cb.value);
               }
          });
          currentBooking.extras = selectedExtras;

          document.getElementById('summary-nights').textContent = currentBooking.getNights();
          document.getElementById('summary-base-price').textContent = formatPrice(currentBooking.getBasePrice());
          document.getElementById('summary-extras-price').textContent = formatPrice(currentBooking.getExtras().join(', '));
          document.getElementById('summary-total-price').textContent = formatPrice(currentBooking.getTotalPrice());

          const bookBtn = document.getElementById('book-btn');
          bookBtn.disabled = !currentBooking.isValid();
     }

     checkInInput.addEventListener('change', updateBookingState);
     checkOutInput.addEventListener('change', updateBookingState);
     guestsInput.addEventListener('change', updateBookingState);
     extrasCheckboxes.forEach(cb => {
          cb.addEventListener('change', updateBookingState);

     form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (currentBooking.isValid()) {
               const confirmation = document.getElementById('booking-confirmation');
               confirmation.innerHTML = `
               <div class="success-box">
               Tack för din bokning av ${currentHouse.name}!<br>
               Totalt pris: ${formatPrice(currentBooking.getTotalPrice())} för ${currentBooking.getNights()} nätter.
               </div>
               `;
               form.reset();
               updateBookingState();
          }
          });
     });
}

function showError(message) {
     const detailsDiv = document.getElementById('house-details');
     const bookingSection = document.getElementById('booking-section');

     if (bookingSection) {
          bookingSection.remove();
     }

     if (detailsDiv) {
          detailsDiv.innerHTML = `
          <div class="error-box">
          <h2>Ett fel uppstod</h2>
          <p>${message}</p>
          <a href="index.html" class="btn">Tillbaka till startsidan</a>
          </div>
          `;
     }
}
