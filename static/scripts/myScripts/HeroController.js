"use strict";

import Logger from "./Logger.js";

export default class HeroController{
    constructor(scene, wallsArray) {
        this.scene = scene;
        this.wallsArray = wallsArray;

        this.createHero(4, 9);

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;

        this.speedMoving = 0.2;
        this.speedRotation = 0.05;

        this.addKeyEvents();
    }

    setKeyValues(n, flag) {
        switch (n) {
            case 87:
                this.w = flag;
                break;
            case 65:
                this.a = flag;
                break;
            case 83:
                this.s = flag;
                break;
            case 68:
                this.d = flag;
                break;
        }
    }

    createHero(i, j){
        i = parseInt(i);
        j = parseInt(j);

        const ww = 5;

        let radius = ww / 2;
        let height = ww;
        let sideNumber = 4;

        let cone_geometry = new THREE.ConeBufferGeometry(radius, height, sideNumber);
        let cone_material = new THREE.MeshLambertMaterial({color: "#0000ff"});
        let cone = new THREE.Mesh(cone_geometry,cone_material);

        cone.position.x = j * ww + ww / 2;
        cone.position.y = ww / 2;
        cone.position.z = i * ww + ww / 2;

        cone.rotation.x = 0;
        cone.rotation.y = 0;
        cone.rotation.z = -Math.PI / 2;

        this.scene.add(cone);

        this.hero = cone;
    }

    addKeyEvents(){
        const t = this;

        window.onkeydown = function(event) {
            const keyNumber = event.keyCode;
            t.setKeyValues(keyNumber, true);
        };

        window.onkeyup = function(event){
            const keyNumber = event.keyCode;
            t.setKeyValues(keyNumber, false);
        }
    }

    hitTest(){
        const arr = this.wallsArray;

        let xx = this.hero.position.x;
        let zz = this.hero.position.z;

        this.speedMoving += 2;

        if(this.w === true){
            xx = this.hero.position.x + this.speedMoving * Math.cos(this.hero.rotation.y);
            zz = this.hero.position.z - this.speedMoving * Math.sin(this.hero.rotation.y);
        }

        if(this.s === true){
            xx = this.hero.position.x - this.speedMoving * Math.cos(this.hero.rotation.y);
            zz = this.hero.position.z + this.speedMoving * Math.sin(this.hero.rotation.y);
        }

        this.speedMoving -= 2;

        const x_pos = parseInt(xx / 5);
        const z_pos = parseInt(zz / 5);

        for(let i = 0; i < arr.length; i++){
            const obj = arr[i];

            if(obj.i === z_pos && obj.j === x_pos){
                return true;
            }
        }

        return false;
    }

    moveHero(){
        if(this.hitTest() === false) {
            if (this.a === true) {
                this.hero.rotation.y += this.speedRotation;
            }

            if (this.d === true) {
                this.hero.rotation.y -= this.speedRotation;
            }

            if (this.w === true) {
                this.hero.position.x += this.speedMoving * Math.cos(this.hero.rotation.y);
                this.hero.position.z += -this.speedMoving * Math.sin(this.hero.rotation.y);
            }

            if (this.s === true) {
                this.hero.position.x += -this.speedMoving * Math.cos(this.hero.rotation.y);
                this.hero.position.z += this.speedMoving * Math.sin(this.hero.rotation.y);
            }
        }
    }
}
