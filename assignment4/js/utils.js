export function getScareText(level) {
     if (level === 1) {
          return "Inte illa"
     } else if (level === 2) {
          return "Lite läskigt"
     } else if (level === 3) {
          return "Ganska läskigt"
     } else if (level === 4) {
          return "Obehagligt"
     } else if (level === 5) {
          return "Hemskt läskigt"
     } else {
          return "Okänd nivå"
     }
}

export function showError(message) {
     const errorDiv = document.getElementById("error-container");

     if (errorDiv) {
          errorDiv.innerHTML = "<p class='error-message'>" + message + "</p>";
     }
}
