export class Booking {
     constructor(house) {
          this.house = house;
          this.checkIn = null;
          this.checkOut = null;
          this.guests = 1;
          this.extras = [];
     }

     getNights() {
          if (!this.checkIn || !this.checkOut) {
               return 0;
          }

          const start = new Date(this.checkIn);
          const end = new Date(this.checkOut);
          const diff = end - start;
          const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return diffDays > 0 ? diffDays : 0;
     }

     getBasePrice() {
          return this.getNights() * this.house.pricePerNight;
     }

     getExtrasPrice() {
          return this.extras.length * 500;
     }

     getTotalPrice() {
          return this.getBasePrice() + this.getExtrasPrice();
     }

     isValid() {
          const nights = this.getNights();
          const validGuests = this.guests > 0 && this.guests <= this.house.maxGuests;
          return nights > 0 && validGuests;
     }
}