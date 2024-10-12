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
footstep.src = '../assets/footstep.wav';
const death=new Image();
death.src='../assets/death.png'
const fall=new Image();
fall.src='../assets/fall.png'
const fallL=new Image();
fallL.src='../assets/fallL.png'
const backG=new Image();
backG.src='../assets/background.png'

const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1;

class sprite1{
  constructor({position,imageSrc}){
    this.position=position;
    this.image=new Image();
    this.image.src=imageSrc;
  }
  draw(){
    if(!this.image) return
    c.drawImage(this.image,this.position.x,this.position.y);
  }
  update(){
    this.draw()
  }
}

class Player {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.width = 78;
    this.height = 90;
    this.frames = 0;
    this.frameInterval = 5;
    this.frameCount = 0;
    this.isJumping = false;
    this.isFalling=false;
    this.direction = 'right';
    this.isAttacking = false;
    this.attackFrames = 0;
    this.attackDuration = 50; 
    this.isDead=false;
    


    this.sprites = {
      stand: {
        right: createImg(idleR),
        cropWidth: 39,
        cropHeight: 45,
        frameCount: 9,
        left: createImg(idleL),
      },
      run: {
        right: createImg(runR),
        cropWidth: 54,
        frameCount: 6,
        left: createImg(runL),
      },
      jump: {
        right: createImg(jumpR),
        cropWidth: 54,

        frameCount: 1,
        left: createImg(jumpL),
      },
      attack: {
        right: createImg(attack1R),
        cropWidth: 162,
        frameCount: 6,

        left: createImg(attack1L),
      },
      death:{
        right: createImg(death),
       frameCount:6,
       cropWidth:67,
      },
      fall:{
        right:createImg(fall),
        cropHeight:66,
        left:createImg(fallL),
      }
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropHeight = this.sprites.stand.cropHeight;
    this.currentCropWidth = this.sprites.stand.cropWidth;
    this.currentframeCount = this.sprites.stand.frameCount;
  }

  draw() {
    const frameX = 162 * this.frames;
    c.drawImage(
      this.currentSprite,
      frameX, 0, this.currentCropWidth, this.currentCropHeight,
      this.position.x, this.position.y,
      this.width, this.height
    );
  }

  update() {
    this.frameCount++;
    if (this.frameCount % this.frameInterval === 0) {
      this.frames++;
      if (this.frames > this.currentframeCount) {
        this.frames = 0;
      }
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
      this.isJumping = false;
    }

    if(this.velocity.y>0){
      this.isJumping=false;
      this.isFalling=true;
    }else if(this.velocity.y===0){
      this.isFalling=false;
    }


    if (this.isJumping) {
      this.currentSprite = this.direction === 'left' ? this.sprites.jump.left : this.sprites.jump.right;
      this.currentCropWidth = this.sprites.jump.cropWidth;
      this.currentframeCount = this.sprites.jump.frameCount;
      

    } 
    else if(this.isFalling){
      this.currentSprite = this.direction === 'left' ? this.sprites.fall.left : this.sprites.fall.right;
      this.currentframeCount=2;
this.currentCropHeight=this.sprites.fall.cropHeight;
    }

    else if (this.isAttacking) {
      console.log(this.attackFrames);
      this.attackFrames++;
      if (this.attackFrames > this.attackDuration) {
        this.isAttacking = false; 
        this.attackFrames = 0; 
      }
      this.currentSprite = this.direction === 'left' ? this.sprites.attack.left : this.sprites.attack.right; 
           this.currentCropHeight = 101;
      this.currentCropWidth = this.sprites.attack.cropWidth;
this.position.y = innerHeight-200;
      this.width = 266;
      this.height = 202;
    } 
    else if(this.isDead){
      this.currentSprite=this.sprites.death.right;
      this.currentCropWidth=this.sprites.death.cropWidth;
      this.width=127;
      this.currentframeCount=this.sprites.death.frameCount;

    }

    else if (this.velocity.x !== 0) {
      this.direction = this.velocity.x < 0 ? 'left' : 'right';
      this.currentSprite = this.direction === 'left' ? this.sprites.run.left : this.sprites.run.right;
      this.currentCropWidth = this.sprites.run.cropWidth;
      this.currentframeCount = this.sprites.run.frameCount;
      this.currentCropHeight = this.sprites.stand.cropHeight;
      
      this.width = 78;
      this.height = 90;
    } else {
      this.currentSprite = this.direction === 'left' ? this.sprites.stand.left : this.sprites.stand.right;
      this.currentCropWidth = this.sprites.stand.cropWidth;
      this.currentCropHeight = this.sprites.stand.cropHeight;

      this.currentframeCount = this.sprites.stand.frameCount;
      this.width = 78;
      this.height = 90;

    }



    
    


    this.draw();
  }
}

function createImg(imageSrc) {
  const image = new Image();
  image.src = imageSrc.src;
  return image;
}
const background=new sprite1({
  position:{
    x:0,
    y:0
  },
  
  imageSrc:backG.src}
);

let player1 = new Player();

function animate() {

  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.scale(4,4);
  background.update();
  c.restore();
  player1.update();
}
backG.onload = () => {
  
  animate();
};

function keydown(e) {
  switch (e.keyCode) {
    case 65:
      if(!player1.isAttacking)
      player1.velocity.x = -5;
      break;
    case 68:
      if(!player1.isAttacking)
      player1.velocity.x = 5;


      break;
    case 87:
      if(player1.velocity.y===0)
      if (!player1.isJumping) {
        player1.velocity.y -= 20;
        player1.isJumping = true;
      }
      break;
    case 81:
      if
      (player1.velocity.x === 0)
      player1.isAttacking = true;
      break;

      case 67:
        player1.isDead=true;
        break;



  }
}

function keyup(e) {
  switch (e.keyCode) {
    case 65:
    case 68:
      player1.velocity.x = 0;
      break;
    case 87:
     
      break;

    case 81:
      


      break;
      case 67:
        player1.isDead=false;
        break;
  }
}

addEventListener('keydown', keydown);
addEventListener('keyup', keyup);
