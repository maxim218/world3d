
function setType(element){
    elem("type").innerHTML = element.innerHTML;
}

let holst = null;

let arr = [
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
];


function printMessage(s){
    s = s.toString();
    elem("wwwText").innerHTML = s;
    elem("fon").hidden = false;
    elem("messageWindow").hidden = false;
}


function saveLevel(){
    let myObj = {
        arr: arr
    };
    let jsonString = encodeURIComponent(JSON.stringify(myObj));
    let levelName = elem("nameLevelField").value;
    localStorage.setItem(levelName.toString(), jsonString.toString());
    printMessage("Уровень успешно сохранён.");
}

for(let i = 0; i < 20; i++){
    for(let j = 0; j < 20; j++){
        arr[i][j] = 0;
    }
}

function clearHolst(){
    holst.fillStyle = '#FFFFFF';
    holst.strokeStyle = '#666666';
    holst.fillRect(0, 0, 800, 800);
}

function buildKv(i, j, color){
    holst.fillStyle = color.toString();
    holst.fillRect(j * 25, i * 25, 25, 25);
    holst.strokeRect(j * 25, i * 25, 25, 25);
}

function addEmpty(i, j){
    arr[i][j] = 0;
    buildKv(i, j, "#ffffff");
}

function buildSetka(){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            addEmpty(i, j);
        }
    }
}

function addWall(i, j){
    arr[i][j] = 1;
    buildKv(i, j, "#999999");
}

function addCarX(i, j){
    arr[i][j] = 2;
    buildKv(i, j, "#00FF00");
}

function addCarZ(i, j){
    arr[i][j] = 3;
    buildKv(i, j, "#0000FF");
}

function setStartPos(ii, jj){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            if(arr[i][j] === 4){
                addEmpty(i,j);
            }
        }
    }
    arr[ii][jj] = 4;
    buildKv(ii, jj, "#FF0000");
}

function setFinishPos(ii, jj){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            if(arr[i][j] === 5){
                addEmpty(i,j);
            }
        }
    }
    arr[ii][jj] = 5;
    buildKv(ii, jj, "#000000");
}

function buildPerimaterOfWalls(){
    for(let i = 0; i < 20; i++){
        addWall(i,0);
        addWall(i,19);
    }

    for(let i = 1; i < 19; i++){
        addWall(0, i);
        addWall(19, i);
    }
}


function elem(s){
    return document.getElementById(s.toString());
}

window.onload = function(){
        holst = elem("can").getContext("2d");
        clearHolst();
        buildSetka();
        buildPerimaterOfWalls();

        elem("can").addEventListener("click",function(event){
            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            const xx = parseInt(xMouse / 25);
            const yy = parseInt(yMouse / 25);

            const type = elem("type").innerHTML.toString();

            if(type === "Стены"){
                addWall(yy,xx);
            }

            if(type === "Машины X"){
                addCarX(yy,xx);
            }

            if(type === "Машины Z"){
                addCarZ(yy,xx);
            }

            if(type === "Стартовая позиция"){
                setStartPos(yy,xx);
            }

            if(type === "Финишная позиция"){
                setFinishPos(yy,xx);
            }

            buildPerimaterOfWalls();
        });
};
