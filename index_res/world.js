/*
 * http://www.html5rocks.com/en/tutorials/webgl/million_letters/?redirect_from_locale=pt
 * http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/
*/

//Hack
//THREE.ImageUtils.crossOrigin = '';

var createSkybox = function() {
	var urlPrefix = "skybox/";
	var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
    urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
    urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
	var textureCube = THREE.ImageUtils.loadTextureCube( urls );
	var shader = THREE.ShaderLib["cube"];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
	uniforms['tCube'].value = textureCube;   // textureCube has been init before
	var material = new THREE.ShaderMaterial({
		fragmentShader    : shader.fragmentShader,
		vertexShader  : shader.vertexShader,
		uniforms  : uniforms,
		side: THREE.DoubleSide
	});
// build the skybox Mesh 
skyboxMesh    = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100, 1, 1, 1, null, true ), material );

return skyboxMesh;
}
function ScrollingPath(HalfSize) {
        this.highColor = 0x2c2f2e;
        this.lowColor = 0x282b2a;
        this.roadHalfSize = HalfSize;
	this.init = function() {
		this.movementCount = 0;
		this.segmentSize = 0.25;
		this.roadLength = 25;
		this.groupSegments = this.createSegments();
		this.dbgTranslate = 0;
		return this.groupSegments;
	};
        this.getSegments = function() {
            return this.groupSegments;
        };
	this.createSegments = function() {
		var roadGeometry = new THREE.BoxGeometry( this.roadHalfSize*2, 1, this.segmentSize );
		
		var templateRoad1 = roadGeometry.clone();
		var templateRoad2 = roadGeometry.clone();
		
		var halfRoadLength = this.roadLength / (2 * this.segmentSize);
		//var segments = [];
		var group1 = new THREE.Geometry();
                var group2 = new THREE.Geometry();
		for (var i=0; i< halfRoadLength; ++i) {
			var road1 = templateRoad1.clone();
			var road2 = templateRoad2.clone();
			road1.translate(0,0,i*2*this.segmentSize);
			road2.translate(0,0,i*2*this.segmentSize+this.segmentSize);
			group1.merge(road1);
			group2.merge(road2);
		}
		return [group1, group2];
	};
	this.render = function() {
		var translateZvalue = -0.0625;
		this.movementCount += translateZvalue;
		if (this.movementCount <= -this.segmentSize*2) {
			this.movementCount = 0;
			translateZvalue = 2*this.segmentSize-this.dbgTranslate; //dbgTranslate ajusta a posicao
			//console.log('Translate z: ' + (this.dbgTranslate + translateZvalue));
		}
		this.dbgTranslate += translateZvalue;
		
			this.groupSegments[0].translate(0,0,translateZvalue);
                        this.groupSegments[1].translate(0,0,translateZvalue);
	};
        this.translateX = function(xVal) {
            this.groupSegments[0].translate(xVal,0,0);
            this.groupSegments[1].translate(xVal,0,0);
        };
        this.addToScene = function(scene) {
            var roadMaterial1 = new THREE.MeshPhongMaterial( { color: this.lowColor, shading: THREE.FlatShading, overdraw: 0.5, shininess: 0 } );
		var roadMaterial2 = new THREE.MeshPhongMaterial( { color: this.highColor, shading: THREE.FlatShading, overdraw: 0.5, shininess: 0 } );
            scene.add(new THREE.Mesh(this.groupSegments[0], roadMaterial1));
            scene.add(new THREE.Mesh(this.groupSegments[1], roadMaterial2));
        };
};
function Road(HalfSize) {
    this.roadHalfSize = HalfSize;
};
Road.prototype = new ScrollingPath();
function Grass(HalfSize) {
    this.highColor = 0x04600d;
    this.lowColor = 0x005c09;
    this.roadHalfSize = HalfSize;
};
Grass.prototype = new ScrollingPath();

function Sun() {
    this.directionalLight = new THREE.DirectionalLight( 0x111111 );
    this.directionalLight.position.set(0, 1, 1).normalize();
};

function Car() {
    this.createHeadLights = function() {
        var headLightLeft = new THREE.SpotLight(0xffffff, 50, 10, 0.5, 2);
        headLightLeft.position.set(0.2,1,2.5);
        headLightLeft.target.position.set(0,0,50);
        var headLightRight = headLightLeft.clone();
        headLightRight.position.x = -0.2;
        this.headLights = [headLightLeft, headLightRight];
    };
    this.createHeadLights();
}