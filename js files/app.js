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
attack1R.src = '../assets/Attack4.png'
const footstep = new Audio();
footstep.src = '../assets/footstep.wav';

const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1;

class Player {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.width = 78;
    this.height = 90;
    this.frames = 0;
    this.frameInterval = 4;
    this.frameCount = 0;
    this.isJumping = false;
    this.direction = 'right';
    this.isAttacking = false;


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


    if (this.isJumping) {
      this.currentSprite = this.direction === 'left' ? this.sprites.jump.left : this.sprites.jump.right;
      this.currentCropWidth = this.sprites.jump.cropWidth;
      this.currentframeCount = this.sprites.jump.frameCount;
      

    } else if (this.velocity.x !== 0) {
      this.direction = this.velocity.x < 0 ? 'left' : 'right';
      this.currentSprite = this.direction === 'left' ? this.sprites.run.left : this.sprites.run.right;
      this.currentCropWidth = this.sprites.run.cropWidth;
      this.currentframeCount = this.sprites.run.frameCount;
    } else {
      this.currentSprite = this.direction === 'left' ? this.sprites.stand.left : this.sprites.stand.right;
      this.currentCropWidth = this.sprites.stand.cropWidth;

      this.currentframeCount = this.sprites.stand.frameCount;

    }



    if (this.isAttacking) {
      this.currentSprite = this.sprites.attack.right;
      this.currentCropHeight = 101;
      this.currentCropWidth = this.sprites.attack.cropWidth;

      this.width = 133;
      this.height = 101;
    } else if (this.velocity.x !== 0) {
      this.direction = this.velocity.x < 0 ? 'left' : 'right';
      this.currentSprite = this.direction === 'left' ? this.sprites.run.left : this.sprites.run.right;
      this.currentCropWidth = this.sprites.run.cropWidth;


      this.currentframeCount = this.sprites.run.frameCount;
    } else {
      this.currentSprite = this.direction === 'left' ? this.sprites.stand.left : this.sprites.stand.right;
      this.currentCropWidth = this.sprites.stand.cropWidth;




      this.currentframeCount = this.sprites.stand.frameCount;

    }

    this.draw();
  }
}

function createImg(imageSrc) {
  const image = new Image();
  image.src = imageSrc.src;
  return image;
}

let player1 = new Player();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player1.update();
}
animate();

function keydown(e) {
  switch (e.keyCode) {
    case 65:
      player1.velocity.x = -5;
      break;
    case 68:
      player1.velocity.x = 5;


      break;
    case 87:
      if (!player1.isJumping) {
        player1.velocity.y -= 20;
        player1.isJumping = true;
      }
      break;
    case 81:
      player1.isAttacking = true;
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
      // player1.isJumping = false;
      break;

    case 81:
      player1.isAttacking = false;


      break;
  }
}

addEventListener('keydown', keydown);
addEventListener('keyup', keyup);
