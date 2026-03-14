document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("gameModal");
    const addGameBtn = document.querySelector(".add-game");
    const closeBtn = document.querySelector(".close");
    const gameForm = document.getElementById("gameForm");
    const gamesTableBody = document.getElementById("gamesTableBody");

    let games = [];

    // OPEN MODAL
    addGameBtn.addEventListener("click", function () {
        modal.style.display = "flex";
        gameForm.reset();
        document.getElementById("modalTitle").textContent = "Add Game";
    });

    // CLOSE MODAL
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

    // SAVE GAME
    gameForm.addEventListener("submit", function(e){
        e.preventDefault();

        const game = {
            id: Date.now(),
            date: document.getElementById("date").value,
            opponent: document.getElementById("opponent").value,
            type: document.getElementById("type").value,
            venue: document.getElementById("venue").value,
            teamScore: document.getElementById("teamScore").value || 0,
            oppScore: document.getElementById("oppScore").value || 0,
            status: document.getElementById("status").value,
            resultClass: "",
            result: ""
        };

        // calculate result
        if(game.teamScore > game.oppScore) { game.result = "Win"; game.resultClass = "win"; }
        else if(game.teamScore < game.oppScore) { game.result = "Loss"; game.resultClass = "loss"; }
        else if(game.teamScore == game.oppScore && game.status=="Completed") { game.result = "Draw"; game.resultClass = ""; }

        games.push(game);
        renderGames();
        modal.style.display = "none";
    });

    // RENDER TABLE
    function renderGames(){
        if(games.length===0){
            gamesTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:20px;">No games yet</td></tr>`;
            return;
        }

        gamesTableBody.innerHTML = "";
        games.forEach((g, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${i+1}</td>
                <td>${g.date}</td>
                <td>${g.opponent}</td>
                <td>${g.type}</td>
                <td>${g.venue}</td>
                <td>${g.teamScore} - ${g.oppScore}</td>
                <td><span class="result ${g.resultClass}">${g.result}</span></td>
                <td>${g.status}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            gamesTableBody.appendChild(tr);

            // DELETE
            tr.querySelector(".delete-btn").addEventListener("click", ()=> {
                games = games.filter(x=> x.id !== g.id);
                renderGames();
            });

            // EDIT
            tr.querySelector(".edit-btn").addEventListener("click", ()=> {
                document.getElementById("modalTitle").textContent = "Edit Game";
                modal.style.display = "flex";
                document.getElementById("date").value = g.date;
                document.getElementById("opponent").value = g.opponent;
                document.getElementById("type").value = g.type;
                document.getElementById("venue").value = g.venue;
                document.getElementById("teamScore").value = g.teamScore;
                document.getElementById("oppScore").value = g.oppScore;
                document.getElementById("status").value = g.status;

                // remove old, replace on save
                games = games.filter(x => x.id !== g.id);
            });
        });
    }

});
