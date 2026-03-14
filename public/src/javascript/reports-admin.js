document.addEventListener("DOMContentLoaded", () => {

const playerSelect = document.getElementById("playerSelect");
const statsBox = document.getElementById("statsBox");
const gameLogBody = document.getElementById("gameLogBody");

let chart;

/* SAMPLE DATA */

const playersData = {
    "John Doe": {
        ppg: [12, 18, 25, 22, 28],
        games: [
            { date: "Mar 1", opp: "Team A", result: "W", min: 30, pts: 25, fg: "10/18", "3pt": "3/6", ft: "2/2", reb: 7, ast: 5, stl: 2, blk: 1, to: 3, pm: "+8" },
            { date: "Mar 5", opp: "Team B", result: "L", min: 28, pts: 18, fg: "7/15", "3pt": "2/5", ft: "2/3", reb: 6, ast: 7, stl: 1, blk: 0, to: 2, pm: "-3" }
        ],
        stats: { reb: 6.5, ast: 6, stl: 1.5, blk: 0.5, to: 2.5 }
    },
    "Jane Smith": {
        ppg: [10, 14, 20, 24, 19],
        games: [],
        stats: { reb: 5, ast: 4, stl: 1, blk: 0.3, to: 2 }
    }
};

/* CHART FUNCTION */

function renderChart(data) {

    const ctx = document.getElementById("ppgChart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["G1", "G2", "G3", "G4", "G5"],
            datasets: [{
                label: "Points",
                data: data,
                borderColor: "#0b5d3b",
                backgroundColor: "rgba(11,93,59,0.2)",
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

}

/* PLAYER CHANGE */

playerSelect.addEventListener("change", () => {

    const player = playerSelect.value;

    if (!player) return;

    const data = playersData[player];

    /* CHART */
    renderChart(data.ppg);

    /* STATS */
    statsBox.innerHTML = `
        <p><strong>Rebounds:</strong> ${data.stats.reb}</p>
        <p><strong>Assists:</strong> ${data.stats.ast}</p>
        <p><strong>Steals:</strong> ${data.stats.stl}</p>
        <p><strong>Blocks:</strong> ${data.stats.blk}</p>
        <p><strong>Turnovers:</strong> ${data.stats.to}</p>
    `;

    /* GAME LOG */
    gameLogBody.innerHTML = "";

    data.games.forEach(g => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${g.date}</td>
            <td>${g.opp}</td>
            <td>${g.result}</td>
            <td>${g.min}</td>
            <td>${g.pts}</td>
            <td>${g.fg}</td>
            <td>${g["3pt"]}</td>
            <td>${g.ft}</td>
            <td>${g.reb}</td>
            <td>${g.ast}</td>
            <td>${g.stl}</td>
            <td>${g.blk}</td>
            <td>${g.to}</td>
            <td>${g.pm}</td>
        `;
        gameLogBody.appendChild(tr);
    });

});

});
