const canvas = document.querySelector('canvas');
const idleR=new Image();
idleR.src='../assets/Idle.png';


const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor() {
      this.position = { x: 100, y: 100 }
      this.velocity = { x: 0, y:0 }
      this.width = 78;
      this.height = 90;
      this.image=createImg(idleR);
      this.frames=0;
 
    }

    draw(){
      const frameX =162 * this.frames;
      c.drawImage(
        this.image,
        frameX, 0, 39, 45,
        this.position.x, this.position.y,
        this.width, this.height);
    }
    update() {
      this.frames++;
      if(this.frames>9){
        this.frames=0}
      this.draw();}
}
function createImg(imageSrc){
  const image = new Image();
  image.src = imageSrc.src;
  return image;
}



let player1=new Player();
player1.draw();

function animate() {
  
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

 
  player1.update();
 
}
animate();