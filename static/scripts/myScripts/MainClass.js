"use strict";

import SceneWorker from "./SceneWorker.js";

class MainClass {
    constructor(){
        this.createControliingObjects();
    }

    createControliingObjects(){
        this.sceneWorker = new SceneWorker("threeJSGraphicsBox", 1000, 800);
    }
}

window.onload = function(){
    const mainObj = new MainClass();
};