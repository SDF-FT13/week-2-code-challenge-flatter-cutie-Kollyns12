document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded! Fetching characters..."); // Debugging log
    getCharacters();
  });
  
  // 1️⃣ Fetch Characters from API and Show in Character Bar
  function getCharacters() {
    fetch("http://localhost:3000/characters")
      .then(function (response) {
        return response.json();
      })
      .then(function (characters) {
        console.log("Characters fetched:", characters); // Debugging log
        let characterBar = document.getElementById("character-bar");
  
        characters.forEach(function (character) {
          let span = document.createElement("span");
          span.textContent = character.name;
          span.style.cursor = "pointer"; // Make it look clickable
  
          // When clicked, show the character details
          span.addEventListener("click", function () {
            showCharacter(character);
          });
  
          characterBar.appendChild(span);
        });
      })
      .catch(function (error) {
        console.log("Error loading characters:", error);
      });
  }
  
  // 2️⃣ Show Character Details When Clicked
  function showCharacter(character) {
    console.log("Showing details for:", character.name); // Debugging log
    document.getElementById("name").textContent = character.name;
    document.getElementById("image").src = character.image;
    document.getElementById("image").alt = character.name;
    document.getElementById("vote-count").textContent = character.votes;
    document.getElementById("votes-form").dataset.id = character.id; // Store ID for votes
  }
  
  // 3️⃣ Handle Vote Submission (Does Not Save to Server)
  document.getElementById("votes-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let votesInput = document.getElementById("votes");
    let newVotes = parseInt(votesInput.value) || 0;
    let voteCountElement = document.getElementById("vote-count");
  
    // Add the new votes to the displayed number
    let totalVotes = parseInt(voteCountElement.textContent) + newVotes;
    voteCountElement.textContent = totalVotes;
    console.log("New vote count:", totalVotes); // Debugging log
  
    votesInput.value = ""; // Clear the input field
  });
   
