const getWeaponEffectiveness = (selection) => {
    let effectivenessMessage;

    
    if ((selection.level >= 10 && selection.weapon === "Splat Roller" && selection.ability === "Ink Saver (Main)") ||
       (selection.level >= 15 && selection.weapon === "Splattershot" && selection.ability === "Ninja Squid") || (selection.level >= 10 && selection.weapon === "Ink Brush" && selection.ability === "")) {
        effectivenessMessage = "";
    } else if (selection.isComp && selection.level < 10) {
        effectivenessMessage = "";
    } else {
        effectivenessMessage = "";
    }

    return effectivenessMessage;
};

class PlayerSelection {
    constructor(userName, weapon, ability, level, isComp = false) {
        this.userName = userName;
        this.weapon = weapon;
        this.ability = ability;
        this.level = level;
        this.isComp = isComp;
    }

    getEffectivenessMessage() {
        if ((this.level >= 10 && this.weapon === "Splat Roller" && this.ability === "Ink Saver (Main)") ||
            (this.level >= 15 && this.weapon === "Splattershot" && this.ability === "Ninja Squid") ||
            (this.level >= 10 && this.weapon === "Ink Brush" && this.ability === "Quick Respawn")) {
            return "This combination is effective for comp play!";
        } else if (this.isComp && this.level < 10) {
            return "You should level up before using this combo in comp.";
        } else {
            return "This combo is not the best choice.";
        }
    }
}