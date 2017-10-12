"use strict";

import ElementGetter from "./ElementGetter.js";
import ObjectsCreator from "./ObjectsCreator";
import HeroController from "./HeroController";

export default class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = ElementGetter.get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.initSceneCameraRenderer();
        this.addLightsToScene();
        this.addGroundToScene();
        this.setCameraTopProection();
        this.buildWallsPerimetr();
        this.buildWalls();
        this.heroController = new HeroController(this.scene);
        this.printContent();

        const t = this;
        this.repeatingMethod(function(){
            t.heroController.moveHero();
            t.printContent();
        });
    }

    buildWallsPerimetr(){
        const length = 20;
        for(let i = 0; i < length; i++){
            ObjectsCreator.createWall(0,i,this.scene);
            ObjectsCreator.createWall(19,i,this.scene);
        }

        for(let i = 1; i < length - 1; i++){
            ObjectsCreator.createWall(i, 0, this.scene);
            ObjectsCreator.createWall(i, 19, this.scene);
        }
    }

    buildWalls(){
        const scene = this.scene;
        function wall(i,j){
            ObjectsCreator.createWall(i, j, scene);
        }

        wall(4,4);
        wall(4,5);
        wall(4,6);

        wall(9,4);
        wall(9,5);
        wall(9,6);

        wall(14,4);
        wall(14,5);
        wall(14,6);
    }

    repeatingMethod(foo){
        this.repeatInterval = setInterval(foo, 50);
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
        const light_1 = ObjectsCreator.createSpotLight(0, 0);
        const light_2 = ObjectsCreator.createSpotLight(100, 0);
        const light_3 = ObjectsCreator.createSpotLight(100, 100);
        const light_4 = ObjectsCreator.createSpotLight(0, 100);
        const light_5 = ObjectsCreator.createSpotLight(50, 50);
        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
        this.scene.add(light_4);
        this.scene.add(light_5);
    }

    addGroundToScene(){
        ObjectsCreator.createPlane(100, this.scene);
    }

};