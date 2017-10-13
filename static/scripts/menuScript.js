"use strict";

function elem(s) {
    return document.getElementById(s.toString());
}

function hideBoxes(){
    elem("contentRedactorLevel").hidden = true;
    elem("contentStartTraining").hidden = true;
}

function redactorLevelShowBox(){
    hideBoxes();
    elem("contentRedactorLevel").hidden = false;
}

function startTrainingShowBox(){
    hideBoxes();
    elem("contentStartTraining").hidden = false;
}

let arr = [];

function addToArray(keyElem, valueElem) {
    keyElem = keyElem.toString();
    valueElem = valueElem.toString();

    let obj = {
        keyElem: keyElem,
        valueElem: valueElem
    };

    arr.push(obj);
}

function findJSONbyKeyValue(keyString){
    keyString = keyString.toString();
    for(let i = 0; i < arr.length; i++){
        const obj = arr[i];
        if(obj.keyElem === keyString){
            return obj.valueElem.toString();
        }
    }
    return null;
}

window.onload = function(){
    let box = null;

    let names = [];
    let values = [];

    for(let i = 0; i < localStorage.length; i++) {
        names[i] = localStorage.key(i);
        values[i] = localStorage.getItem(names[i]);
        addToArray(names[i], values[i]);
    }

    box = elem("levelContentFirst");

    for(let i = 0; i < arr.length; i++){
        const content = "<div onclick = 'f1(this);' style = 'width: 500px; cursor: pointer; padding: 15px; background-color: #15fff2;'>" + arr[i].keyElem + "</div>";
        const paddingString = "<div style = 'padding: 5px;'></div>";
        box.innerHTML += (paddingString + content + paddingString);
    }

    box = elem("listOfBoxesForStartTraining");

    for(let i = 0; i < arr.length; i++){
        const content = "<div onclick = 'f2(this);' style = 'width: 500px; cursor: pointer; padding: 15px; background-color: #15fff2;'>" + arr[i].keyElem + "</div>";
        const paddingString = "<div style = 'padding: 5px;'></div>";
        box.innerHTML += (paddingString + content + paddingString);
    }
};

function f1(element){
    const keyValue = element.innerHTML;
    const jsonString = findJSONbyKeyValue(keyValue);
    window.location = "redactor.html" + "?" + jsonString;
}

function f2(element){
    const keyValue = element.innerHTML;
    const jsonString = findJSONbyKeyValue(keyValue);
    window.location = "world.html" + "?" + jsonString;
}

