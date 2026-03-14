document.addEventListener("DOMContentLoaded", () => {
  const gameSelect = document.getElementById("gameSelect");
  const addStatsBtn = document.getElementById("addStatsBtn");
  const statsTableBody = document.getElementById("statsTableBody");

  // Dummy games data
  const games = [
    { id: 1, name: "Game 1 - 2026-03-15 vs Eagles" },
    { id: 2, name: "Game 2 - 2026-03-20 vs Falcons" },
  ];

  // Dummy stats data keyed by game ID
  const statsData = {
    1: [
      {
        id: 101,
        player: "John Doe",
        min: 35,
        pts: 22,
        fg: 8,
        "3pt": 3,
        ft: 3,
        oreb: 2,
        dreb: 6,
        ast: 5,
        stl: 1,
        blk: 0,
        to: 2,
        pf: 3,
        plusMinus: +10,
      },
      {
        id: 102,
        player: "Jane Smith",
        min: 30,
        pts: 15,
        fg: 6,
        "3pt": 2,
        ft: 1,
        oreb: 1,
        dreb: 4,
        ast: 7,
        stl: 3,
        blk: 1,
        to: 1,
        pf: 2,
        plusMinus: +8,
      },
    ],
    2: [], // No stats yet for game 2
  };

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
      statsTableBody.innerHTML = `<tr><td colspan="15" style="text-align:center; padding:20px;">Select a game to view statistics</td></tr>`;
      return;
    }

    addStatsBtn.disabled = false;
    loadStats(selectedGameId);
  });

  // Load stats for selected game
  function loadStats(gameId) {
    const stats = statsData[gameId] || [];

    if (stats.length === 0) {
      statsTableBody.innerHTML = `<tr><td colspan="15" style="text-align:center; padding:20px;">No player stats available for this game.</td></tr>`;
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
          <button class="edit-btn" data-id="${stat.id}">Edit</button>
          <button class="delete-btn" data-id="${stat.id}">Delete</button>
        </td>
      `;

      statsTableBody.appendChild(tr);
    });
  }
});
