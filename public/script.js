var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var bookColor = Math.random() * 0xFFFFFF;
var bgColor = Math.random() * 0xFF0000;

var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(bgColor, 0.0007);
scene.background = new THREE.Color(bgColor);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var mouseX = 0, mouseY = 0;

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(bgColor, 1);
scene.add(directionalLight);

var spotlight = new THREE.SpotLight(0xc1e0e3, 1.1);
spotlight.castShadow = true;
spotlight.shadow.bias = -0.0001;
spotlight.shadow.mapSize.width = 1024*4;
spotlight.shadow.mapSize.height = 1024*4;
scene.add(spotlight);

var books = [];

var boxGeometry = new THREE.BoxGeometry(35, 35, 35);
var boxMaterial = new THREE.MeshLambertMaterial({color: bookColor});

var booksGroup = new THREE.Group();

var loader = new THREE.OBJLoader();

var mtlLoader = new THREE.MTLLoader();


    // var cube = new THREE.Mesh(boxGeometry, boxMaterial);

    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // cube.position.x = Math.random() * 2000 - 1000;
    // cube.position.y = Math.random() * 2000 - 1000;
    // cube.position.z = Math.random() * 2000 - 500;

    // cube.rotation.x = Math.random() * Math.PI * 2;
    // cube.rotation.y = Math.random() * Math.PI * 2;
    // cube.add(light);

    // boxGroup.add(cube);
    // cubes.push(cube); 

    mtlLoader.load('/3Dmodels/book_easy.mtl', (materials) => {
      console.log('loaded')
      materials.preload();

      for (let i = 0; i < 250; i++) {
        loader.setMaterials(materials);
        loader.load('/3Dmodels/book_easy.obj', (object) => {

          var bookMat = new THREE.MeshPhongMaterial({color: Math.random() * 0x333333});
          bookMat.castShadow = true;
          bookMat.receiveShadow = true;

          object.traverse(n => {
            if(n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                n.material[0] = bookMat;
                if(n.material.map) n.material.map.anisotropy = 16;
            }
          })

          object.position.x = Math.random() * 2500 - 1000;
          object.position.y = Math.random() * 2800 - 1000;
          object.position.z = Math.random() * 2500 - 500;

          object.rotation.x = Math.random() * Math.PI * 2;
          object.rotation.y = Math.random() * Math.PI * 2;
          object.rotation.z = Math.random() * Math.PI * 2;

          object.scale.set(5, 5, 5);
          booksGroup.add(object);
          books.push(object);
        });
      }
    });

scene.add(booksGroup);
booksGroup.position.y = -100;
booksGroup.position.x = -100;

camera.position.z = 2020;

function render() {
    requestAnimationFrame(render);

    renderer.render(scene, camera);    

    spotlight.position.set(
        camera.position.x + 5,
        camera.position.y + 5,
        camera.position.z + 5
    );   

    camera.position.z -= (mouseY - camera.position.y) * 0.001;
    camera.lookAt(scene.position);
    booksGroup.rotation.y += (mouseY - booksGroup.rotation.y) * 0.001 / 1000;
    booksGroup.rotation.x += (mouseX - booksGroup.rotation.x) * 0.001 / 1000;

    books.forEach((el) => {
        el.rotation.x += (mouseX - el.rotation.x) * 0.01 / 1000;
        el.rotation.y += (mouseY - el.rotation.y) * 0.01 / 1000;
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