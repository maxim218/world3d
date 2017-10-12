/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneWorker_js__ = __webpack_require__(1);




class MainClass {
    constructor(){
        this.createControliingObjects();
    }

    createControliingObjects(){
        this.sceneWorker = new __WEBPACK_IMPORTED_MODULE_0__SceneWorker_js__["a" /* default */]("centerBox", 1000, 800);
    }
}

window.onload = function(){
    const mainObj = new MainClass();
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HeroController__ = __webpack_require__(4);






class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */].get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.initSceneCameraRenderer();
        this.addLightsToScene();
        this.addGroundToScene();
        this.setCameraTopProection();
        this.buildWallsPerimetr();
        this.buildWalls();
        this.heroController = new __WEBPACK_IMPORTED_MODULE_2__HeroController__["a" /* default */](this.scene);
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
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(0,i,this.scene);
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(19,i,this.scene);
        }

        for(let i = 1; i < length - 1; i++){
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(i, 0, this.scene);
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(i, 19, this.scene);
        }
    }

    buildWalls(){
        const scene = this.scene;
        function wall(i,j){
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(i, j, scene);
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
        const light_1 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(0, 0);
        const light_2 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(100, 0);
        const light_3 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(100, 100);
        const light_4 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(0, 100);
        const light_5 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(50, 50);
        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
        this.scene.add(light_4);
        this.scene.add(light_5);
    }

    addGroundToScene(){
        __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createPlane(100, this.scene);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SceneWorker;
;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ElementGetter{
    static get(idBox){
        idBox = idBox.toString();
        return document.getElementById(idBox);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementGetter;
;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ObjectsCreator{
    static createSpotLight(xx, zz){
        let spotLight = new THREE.SpotLight("#ffffff", 0.5);
        const yy = 220;
        spotLight.position.set(xx, yy, zz);
        return spotLight;
    }

    static createPlane(ww, scene){
        let loader = new THREE.TextureLoader();
        loader.load("images/ground.png", function(image){

            const repeatValue = 20;
            image.wrapS = THREE.RepeatWrapping;
            image.wrapT = THREE.RepeatWrapping;
            image.repeat.set(repeatValue, repeatValue);

            let planeGeometry = new THREE.PlaneGeometry(ww, ww, 1, 1);
            let planeMaterial = new THREE.MeshLambertMaterial({map: image});
            let plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = (-0.5) * Math.PI;
            plane.position.x = ww / 2;
            plane.position.y = 0;
            plane.position.z = ww / 2;
            scene.add(plane);
        });
    }

    static createWall(i, j, scene){
        i = parseInt(i);
        j = parseInt(j);
        const ww = 5;

        let loader = new THREE.TextureLoader();
        loader.load("images/wall.png", function(image) {
            let cubeGeometry = new THREE.CubeGeometry(ww, ww, ww);
            let cubeMaterial = new THREE.MeshLambertMaterial({map: image});
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = j * ww + ww / 2;
            cube.position.y = ww / 2;
            cube.position.z = i * ww + ww / 2;
            scene.add(cube);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectsCreator;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logger_js__ = __webpack_require__(5);




class HeroController{
    constructor(scene) {
        this.scene = scene;

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

    moveHero(){
        if(this.a === true){
            this.hero.rotation.y += this.speedRotation;
        }

        if(this.d === true){
            this.hero.rotation.y -= this.speedRotation;
        }

        if(this.w === true){
            this.hero.position.x += this.speedMoving * Math.cos(this.hero.rotation.y);
            this.hero.position.z += -this.speedMoving * Math.sin(this.hero.rotation.y);
        }

        if(this.s === true){
            this.hero.position.x += -this.speedMoving * Math.cos(this.hero.rotation.y);
            this.hero.position.z += this.speedMoving * Math.sin(this.hero.rotation.y);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HeroController;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Logger{
    static write(){
        const flag = true;

        if(flag === true) {
            if (arguments.length === 0) {
                return;
            }

            let elementsString = "";
            for (let i = 0; i < arguments.length; i++) {
                const element = arguments[i].toString();
                elementsString = elementsString + element + " ";
            }
            console.log("Message: " + elementsString);
        }
    }
}
/* unused harmony export default */



/***/ })
/******/ ]);