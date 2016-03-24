var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('background').appendChild( renderer.domElement );

var roadHalfSize = 2;
var grassHalfSize = 15;

var roadSegments = new Road(roadHalfSize);
roadSegments.init();
var leftGrass = new Grass(grassHalfSize);
leftGrass.init();
var rightGrass = new Grass(grassHalfSize);
rightGrass.init();
var sun = new Sun();
var car = new Car();
leftGrass.translateX(-grassHalfSize-roadHalfSize);
rightGrass.translateX(grassHalfSize+roadHalfSize);

//var skybox = createSkybox();

roadSegments.addToScene(scene);
leftGrass.addToScene(scene);
rightGrass.addToScene(scene);
scene.add( sun.directionalLight );
car.headLights.forEach(function(light){
    scene.add( light );
    scene.add( light.target );

});

//scene.add( skybox );
var availableCars = ['White', 'Purple', 'Red', 'Blue'];
var selectedCar = availableCars[Math.floor(Math.random()*4)];
var objSprite = new Sprite(TopGear.Car[selectedCar].straight);
var sprite = objSprite.getSprite();
sprite.scale.y = 0.7;
sprite.position.y = 1;
sprite.position.z = 2.5;
scene.add( sprite );

scene.fog = new THREE.Fog(0x222222, 1, 15);
renderer.setClearColor( scene.fog.color );

camera.position.z = 1;
camera.position.y = 2;

camera.lookAt(new THREE.Vector3(0,0,10));

var render = function () {
	requestAnimationFrame( render );

	roadSegments.render();
        leftGrass.render();
        rightGrass.render();
	renderer.render(scene, camera);
        objSprite.render();
};

var resizeRenderer = function() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //requestAnimationFrame( render );
}

window.addEventListener('resize', resizeRenderer, false);

requestAnimationFrame( render );
