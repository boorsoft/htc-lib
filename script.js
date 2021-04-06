var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var bookColor = Math.random() * 0xFFFFFF;
var bgColor = Math.random() * 0xFF0000;

// Scene
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(bgColor, 0.00025);
scene.background = new THREE.Color(bgColor);

// Camera & Renderer
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

var mouseX = 0, mouseY = 0;

// Lights
var spotlight = new THREE.SpotLight(0xffdcbc, 0.7);
spotlight.castShadow = true;
spotlight.shadow.bias = 0.001;
spotlight.shadow.mapSize.width = 1024*4;
spotlight.shadow.mapSize.height = 1024*4;
spotlight.angle = Math.PI / 2.2;
spotlight.distance = 14300;
scene.add(spotlight);

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6);
hemiLight.color.set(0xffdbd1);
hemiLight.groundColor.set(0xffbdb1);
hemiLight.position.set(0, 1000, 4000);
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
dirLight.position.set(-200, 10000, -10000);
dirLight.castShadow = true;
dirLight.shadow.bias = -0.0001;
dirLight.shadow.darkness = 0.45;
dirLight.shadow.mapSize.width = 1024*4;
dirLight.shadow.mapSize.height = 1024*4;
scene.add(dirLight);

// Objects/Geometries/Materials
var objects = [];

var objectsGroup = new THREE.Group();

var loader = new THREE.OBJLoader();

var mtlLoader = new THREE.MTLLoader();

loadModel('3Dmodels/book_easy.obj', '3Dmodels/book_easy.mtl', 40, 0);
loadModel('3Dmodels/карандаш.obj', '3Dmodels/карандаш.mtl', 13, 2);
loadModel('3Dmodels/часы.obj', '3Dmodels/часы.mtl', 10, 0, 2);
loadModel('3Dmodels/pen.obj', '3Dmodels/pen.mtl', 12, 2);

objectsGroup.position.y = -200;
objectsGroup.castShadow = true;
scene.add(objectsGroup);

camera.position.y = objectsGroup.position.y + 2800;
camera.position.x = objectsGroup.position.x + 2800;
camera.position.z = 3020;

var groundGeometry = new THREE.PlaneGeometry(50000, 50000);
var groundMaterial = new THREE.MeshLambertMaterial({color: 0xD5D5D5, side: THREE.DoubleSide});
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.set(0, -2000, 0);
ground.receiveShadow = true;
ground.rotation.x = - Math.PI / 2;
// scene.add(ground);

// Animation function
function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);    

    spotlight.position.set(
        camera.position.x + 5,
        camera.position.y + 45,
        camera.position.z + 100
    );   

    camera.position.x += (mouseX - camera.position.x + 500) * 0.05;
    camera.position.y += (mouseY - camera.position.y + 1800) * 0.05;
    camera.lookAt(scene.position.x + 1600, scene.position.y, scene.position.z);

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

          object.receiveShadow = true;
          object.castShadow = true;
        
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

          object.position.x = Math.random() * 3000;
          object.position.y = Math.random() * 2600;
          object.position.z = Math.random() * 2900;

          object.rotation.x = Math.random() * Math.PI * 2;
          object.rotation.y = Math.random() * Math.PI * 2;
          object.rotation.z = Math.random() * Math.PI * 2;

          object.scale.set(20, 20, 20);
          object.matrixAutoUpdate = true;
          objectsGroup.add(object);
          objects.push(object);
        });
      }
    })
}

// Рандомные цвета для фона (для мобильных устройств)
const body = document.querySelector('body')
body.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}`