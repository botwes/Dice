const scene = new THREE.Scene();
let snum = 0;
let nroll = 100;
var camera,renderer;
let meshes = [];
let Dice = [[]];
let results = [];
let totroll= 0;
scene.background = new THREE.Color(0x000000);
let x =0;
let y =0;
let z= 0;
function init()
{

    console.log("init reached");
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth*.95, window.innerHeight*.95);
    let candiv = document.getElementById("CanvasContainer");
    renderer.domElement.id = "Renderer";
    candiv.style.width=window.innerWidth*.95;
    candiv.style.Height=window.innerWidth*.95;
    candiv.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 5, -15); // x, y, z
    scene.add(directionalLight);

    const width = 10;
    const height = width * (window.innerHeight*.95 / window.innerWidth*.95);
    camera = new THREE.OrthographicCamera(
    width / -1, // left
    width / 1, // right
    height / 1, // top
    height / -1, // bottom
    1, // near
    200 // far
    );
    camera.position.set(0, 0, -10);
    camera.lookAt(0,0, 0);
    
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
    Dice.push(Die);
    const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    console.log("X: "+x+" Y: "+y)
    scene.add(mesh);
    meshes.push(mesh);
    x=getRandomInt(-9,9);
    y= getRandomInt(-3,3);
    console.log(Dice);
}
function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var animate = function () 
{
    console.log("animate reached");
    let score = document.getElementById("Score")
    score.innerHTML = "Score: "+snum;
    for(var i=0;i<meshes.length;i++)
    {
        meshes[i].rotation.x = Date.now() * 0.0005 * (1+i);
        meshes[i].rotation.y = Date.now() * 0.001 * (1+i);
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
function Roll()
{
    let outStr = "Roll results: ";
    for(var ctr=1;ctr<Dice.length;ctr++)
    {
        results.push(Dice[ctr][getRandomInt(0,Dice[ctr].length-1)]);    
    }
    for(var i=0;i<results.length;i++)
    {
        totroll+=results[i];
        if(i==0&&results.length==1)
        {
            outStr+=results[i];
        }
        else if(i==results.length-1)
        {
            outStr+=results[i];
        }
        else
        {
            outStr+=results[i]+", ";
        }
       
    }
    outStr+="\nTotal: "+totroll;
    snum+=totroll;
    results.length=0;
    totroll=0;
    nroll--;
    const roller = document.getElementById("Rolls");
    roller.innerHTML ="Rolls: "+nroll;
    console.log(outStr);
}
//var button = document.getElementById("start")
//button.addEventListener("click",init);
let button1 = document.getElementById("Add");
button1.addEventListener("click",AddDie);
let rb = document.getElementById("Roll");
rb.addEventListener("click",Roll);
init();
animate();