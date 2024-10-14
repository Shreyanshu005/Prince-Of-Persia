class Player {
    constructor({position,collisionBlocks}) {
      this.temp=1/8.25;
      this.position = position;
      this.velocity = { x: 0, y: 0 };
      this.collisionBlocks = collisionBlocks;
      
      this.width = 156/13;
        this.height = 180/13;
      this.frames = 0;
      this.frameInterval = 5;
      this.frameCount = 0;
      this.isJumping = false;
      this.isFalling=false;
      this.direction = 'right';
      this.isAttacking = false;
      this.attackFrames = 0;
      this.deadFrames = 0;
      this.attackDuration = 20; 
      this.deadDuration = 15; 
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
      

      this.cameraBox={
        position:{
          x:this.position.x,
          y:this.position.y 
        },width:200,height:80
        
      } 
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
    updateCameraBox(){ 
      
      this.cameraBox={
        position:{
          x:this.position.x-60,
          y:this.position.y-30,
        },width:140,height:80
        
      }
     }
  
      shouldPanLeft({canvas,camera}){
        const cameraboxRigthSide=this.cameraBox.position.x+this.cameraBox.width;
       
        const scaledCanvasWidth=canvas.width/8.55
        if(cameraboxRigthSide>=2880) return
        if(cameraboxRigthSide>=scaledCanvasWidth){
          camera.position.x-=this.velocity.x/0.5; 
        }
      }
      shouldPanRight({canvas,camera}){
        const cameraboxLeftSide=this.cameraBox.position.x;
        if(cameraboxLeftSide<0) return
        if(this.cameraBox.position.x<=0){
          camera.position.x+=this.velocity.x/0.5;
      }}
      
      shouldPanDown({canvas, camera}){
        const cameraBoxBottom = this.cameraBox.position.y + this.cameraBox.height;
        const scaledCanvasHeight = canvas.height / 12;
   
        if (cameraBoxBottom >= 578 / 2.2) return;
   
        if (cameraBoxBottom >= scaledCanvasHeight) {
          if(player1.position.y>180){
            camera.position.y = -(this.cameraBox.position.y -cameraOffsetY+155);
          }else{
            camera.position.y = -(this.cameraBox.position.y -cameraOffsetY);}
        }
    }
    
    shouldPanUp({canvas, camera}){
        const cameraBoxTop = this.cameraBox.position.y;
    
        if (cameraBoxTop <= 0) {
          
            camera.position.y = -(this.cameraBox.position.y -cameraOffsetY);
        }
    }

    



    update() {
      
      
  
if (this.position.y < 0) {
  this.position.y = 0;
  this.velocity.y = 0;
  }
  if(this.position.x<50){
    this.position.x=50;
    
  }
  
   
      
      this.updateCameraBox();
      
      this.frameCount++;

      
      if (this.frameCount % this.frameInterval === 0) {
        this.frames++;
        if (this.frames > this.currentframeCount) {
          this.frames = 0;
        }
      }
  
      this.position.x += this.velocity.x;
      
      this.checkForHorizontalCollisions();
      
     this.applyGravity();
     this.checkForVerticalCollisions();
     
  
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
        this.width=202.8/9.1;
        this.height=234/8.25;
        this.currentframeCount=2;
  this.currentCropHeight=this.sprites.fall.cropHeight;
      }
  
      else if (this.isAttacking) {
     
        this.attackFrames++;
        if (this.attackFrames > this.attackDuration) {
          
          this.isAttacking = false; 
          this.attackFrames = 0; 
          
        }
        this.currentSprite = this.direction === 'left' ? this.sprites.attack.left : this.sprites.attack.right; 
             this.currentCropHeight = 101;
        this.currentCropWidth = this.sprites.attack.cropWidth;
  
        this.width = 532/25.1;
        this.height = 404/28.25;
      } 
      else if(this.isDead){
        this.deadFrames++;
        if(this.deadFrames>this.deadDuration){
          this.isDead=false;
          this.deadFrames=0;
        }
        this.currentSprite=this.sprites.death.right;
        this.currentCropWidth=this.sprites.death.cropWidth;
        this.width=254/14.1;
        this.currentframeCount=this.sprites.death.frameCount;
       

  
      }
  
      else if (this.velocity.x !== 0) {
       
        
        this.direction = this.velocity.x < 0 ? 'left' : 'right';
        this.currentSprite = this.direction === 'left' ? this.sprites.run.left : this.sprites.run.right;
        this.currentCropWidth = this.sprites.run.cropWidth;
        this.currentframeCount = this.sprites.run.frameCount;
        this.currentCropHeight = this.sprites.stand.cropHeight;
        
        this.width = 156/13;
        this.height = 180/13;
      } else {
        
        this.currentSprite = this.direction === 'left' ? this.sprites.stand.left : this.sprites.stand.right;
        this.currentCropWidth = this.sprites.stand.cropWidth;
        this.currentCropHeight = this.sprites.stand.cropHeight;
        
        this.currentframeCount = this.sprites.stand.frameCount;
        this.width = 156/13;
        this.height = 180/13;
  

      }
      if(this.isAttacking){
        this.width = 532/25.1;
        this.height = 404/28.25;
      }else
      this.width = 156/13;
        this.height = 180/13;
  
      
        if(this.position.x>=237&&this.position.x<238&&this.position.y===81.95384615384616){
          this.isDead=true;
        }
        this.isdead=false;
  
  
      
      
  
  
      this.draw();
      
    }
    
   
    
    checkForHorizontalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        
        
          const collisionBlock = this.collisionBlocks[i];
        

      
          if (collision({ object1: this, object2: collisionBlock })) {
              if (this.velocity.x > 0) {
                  this.velocity.x = 0; 
                  this.position.x = collisionBlock.position.x - this.width - 0.1; 
              }
  
              
              if (this.velocity.x < 0) {
                  this.velocity.x = 0; 
                  this.position.x = collisionBlock.position.x + collisionBlock.width + 0.1; 
              }
          }
      }
  }

    applyGravity(){
    
      this.position.y += this.velocity.y;
      this.velocity.y += gravity;
      
     
 
      
   if (this.isStandingOnCollisionBlock()) {
    this.velocity.y =0
    
        } 
  
     
 
      

     }
     checkForVerticalCollisions(){
        for(let i=0;i<this.collisionBlocks.length;i++){
            const collisionBlock = this.collisionBlocks[i];
           
            
            if(collision({object1:this,object2:collisionBlock})){
              if(this.velocity.y>0){
                
                this.velocity.y=0;
                
                this.position.y=collisionBlock.position.y-this.height-0.2;
                
              }
              if(this.velocity.y<0){
             ;
                this.velocity.y=0;
                this.position.y=collisionBlock.position.y+collisionBlock.height+0.2;
              }
        }
     }
  }
  
  isStandingOnCollisionBlock() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];
        if (
            this.position.y + this.height <= collisionBlock.position.y + 0.2 &&
            this.position.y + this.height >= collisionBlock.position.y - 0.2 &&
            this.position.x + this.width > collisionBlock.position.x &&
            this.position.x < collisionBlock.position.x + collisionBlock.width
        ) {
            return true;
        }
    }
    return false;
}

  
}
const cameraOffsetY = 10;



