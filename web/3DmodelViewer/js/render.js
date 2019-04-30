var scene, camera, renderer, controls;
var stats, container;

function render3Dforest() {

    if(foreDataset4 === "" || foreDataset4 === undefined || foreDataset4.length === 0)
        return;


    container = document.getElementById("canvas");

    if (Detector.webgl) {
        // Initiate function or other initializations here
        initThree();
        initScene();
        initCamera();
        initOrbitCtrl();
        initLight();
        initPlane();
        createTree();
        createForest();
        animate();
    } else {
        var warning = Detector.getWebGLErrorMessage();
        document.getElementById('canvas').appendChild(warning);
    }
}


// $(document).ready(function () {

// });

function initThree() {
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var offset = $("#canvas").offset();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);


    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = (offset.top + 20) + "px";
    stats.domElement.style.left = 30 + "px";
    stats.domElement.style.bottom = '0px';
    container.appendChild(stats.domElement);


    window.addEventListener('resize', onWindowResize, false);
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
}

function initCamera() {
    var width = $("#canvas").width();
    var height = $("#canvas").height();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 400);
    camera.position.z = 100;
    camera.position.y = 50;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

}

function initOrbitCtrl() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.5;

    controls.screenSpacePanning = false;

    controls.minDistance = 10;
    controls.maxDistance = 200;

    controls.maxPolarAngle = Math.PI;

}

function initLight() {
    var ambientLight = new THREE.HemisphereLight(0xFFFFFF,0x919191);
    scene.add(ambientLight);
}

function initPlane() {
    var geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: "#e0ffd8"});
    var Plane = new THREE.Mesh(geometry, material);
    scene.add(Plane);
    Plane.rotation.x = -0.5 * Math.PI;
}

function animate() {
    requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();
}

function render() {
    // changeCamera();
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    var width = $("#canvas").width();
    var height = $("#canvas").height();

    var aspect = width / height;
    camera.aspect = aspect;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = (height- 48) + "px";
    stats.domElement.style.left = '0px';
    stats.domElement.style.bottom = '0px';
}

function createTree(dbh, height, cw, ch, ubh) {

    // Truck
    var geometry1 = new THREE.CylinderGeometry(dbh / 2, dbh / 2, height - 1, 16);
    var material1 = new THREE.MeshLambertMaterial({color: "#725639"});
    var Truck = new THREE.Mesh(geometry1, material1);
    Truck.position.set(0, (height - 1) / 2, 0);

    // lower half crown
    if (ch > ubh) {
        var geometry2 = new THREE.CylinderGeometry(cw / 2, 0, ch - ubh, 16);
        var material2 = new THREE.MeshLambertMaterial({color: "#289045"});
        var Lcrown = new THREE.Mesh(geometry2, material2);
        Lcrown.position.set(0, ubh + (ch - ubh) / 2, 0);
    }
    else {
        ch = ubh;
    }

    // upper half crown
    var geometry3 = new THREE.CylinderGeometry(0, cw / 2, height - ch, 16);
    var material3 = new THREE.MeshLambertMaterial({color: "#289045"});
    var Ucrown = new THREE.Mesh(geometry3, material3);
    Ucrown.position.set(0, ch + (height - ch) / 2, 0);

    var tree = new THREE.Group();
    if(Truck !== undefined && Truck !== null)
        tree.add(Truck);
    if(Lcrown !== undefined && Lcrown !== null)
        tree.add(Lcrown);
    if(Ucrown !== undefined && Ucrown !== null)
        tree.add(Ucrown);

    return tree;
}

function createForest() {

    var foreData = foreDataset4[0];

    for (var i = 0; i < foreData.ID.length; i++) {
        // var dbh = Math.floor(Math.random()*2)/10+0.15;
        // var height = Math.floor(Math.random()*5)+7;
        // var cw = Math.floor(Math.random()*2) + 2.5;
        // var ch = Math.floor(Math.random()*2) + 3;
        // var ubh = Math.floor(Math.random()*2) + 3;
        // var x = Math.floor(Math.random()*100)-50;
        // var y = Math.floor(Math.random()*100)-50;
        if (!(foreData.CH[i] > foreData.UBH[i])) {
            foreData.CH[i] = foreData.UBH[i];
        }
        var tree = createTree(foreData.DBH[i]/100, foreData.Height[i], foreData.CW[i], foreData.CH[i], foreData.UBH[i]);
        tree.position.set(foreData.X[i], 0, foreData.Y[i]);
        // var tree = createTree(dbh, height, cw, ch, ubh);
        // tree.position.set(x,0,y);
        scene.add(tree);
    }
}
