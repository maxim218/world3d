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





class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */].get(idBox);
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
        const light_1 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(0,0);
        const light_2 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(100,0);
        const light_3 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(100,100);
        const light_4 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(0,100);
        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
        this.scene.add(light_4);
    }

    addGroundToScene(){
        const plane = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createPlane(100);
        this.scene.add(plane);
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
        let spotLight = new THREE.SpotLight("#ffffff", 1);
        const yy = 120;
        spotLight.position.set(xx, yy, zz);
        return spotLight;
    }

    static createPlane(ww){
        let planeGeometry = new THREE.PlaneGeometry(ww, ww, 1, 1);
        let planeMaterial = new THREE.MeshLambertMaterial({color: "#d27442"});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = (-0.5) * Math.PI;
        plane.position.x = ww / 2;
        plane.position.y = 0;
        plane.position.z = ww / 2;
        return plane;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectsCreator;



/***/ })
/******/ ]);