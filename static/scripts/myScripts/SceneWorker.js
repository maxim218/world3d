"use strict";

import ElementGetter from "./ElementGetter.js";
import ObjectsCreator from "./ObjectsCreator";

export default class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = ElementGetter.get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.initSceneCameraRenderer();
        this.addLightsToScene();
        this.addGroundToScene();
        this.setCameraTopProection();
        this.printContent();
    }

    setCameraTopProection(){
        const camera = this.camera;

        camera.position.x = 50;
        camera.position.y = 100;
        camera.position.z = 50;

        camera.rotation.x = -Math.PI / 2;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
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
    }

    addLightsToScene(){
        const light_1 = ObjectsCreator.createSpotLight(0,0);
        const light_2 = ObjectsCreator.createSpotLight(100,0);
        const light_3 = ObjectsCreator.createSpotLight(100,100);
        const light_4 = ObjectsCreator.createSpotLight(0,100);
        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
        this.scene.add(light_4);
    }

    addGroundToScene(){
        const plane = ObjectsCreator.createPlane(100);
        this.scene.add(plane);
    }


};