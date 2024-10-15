const canvas = document.querySelector('canvas');
const idleR = new Image();
idleR.src = '../assets/Idle.png';
const runR = new Image();
runR.src = '../assets/RunR.png';
const idleL = new Image();
idleL.src = '../assets/IdleL.png';
const runL = new Image();
runL.src = '../assets/RunL.png';
const jumpR = new Image();
jumpR.src = '../assets/jump.png';
const jumpL = new Image();
jumpL.src = '../assets/jumpL.png';
const attack1R = new Image();
attack1R.src = '../assets/Attack3L.png'
const attack1L = new Image();
attack1L.src = '../assets/Attack4.png'
const footstep = new Audio();
footstep.src = '../assets/footsteps1.mp3';
const death = new Image();
death.src = '../assets/death.png'
const fall = new Image();
fall.src = '../assets/fall.png'
const fallL = new Image();
fallL.src = '../assets/fallL.png'
const backG = new Image();
backG.src = '../assets/background2.png'
const backMusic=new Audio();
backMusic.src='../assets/backmusic.mp3'
const diamond = new Image(); 
diamond.src = '../assets/diamond.png'


const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const scaledCanvas = {
  width: canvas.width / 3.5,
  height: canvas.height / 3.5
}

const floorCollisions2D = []

for (let i = 0; i < floorCollisions.length; i += 90) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 90));
}
const collisionBlocks = [];

floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1621) {
      collisionBlocks.push(new collisionBlock({
        position: { x: x * 16, y: y * 16 }
      }))
    }
   
  })
})




const gravity = 1/8.25;



function createImg(imageSrc) {
  const image = new Image();
  image.src = imageSrc.src;
  return image;
}
const background = new sprite1({
  position: {
    x: 0,
    y: 0
  },

  imageSrc: backG.src
}
);



const player1 = new Player({
  position: { x: 100, y:0 },


  collisionBlocks,


});

const camera={
position:{
  x:-71,y:30
}
}
function restart(){

  camera.position.x=-71;
  camera.position.y=30;
  player1.position = { x: 100, y: 0 }; 
  player1.velocity = { x: 0, y: 0 };
  player1.isJumping = false;
  player1.isFalling = false;
  player1.isAttacking = false;
  player1.isRunningJump = false;
  player1.isDead = false;
  player1.frames = 0;
  player1.frameCount = 0;

 
}

function animate() {

  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();

  c.scale(4.55, 4.25);

  c.translate(camera.position.x-50, camera.position.y-50);
 


  background.update();
  c.scale(2, 2);
  
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.update();
  });
  player1.update();
  
player1.shouldPanLeft({canvas,camera});
player1.shouldPanRight({canvas,camera});
player1.shouldPanDown({canvas,camera});
player1.shouldPanUp({canvas,camera});

  c.restore();



  if(player1.isDead){
    restart();
  }


  
}


backG.onload = () => {

backMusic.loop=true;
backMusic.volume=0.3;
backMusic.play();




  animate();
};



function keydown(e) {
  switch (e.keyCode) {
    case 65:
      if (!player1.isAttacking)
        player1.velocity.x = -5/9.1;
      footstep.loop = true;
      

      footstep.play();
      break;
    case 68:
      if (!player1.isAttacking)
        player1.velocity.x = 5/9.1;
        if(!player1.isJumping){
        
      footstep.loop = true;
    

      footstep.play();
        }

      


      break;
    case 87:
      if (player1.velocity.y === 0)
        if (!player1.isJumping) {
      
          player1.velocity.y -=25/8.25;
          player1.isJumping = true;
          if (player1.velocity.x !== 0) {
            
            player1.velocity.x *= 2.2; 
            player1.isRunningJump = true;
          }
         
       
        }
      break;
    case 81:
      if
        (player1.velocity.x === 0)
        player1.isAttacking = true;
      break;


  }
}

function keyup(e) {
  switch (e.keyCode) {
    case 65:
      footstep.pause();
    case 68:
      player1.velocity.x = 0;
      footstep.pause();
      break;
    case 87:

      break;

    case 81:



      break;
    case 67:
      player1.isDead = false;
      break;
  }
}

addEventListener('keydown', keydown);
addEventListener('keyup', keyup);










