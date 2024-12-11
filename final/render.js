import {TBL} from "./global.js"
import { saveLS } from './storage.js';

function renderTblHeading () {
   const table = document.createElement("table");

   table.style.marginLeft = "auto";
   table.style.marginRight = "auto";

   const thead = document.createElement ("thead");
   const tr = document.createElement ("tr");
   const headingTextArr = ["Username", "Level", "Weapon", "Ability", "Effectiveness Message", "Action"]

   headingTextArr.forEach(function(text){
     const th = document.createElement("th");
     th.textContent = text;
     tr.appendChild(th);
     console.log(tr)
   });
   thead.appendChild(tr);
   table.appendChild(thead);
   return table
 }
  
 function renderTbl(playerSelections){
   TBL.innerHTML = "";

   if (playerSelections.length === 0) {
     TBL.innerHTML = "<p> Add player data!</p>";
     return;
   }

   const table = renderTblHeading();
   const tbody = document.createElement("tbody");

playerSelections.forEach((selection, index) => {
   const tr = document.createElement("tr");
   const effectivenessMessage = selection.getEffectivenessMessage(
     selection.weapon, 
     selection.ability, 
     selection.level
 );
   const dataArr = [
     selection.userName,
     selection.level,
     selection.weapon,
     selection.ability,
     effectivenessMessage,
   ];

   dataArr.forEach ((text) => {
       const td = document.createElement("td");
       td.textContent = text;
       tr.appendChild(td);
   });

   const actionTd = document.createElement("td");
   const btnEdit = document.createElement("button");
   const btnDel = document.createElement("button");

   btnEdit.textContent = "Edit";
   btnDel.textContent = "Delete";

   btnEdit.addEventListener("click", () => {
     document.getElementById("username").value = selection.userName;
     document.getElementById("weapon").value = selection.weapon;
     document.getElementById("ability").value = selection.ability;
     document.getElementById("level").value = selection.level;

     playerSelections.splice(index, 1);
     saveLS(playerSelections);
     renderTbl(playerSelections);
       
   });
   btnDel.addEventListener("click", () => {
         playerSelections.splice(index, 1);
         saveLS(playerSelections);
         renderTbl(playerSelections);
   });

   actionTd.appendChild(btnEdit);
   actionTd.appendChild(btnDel);
   tr.appendChild(actionTd);

   tbody.appendChild(tr);
});

table.appendChild(tbody);
TBL.appendChild(table);
 
}

 export {renderTbl, renderTblHeading};