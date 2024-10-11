const canvas = document.querySelector('canvas');
const idleR=new Image();
idleR.src='../assets/Idle.png';
const runR=new Image();
runR.src='../assets/RunR.png';
const idleL=new Image();
idleL.src='../assets/IdleL.png';
const runL=new Image();
runL.src='../assets/RunL.png';


const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;


const gravity =1 ;

class Player {
    constructor() {
      this.position = { x: 100, y: 100 }
      this.velocity = { x: 0, y:0 }
      this.width = 78;
      this.height = 90;
      this.image=createImg(idleR);
      this.frames = 0;
        this.frameInterval = 4;
        this.frameCount = 0;
        this.sprites={
          stand:{
            right:createImg(idleR),
            cropWidth:39,
            frameC:9,

            left:createImg(idleL),


          },
          run:{
            right:createImg(runR),
            cropWidth:54,
            frameC:6,

            left:createImg(runL),
          }
        }
       this.currentSprite=this.sprites.stand.right;
       this.currentCropWidth=this.sprites.stand.cropWidth;
       this.currentframeC=this.sprites.stand.frameC;
    }

    draw(){
      const frameX =162 * this.frames;
      c.drawImage(
        this.currentSprite,
        frameX, 0, this.currentCropWidth, 45,
        this.position.x, this.position.y,
        this.width, this.height);
    }
    update() {
    
    

        

    
    
      this.frameCount++;
      if (this.frameCount % this.frameInterval === 0) {
          this.frames++;
          if (this.frames > this.currentframeC) {
              this.frames = 0;
          }
      }

      this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;}
            else {
                this.velocity.y = 0;}

      this.draw();
  }
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

function keydown(e){
 switch(e.keyCode){

    case 65:  
    player1.velocity.x =-5;                  
    player1.currentSprite=player1.sprites.run.left;
    player1.currentCropWidth=player1.sprites.run.cropWidth;
    player1.currentframeC=player1.sprites.run.frameC;               
        break ;

    case 83 :                                        
        break;

    case 68 :  
    player1.velocity.x =5 ;           
    player1.currentSprite=player1.sprites.run.right;
   player1.currentCropWidth=player1.sprites.run.cropWidth;
   player1.currentframeC=player1.sprites.run.frameC;                         
        break;

    case 87 :        
        player1.velocity.y -=20 ;                                 
        break ;
 }
}

function keyup(e){
    switch(e.keyCode){
   
       case 65:  
       player1.velocity.x =0; 
       player1.currentSprite=player1.sprites.stand.left;
       player1.currentCropWidth=player1.sprites.stand.cropWidth;
       player1.currentframeC=player1.sprites.stand.frameC;                           
   
       case 83 :                                         
           break;
   
       case 68 :  
       player1.velocity.x =0 ;        
       player1.currentSprite=player1.sprites.stand.right;
       player1.currentCropWidth=player1.sprites.stand.cropWidth;
       player1.currentframeC=player1.sprites.stand.frameC;
           break;
   
       case 87 :        
           player1.velocity.y =-20 ;                                
           break ;
    }
   }

addEventListener('keydown', keydown)
addEventListener('keyup',keyup) 


