"use strict";

import ElementGetter from "./ElementGetter.js";

export default class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = ElementGetter.get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.initSceneCameraRenderer();
    }

    printContent(){
        this.renderer.render(this.scene, this.camera);
    }

    initSceneCameraRenderer(){
        const ww = this.ww;
        const hh = this.hh;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, ww / hh, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#5882ff");
        this.renderer.setSize(ww, hh);
        this.box.append(this.renderer.domElement);
        this.printContent();
    }


};