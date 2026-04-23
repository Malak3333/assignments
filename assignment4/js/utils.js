export async function getHouses() {
     try {
          const response = await fetch("../data/houses.json");
          if (!response.ok) throw new Error("Kunde inte hämta huset");

          const data = await response.json();
          return data
     } catch (error) {
          throw error;
     
     }
}