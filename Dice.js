const scene = new THREE.Scene();
var camera,renderer;
scene.background = new THREE.Color(0x000000);
let x =1;
let y =0;
let z= 0;
function init()
{

    console.log("init reached");
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*.9, window.innerHeight*.9);
    let candiv = document.getElementById("CanvasContainer");
    renderer.domElement.id = "Renderer";
    candiv.style.width=window.innerWidth*.9;
    candiv.style.Height=window.innerWidth*.9;
    candiv.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, -10, -3); // x, y, z
    scene.add(directionalLight);

    const width = 10;
    const height = width * (window.innerHeight / window.innerWidth);
    camera = new THREE.OrthographicCamera(
    width / -1, // left
    width / 1, // right
    height / 1, // top
    height / -1, // bottom
    1, // near
    100 // far
    );
    camera.position.set(0, 0, -10);
    camera.lookAt(1, 1, 0);
    


    let D1 = NewDie(1,2,3,4,5,6);
    console.log(D1);
    AddDie();
}

function NewDie(s1,s2,s3,s4,s5,s6)
{
    var die = [s1,s2,s3,s4,s5,s6]
    return die;
    
}
function AddDie()
{
    let Die = NewDie(1,2,3,4,5,6);
    const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    x=getRandomInt(-10,10);
    y= getRandomInt(-3,3);
    console.log("X: "+x+"Y: "+y)
    scene.add(mesh);
}
var animate = function () 
{
    console.log("animate reached");
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var button = document.getElementById("start")
button.addEventListener("click",init);
var button1 = document.getElementById("Add")
button1.addEventListener("click",AddDie);
init();
animate();