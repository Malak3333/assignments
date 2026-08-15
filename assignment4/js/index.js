import {
     fetchHouses,
     getScareLevelText,
     getScareLevelClass,
     formatPrice,
     getAllGhostTypes 
} from './utils.js';

let allaHus = [];
let filtreradeHus = [];

document.addEventListener('DOMContentLoaded', function() {
     hämtaHus();
     sättUppFilter();
});

function hämtaHus() {
     fetchHouses(`houses.json`)
     .then(response => response.json())
     .then(hus => {
          allaHus = hus;
          filtreradeHus = hus;
          visaHus(hus);
          fyllSpöktyper(hus);
     })
     .catch(fel => {
          visaFel("Kunde inte ladda spökhus");
     });
}

function skapaHusKort(hus){
     const skräckText = getScareLevelText(hus.scareLevel);
     const skräckKlass = getScareLevelClass(hus.scareLevel);

     return `
          <div class="house-card">
               <h2>${hus.name}</h2>
               <p><strong>Plats:</strong> ${hus.location}</p>
               <p><strong>Price:</strong> ${formatPrice(hus.price)}</p>
               <p class="${skräckKlass}"><strong>Skräcknivå:</strong> ${skräckText}</p>
               <a href="house.html?id=${hus.id}" class="btn">Läs mer</a>
          </div>
     `;

}

function visaHus(husLista) {
    const grid = document.getElementById('houses-grid');
    const ingenResultat = document.getElementById('no-results');

    if (husLista.length === 0) {
     grid.innerHTML = '';
     ingenResultat.style.display = 'block';
    } else {
     grid.innerHTML = husLista.map(hus => skapaHusKort(hus)).join(''); 
     ingenResultat.style.display = 'none';
    }
}

function fyllSpökTyper(hus) {
     const allaTyper = [];

     hus.forEach(h => {
          h.ghostTypes.forEach(typ => {
               if (!allaTyper.includes(typ)) {
                    allaTyper.push(typ);
               }
          });
     });
};

const select = document.getElementById('ghost-type');
let html = '<option value="">Alla typer</option>';
allaTyper.forEach(typ => {
     html += `<option value="${typ}">${typ}</option>`;

 });

select.innerHTML = html;


function sättUppFilter() {

document.getElementById('max-price').addEventListener('input', filtrera);
document.getElementById('min-scare').addEventListener('input', filtrera);

document.getElementById('ghost-type').addEventListener('change', filtrera);

 document.getElementById('wifi').addEventListener('change', filtrera);
  

document.getElementById('max-price').addEventListener('input', visaPris);
document.getElementById('min-scare').addEventListener('input', visaSkräck);

}

function filtrera() {
     let resultat = [...allaHus];

     const maxPris = Number(document.getElementById('max-price').value);
     resultat = resultat.filter(hus => hus.pricePerNight <= maxPris);

     const minSkräck = Number(document.getElementById('min-scare').value);
     resultat = resultat.filter(hus => hus.scareLevel >= minSkräck);

     const spökTyp = document.getElementById('ghost-type').value;
     if (spökTyp) {
          resultat = resultat.filter(hus => {
               return hus.ghostTypes.includes(spökTyp);
          });
     };
};

const villHaWifi = document.getElementById('wifi').checked;
if (villHaWifi) {
     resultat = resultat.filter(hus => hus.hasWifi);
}

filtreradeHus = resultat;
visaHus(resultat);

function visaPris() {
     const värde = document.getElementById('max-price').value;
     document.getElementById('max-price-value').textContent = Number(värde).toLocaleString() + 'kr';

}

function visaSkräck() {
const värde = document.getElementById('min-scare').value;
const texter = ['Alla', 'Mysigt', 'Lite läskigt', 'Obehagligt', 'Skräckinjagande', 'Ren terror'];
document.getElementById('min-scare-value').textContent = texter[värde];
}

function visaFel(meddelande) {
const container = document.querySelector('.container');
container.innerHTML = `
<div class="error" style="margin: 2rem 0;">
<h2>Något gick fel!</h2>
<p>${meddelande}</p>
 <a href="index.html" class="btn">Ladda om</a>
</div>
`;
}

