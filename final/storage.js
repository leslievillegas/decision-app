
const saveLS = (playerSelections) => {
    const dataArr = JSON.stringify(playerSelections);
    localStorage.setItem("playerSelections", dataArr);
};

const getLS = () => {
    const retreivedArr = localStorage.getItem("playerSelections")
    if(retreivedArr !== null) {
        return JSON.parse(retreivedArr);
    } else {
        return [];
    }
}

const playerSelections = getLS();

export{saveLS, getLS};