document.addEventListener("DOMContentLoaded", () => {

  const gameSelect = document.getElementById("gameSelect");
  const addStatsBtn = document.getElementById("addStatsBtn");
  const statsTableBody = document.getElementById("statsTableBody");
  
  const modal = document.getElementById("statsModal");
  const closeModal = document.getElementById("closeModal");
  const statsForm = document.getElementById("statsForm");
  
  let selectedGameId = null;
  
  
  // TEMP GAMES
  const games = [
  { id:"1", name:"Game 1 vs Eagles"},
  { id:"2", name:"Game 2 vs Falcons"}
  ];
  
  
  games.forEach(game=>{
  
  const option=document.createElement("option");
  
  option.value=game.id;
  option.textContent=game.name;
  
  gameSelect.appendChild(option);
  
  });
  
  
  
  gameSelect.addEventListener("change",()=>{
  
  selectedGameId=gameSelect.value;
  
  if(!selectedGameId){
  
  addStatsBtn.disabled=true;
  
  statsTableBody.innerHTML=`<tr>
  <td colspan="11" style="text-align:center">
  Select a game to view statistics
  </td>
  </tr>`;
  
  return;
  
  }
  
  addStatsBtn.disabled=false;
  
  loadStats(selectedGameId);
  
  });
  
  
  
  async function loadStats(gameId){
  
  try{
  
  const res=await fetch(`/api/gameStats/game/${gameId}`);
  const stats=await res.json();
  
  if(!stats.length){
  
  statsTableBody.innerHTML=`<tr>
  <td colspan="11" style="text-align:center">
  No stats recorded
  </td>
  </tr>`;
  
  return;
  
  }
  
  statsTableBody.innerHTML="";
  
  stats.forEach(stat=>{
  
  const t=stat.totals||{};
  
  const row=document.createElement("tr");
  
  row.innerHTML=`
  
  <td>${stat.playerId}</td>
  <td>${t.minutesPlayed||0}</td>
  <td>${t.points||0}</td>
  <td>${t.assists||0}</td>
  <td>${t.offensiveRebounds||0}</td>
  <td>${t.defensiveRebounds||0}</td>
  <td>${t.steals||0}</td>
  <td>${t.blocks||0}</td>
  <td>${t.turnovers||0}</td>
  <td>${t.fouls||0}</td>
  <td>${t.plusMinus||0}</td>
  
  `;
  
  statsTableBody.appendChild(row);
  
  });
  
  }catch(err){
  
  console.error("Error loading stats",err);
  
  }
  
  }
  
  
  
  addStatsBtn.addEventListener("click",()=>{
  
  modal.style.display="flex";
  
  });
  
  
  closeModal.addEventListener("click",()=>{
  
  modal.style.display="none";
  
  });
  
  
  
  statsForm.addEventListener("submit",async(e)=>{
  
  e.preventDefault();
  
  const data={
  
  gameId:selectedGameId,
  
  playerId:document.getElementById("playerId").value,
  
  periodStats:{
  
  q1:{
  
  minutesPlayed:Number(document.getElementById("minutesPlayed").value),
  points:Number(document.getElementById("points").value),
  assists:Number(document.getElementById("assists").value),
  offensiveRebounds:Number(document.getElementById("offensiveRebounds").value),
  defensiveRebounds:Number(document.getElementById("defensiveRebounds").value),
  steals:Number(document.getElementById("steals").value),
  blocks:Number(document.getElementById("blocks").value),
  turnovers:Number(document.getElementById("turnovers").value),
  fouls:Number(document.getElementById("fouls").value),
  plusMinus:Number(document.getElementById("plusMinus").value)
  
  }
  
  }
  
  };
  
  
  try{
  
  await fetch("/api/gameStats/create",{
  
  method:"POST",
  
  headers:{
  "Content-Type":"application/json"
  },
  
  body:JSON.stringify(data)
  
  });
  
  modal.style.display="none";
  
  statsForm.reset();
  
  loadStats(selectedGameId);
  
  }catch(err){
  
  console.error("Error saving stats",err);
  
  }
  
  });
  
  
  });