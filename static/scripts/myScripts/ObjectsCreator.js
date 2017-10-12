"use strict";

export default class ObjectsCreator{
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
