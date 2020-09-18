var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var bookColor = Math.random() * 0xFFFFFF;
var bgColor = Math.random() * 0xFF0000;

// Scene
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(bgColor, 0.00035);
scene.background = new THREE.Color(bgColor);

// Camera & Renderer
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.toneMappingExposure = 5.0;
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var mouseX = 0, mouseY = 0;

// Lights
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0x88cef7, 1);
scene.add(directionalLight);

var spotlight = new THREE.SpotLight(0xc1e0e3, 1.1);
spotlight.castShadow = true;
spotlight.shadow.bias = -0.0001;
spotlight.shadow.mapSize.width = 1024*4;
spotlight.shadow.mapSize.height = 1024*4;
scene.add(spotlight);

// Objects/Geometries/Materials
var objects = [];

var objectsGroup = new THREE.Group();

var loader = new THREE.OBJLoader();

var mtlLoader = new THREE.MTLLoader();

loadModel('3Dmodels/book_easy.obj', '3Dmodels/book_easy.mtl', 40, 0);
loadModel('3Dmodels/карандаш.obj', '3Dmodels/карандаш.mtl', 13, 2);
loadModel('3Dmodels/часы.obj', '3Dmodels/часы.mtl', 10, 0, 2);
loadModel('3Dmodels/pen.obj', '3Dmodels/pen.mtl', 12, 2);

objectsGroup.position.y = -1000;
scene.add(objectsGroup);

camera.position.y = objectsGroup.position.y + 2500;
camera.position.x = objectsGroup.position.x + 5500;
camera.position.z = 3020;

// Animation function
function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);    

    spotlight.position.set(
        camera.position.x + 5,
        camera.position.y + 5,
        camera.position.z + 5
    );   

    // camera.rotation.y += -(mouseX) * 0.00001;
    // camera.rotation.x += -(mouseY) * 0.00001;
    camera.position.x += (mouseX - camera.position.x + 500) * 0.05;
    camera.position.y += (mouseY - camera.position.y + 1500) * 0.05;
    camera.lookAt(scene.position.x + 1500, scene.position.y, scene.position.z);

    objects.forEach((el) => {
        el.rotation.x += (mouseX - el.rotation.x) * 0.005 / 1000;
        el.rotation.y += (mouseY - el.rotation.y) * 0.005 / 1000;
    });
}

function onMouseMove(e) {
    mouseX = (e.clientX - windowHalfX) * 2;
    mouseY = (e.clientY - windowHalfY) * 2;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('mousemove', onMouseMove, false);

window.addEventListener('resize', onWindowResize, false);
render();   

// Function to load models
function loadModel(obj_path, mtl_path, amount, matIndex, matIndex2 = null) {
  mtlLoader.load(mtl_path, (materials) => {
      console.log('loaded')
      materials.preload();

      for (let i = 0; i < amount; i++) {
        loader.setMaterials(materials);
        loader.load(obj_path, (object) => {

          var customMat = new THREE.MeshPhongMaterial({color: Math.random() * 0xFF0000});
          customMat.castShadow = true;
          customMat.receiveShadow = true;
        
          object.traverse(n => {
            if(n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                n.material[matIndex] = customMat;
                if(matIndex2) {
                  n.material[matIndex2].opacity = 0.6;
                  n.material[matIndex2].transparent = true;
                }
                if(n.material.map) n.material.map.anisotropy = 16;
            }
          })

          object.position.x = Math.random() * 2600 + 150;
          object.position.y = Math.random() * 3000 + 150;
          object.position.z = Math.random() * 2900 + 100;

          object.rotation.x = Math.random() * Math.PI * 2;
          object.rotation.y = Math.random() * Math.PI * 2;
          object.rotation.z = Math.random() * Math.PI * 2;

          object.scale.set(20, 20, 20);
          objectsGroup.add(object);
          objects.push(object);
        });
      }
    });
}