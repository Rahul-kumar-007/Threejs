import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui"
const MyThreeJSComponent = () => {
  useEffect(() => {
    let scene, camera, renderer, box, orbit;

    const init = () => {
      // Camera
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(-10,2,5)

      // Renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // orbit control camera
      orbit = new OrbitControls(camera, renderer.domElement);
      orbit.update();

      // Scene
      scene = new THREE.Scene();

      // Handle window resize
      window.addEventListener('resize', handleResize);

      // Create the box
      const boxGeometry = new THREE.BoxGeometry();   // its  the box skeleton 
      const boxMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });  // neet light to appear on the object so , it add the skin to the object
      box = new THREE.Mesh(boxGeometry, boxMaterial); //  it is the fusion of the grometry - it can be any think ,line cide , triangle or animation cretaed by any any other 3d software
      scene.add(box);

      //Create a  plane 
      const planegeometry=new THREE.PlaneGeometry(30,30)
      const planeMaterial=new THREE.MeshBasicMaterial({color:"white",side:THREE.DoubleSide})//side:THREE.DoubleSide meanns if  the user move the plane , it do not get disappear form other side 
      const plane=new THREE.Mesh(planegeometry,planeMaterial)
      scene.add(plane)

      // to rotate the plane geomatry , so that we allign it with the grid 
      plane.rotation.x=-0.5*Math.PI;


      // Adding the sphere to the scene e

      const sphereGeometry=new THREE.SphereGeometry(4)
      const sphereMaterial=new THREE.MeshBasicMaterial({color:"skyblue",wireframe:false});//wireframe:true  : means it will show the wired sekeleton of  the sphere .
      //const sphereMaterial=new THREE.MeshStandardMaterial({color:"gray",wireframe:false});//wireframe:true  : means it will show the wired sekeleton of  the sphere .
      //const sphereMaterial=new THREE.MeshLambertMaterial({color:"gray",wireframe:false});//wireframe:true  : means it will show the wired sekeleton of  the sphere .
      const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
      scene.add(sphere)


//sphere.position.x=-10;// or instead of this , we set posiotion as below for all axis
sphere.position.set(-10,10,0)

// addung the dat.gui for the sphere
const gui=new dat.GUI();
const options={
  sphereColor :"#ffea00",
  wireframe:false,
  speed:0.01
};
// adding change color setting with dat.gui
gui.addColor(options,'sphereColor').onChange(function(color){
  sphere.material.color.set(color)
});

// adding change wireframe setting with dat.gui
gui.add(options,'wireframe').onChange(function(e){
  sphere.material.wireframe=e;
});
// adding some variable to make sphere bounce
let step=0;
//let speed=0.01;instead of adding it as a varaible we will add it to the gui control , so that we can contol it 
gui.add(options,'speed',0,0.1);//here 0 is minimum speed and 0.1 is maximum speed
function sphereAniamtion(){
    // Your rendering logic goes here
      // e.g., updating scene objects, animations, etc.
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

    
      // bounce controp sphere
// step+=speed; since now due to gui control , the speed in option is updating , spo we will use that.
step+=options.speed
      // Update controls
      orbit.update();

      sphere.position.y=10*Math.abs(Math.sin(step))
      

      // Render the scene
      renderer.render(scene, camera);

}



      // adding a grid helper to , so that we can see the grid on the plane geometry we created 
    const gridHelper=new THREE.GridHelper(30,100)// here 100 means 100 grids
    scene.add(gridHelper)

      // Start animation loop box
      renderer.setAnimationLoop(animation);
      // animate the sphere 
      renderer.setAnimationLoop(sphereAniamtion)
    };

    

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update camera aspect ratio and renderer size
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const animation = (time) => {
      // Your rendering logic goes here
      // e.g., updating scene objects, animations, etc.
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // Move your rendering logic to this function
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      // Update controls
      orbit.update();

      
      

      // Render the scene
      renderer.render(scene, camera);
    };

    // Initialize on mount
    init();

    // Cleanup function to remove event listener and renderer on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return <div id="threeCanvas" />;
};

export default MyThreeJSComponent;
