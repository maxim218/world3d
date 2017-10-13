"use strict";

import ElementGetter from "./ElementGetter.js";
import ObjectsCreator from "./ObjectsCreator";
import HeroController from "./HeroController";
import LevelReturner from "./LevelReturner.js";
import Logger from "./Logger";

export default class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = ElementGetter.get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.cameraType = "TOP";

        this.initSceneCameraRenderer();
        this.addLightsToScene();
        this.addGroundToScene();
        this.setCameraTopProection();

        this.wallsArray = [];
        this.buildWallsPerimetr();
        this.buildWalls();

        this.carsArray = [];
        this.createCars();

        this.heroController = new HeroController(this.scene, this.wallsArray);

        this.printContent();

        const t = this;
        this.repeatingMethod(function(){
            t.movingOfAllCars();

            t.heroController.moveHero();

            if(t.cameraType === "TOP"){
                t.setCameraTopProection();
            }

            if(t.cameraType === "FACE"){
                t.camera.position.x = t.heroController.hero.position.x;
                t.camera.position.y = 2.6;
                t.camera.position.z = t.heroController.hero.position.z;

                t.camera.rotation.x = 0;
                t.camera.rotation.y = t.heroController.hero.rotation.y - Math.PI / 2;
                t.camera.rotation.z = 0;
            }

            t.heroLight.position.x = t.heroController.hero.position.x;
            t.heroLight.position.y = 50;
            t.heroLight.position.z = t.heroController.hero.position.z;

            t.printContent();
        });
    }

    setCameraType(type){
        this.cameraType = type.toString();
    }

    addWall(i, j){
        const wall = {
            i: i,
            j: j
        };
        this.wallsArray.push(wall);
    }

    movingOfAllCars(){
        const speed = 0.5;
        const t = this;

        function isWall(zz,xx){
            for(let i = 0; i < t.wallsArray.length; i++){
                const wall = t.wallsArray[i];
                if(wall.i === zz && wall.j === xx){
                    return true;
                }
            }
            return false;
        }

        for(let i = 0; i < t.carsArray.length; i++){
            const obj = t.carsArray[i];

            let xx = obj.carObj.position.x;
            let zz = obj.carObj.position.z;

            xx = parseInt(xx / 5);
            zz = parseInt(zz / 5);

            if(obj.type === "X"){
                if(obj.v === 1){
                    if(isWall(zz, xx + 1)){
                        obj.v = 0;
                    } else {
                        obj.carObj.position.x += speed;
                    }
                }
                if(obj.v === 0){
                    if(isWall(zz, xx - 1)){
                        obj.v = 1;
                    } else {
                        obj.carObj.position.x -= speed;
                    }
                }
            }

            if(obj.type === "Z"){
                if(obj.v === 1){
                    if(isWall(zz + 1, xx)){
                        obj.v = 0;
                    } else {
                        obj.carObj.position.z += speed;
                    }
                }
                if(obj.v === 0){
                    if(isWall(zz - 1, xx)){
                        obj.v = 1;
                    } else {
                        obj.carObj.position.z -= speed;
                    }
                }
            }
        }
    }

    createCars(){
        const t = this;
        function addCar(i, j, type){
            let carObj = null;

            if(type === "X") {
                carObj = ObjectsCreator.createCarMovingX(i, j, t.scene, "#0000FF", "#000000");
            }
            if(type === "Z") {
                carObj = ObjectsCreator.createCarMovingZ(i, j, t.scene, "#FF0000", "#000000");
            }
            t.carsArray.push({i: i, j: j, carObj: carObj, v: 1, type: type});
        }

        addCar(9, 4, "X");
        addCar(8, 8, "Z");

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
        const force = 0.5;

        const light_1 = ObjectsCreator.createSpotLight(0, 0, force);
        const light_2 = ObjectsCreator.createSpotLight(100, 0, force);
        const light_3 = ObjectsCreator.createSpotLight(100, 100, force);
        const light_4 = ObjectsCreator.createSpotLight(0, 100, force);
        const light_5 = ObjectsCreator.createSpotLight(50, 50, force + 1);
        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
        this.scene.add(light_4);
        this.scene.add(light_5);

        this.heroLight = light_5;
    }

    addGroundToScene(){
        ObjectsCreator.createPlane(100, this.scene);
    }

};