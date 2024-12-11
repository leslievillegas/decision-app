import {FORM} from "./global.js"
import {renderTbl} from "./render.js"
import { saveLS, getLS } from './storage.js';

const getElement = (id) => document.getElementById(id);
const USNAME = getElement('username');

    class PlayerSelection {
        constructor(userName, weapon, ability, level, isComp) {
            this.userName = userName;
            this.weapon = weapon;
            this.ability = ability;
            this.level = level;
            this.isComp = isComp;
        }
    
        getEffectivenessMessage(weapon, ability, level) {
            if (level >= 10 && weapon === "Splat Roller" && ability === "Ink Saver (Main)") {
                return "This combination is effective for comp play!";
            } else if (level >= 5 && weapon === "Splattershot" && ability === "Ninja Squid") {
                return "This combination is effective for comp play!";
            } else if (level >= 15 && weapon === "Ink Brush" && ability === "Quick Respawn") {
                return "This combination is effective for comp play!";
            } else if (level < 5) {
                return "You should level up before using this combo in comp";
            } else {
                return "This combo is not the best choice.";
            }
        }
    }

    const runPlayerSelection = () => {
        return getLS().map (
            (data) => new PlayerSelection(data.userName, data.weapon, data.ability, data.level, data.isComp)
        );
    };
    
        let playerSelections = runPlayerSelection();

    const displayOutputs = (selection) => {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';  

        if (selection.length === 0) {
            outputDiv.innerHTML = '';
            return;
        }

        selection.forEach(selection => {
            const effectivenessMessage = selection.getEffectivenessMessage();

            console.log(`Username: ${selection.userName}`)
            console.log(`Player Level: ${selection.level}`);
            console.log(`Selected Weapon: ${selection.weapon}`);
            console.log(`Selected Ability: ${selection.ability}`);
            console.log(effectivenessMessage);

        });
    };


    const setPlayerSelection = () => {
        displayOutputs(playerSelections);
        renderTbl(playerSelections)
    };

    const validateField = event => {
        const field = event.target.value;
        const fieldId = event.target.id;
        const fieldError = document.getElementById(`${fieldId}Error`);
      
        if (field === '') {
            fieldError.textContent = `${fieldId} is required`;
            event.target.classList.add('invalid');
        } else {
            fieldError.textContent = '';
            event.target.classList.remove('invalid');
        }
      };
      
    USNAME.addEventListener('blur', validateField);

    FORM.addEventListener('submit', function(e) {
        e.preventDefault();  

        const userName = document.getElementById('username').value
        const weapon = document.getElementById('weapon').value;
        const ability = document.getElementById('ability').value;
        const level = parseInt(document.getElementById('level').value, 10) || 0;

        const newSelection = new PlayerSelection (
            userName,
            weapon,
            ability,
            level
        );

        playerSelections.push(newSelection);

        saveLS(playerSelections);

        setPlayerSelection();

        FORM.reset();
    });

    setPlayerSelection();
