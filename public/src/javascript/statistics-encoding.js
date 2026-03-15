document.addEventListener("DOMContentLoaded", () => {

  const gameSelect = document.getElementById("gameSelect");
  const addStatsBtn = document.getElementById("addStatsBtn");
  const statsTableBody = document.getElementById("statsTableBody");

  // Temporary games data (replace later with API if needed)
  const games = [
    { id: 1, name: "Game 1 - 2026-03-15 vs Eagles" },
    { id: 2, name: "Game 2 - 2026-03-20 vs Falcons" },
  ];

  // Populate dropdown
  games.forEach((game) => {
    const option = document.createElement("option");
    option.value = game.id;
    option.textContent = game.name;
    gameSelect.appendChild(option);
  });

  // Handle game selection change
  gameSelect.addEventListener("change", () => {
    const selectedGameId = gameSelect.value;

    if (!selectedGameId) {
      addStatsBtn.disabled = true;
      statsTableBody.innerHTML =
        `<tr><td colspan="15" style="text-align:center; padding:20px;">
        Select a game to view statistics
        </td></tr>`;
      return;
    }

    addStatsBtn.disabled = false;

    loadStats(selectedGameId);
  });


  // Load stats for selected game (FROM BACKEND API)
  async function loadStats(gameId) {

    try {

      const response = await fetch(`/api/gameStats/game/${gameId}`);
      const stats = await response.json();

      if (!stats || stats.length === 0) {

        statsTableBody.innerHTML =
          `<tr><td colspan="15" style="text-align:center; padding:20px;">
          No player stats available for this game.
          </td></tr>`;

        return;
      }

      statsTableBody.innerHTML = "";

      stats.forEach((stat) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${stat.player}</td>
          <td>${stat.min}</td>
          <td>${stat.pts}</td>
          <td>${stat.fg}</td>
          <td>${stat["3pt"]}</td>
          <td>${stat.ft}</td>
          <td>${stat.oreb}</td>
          <td>${stat.dreb}</td>
          <td>${stat.ast}</td>
          <td>${stat.stl}</td>
          <td>${stat.blk}</td>
          <td>${stat.to}</td>
          <td>${stat.pf}</td>
          <td>${stat.plusMinus > 0 ? "+" + stat.plusMinus : stat.plusMinus}</td>
          <td class="actions-btns">
            <button class="edit-btn" data-id="${stat._id}">Edit</button>
            <button class="delete-btn" data-id="${stat._id}">Delete</button>
          </td>
        `;

        statsTableBody.appendChild(tr);

      });

    } catch (error) {

      console.error("Error loading stats:", error);

      statsTableBody.innerHTML =
        `<tr><td colspan="15" style="text-align:center; padding:20px;">
        Error loading statistics
        </td></tr>`;
    }

  }

});