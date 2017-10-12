"use strict";

import ElementGetter from "./ElementGetter.js";
import ObjectsCreator from "./ObjectsCreator";
import HeroController from "./HeroController";
import LevelReturner from "./LevelReturner.js";

export default class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = ElementGetter.get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.initSceneCameraRenderer();
        this.addLightsToScene();
        this.addGroundToScene();
        this.setCameraTopProection();

        this.wallsArray = [];
        this.buildWallsPerimetr();
        this.buildWalls();

        this.heroController = new HeroController(this.scene, this.wallsArray);

        this.printContent();

        const t = this;
        this.repeatingMethod(function(){
            t.heroController.moveHero();
            t.printContent();
        });
    }

    addWall(i, j){
        const wall = {
            i: i,
            j: j
        };
        this.wallsArray.push(wall);
    }


    buildWallsPerimetr(){
        const length = 20;
        for(let i = 0; i < length; i++){
            ObjectsCreator.createWall(0,i,this.scene);
            this.addWall(0, i);
            ObjectsCreator.createWall(19,i,this.scene);
            this.addWall(19, i);
        }

        for(let i = 1; i < length - 1; i++){
            ObjectsCreator.createWall(i, 0, this.scene);
            this.addWall(i, 0);
            ObjectsCreator.createWall(i, 19, this.scene);
            this.addWall(i, 19);
        }
    }

    buildWalls(){
        const t = this;

        function wall(i,j){
            ObjectsCreator.createWall(i, j, t.scene);
            t.addWall(i, j);
        }

        const levelArr = LevelReturner.level_1();
        for(let i = 0; i < levelArr.length; i++){
            const obj = levelArr[i];
            const ii = obj.i;
            const jj = obj.j;
            wall(ii,jj);
        }

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