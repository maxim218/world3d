"use strict";

import SceneWorker from "./SceneWorker.js";
import ElementGetter from "./ElementGetter.js";
import Logger from "./Logger.js";

class MainClass {
    constructor(){
        Logger.write("Version after changing design");
        Logger.write("Version: 1.4");
        this.createControlingObjects();
        this.addEventsToPanelButtons();
    }

    createControlingObjects(){
        this.sceneWorker = new SceneWorker("threeJSGraphicsBox", 1000, 800);
    }

    addEventsToPanelButtons(){
        const t = this;

        ElementGetter.get("btnTop").onclick = function () {
            Logger.write("Proection TOP");
            t.sceneWorker.setCameraType("TOP");
        };

        ElementGetter.get("btnFace").onclick = function () {
            Logger.write("Proection FACE");
            t.sceneWorker.setCameraType("FACE");
        }
    }
}

window.onload = function(){
    const mainObj = new MainClass();
};