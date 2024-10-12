class Player {
    constructor({position,collisionBlocks}) {
      this.position = position;
      this.velocity = { x: 0, y: 0 };
      this.collisionBlocks = collisionBlocks;
      this.width = 78/9.1;
      this.height = 90/8.25;
      this.frames = 0;
      this.frameInterval = 5;
      this.frameCount = 0;
      this.isJumping = false;
      this.isFalling=false;
      this.direction = 'right';
      this.isAttacking = false;
      this.attackFrames = 0;
      this.attackDuration = 20; 
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
        console.log(this.attackFrames);
        this.attackFrames++;
        if (this.attackFrames > this.attackDuration) {
          this.isAttacking = false; 
          this.attackFrames = 0; 
        }
        this.currentSprite = this.direction === 'left' ? this.sprites.attack.left : this.sprites.attack.right; 
             this.currentCropHeight = 101;
        this.currentCropWidth = this.sprites.attack.cropWidth;
  
        this.width = 532/9.1;
        this.height = 404/8.25;
      } 
      else if(this.isDead){
        this.currentSprite=this.sprites.death.right;
        this.currentCropWidth=this.sprites.death.cropWidth;
        this.width=254/9.1;
        this.currentframeCount=this.sprites.death.frameCount;
  
      }
  
      else if (this.velocity.x !== 0) {
        this.direction = this.velocity.x < 0 ? 'left' : 'right';
        this.currentSprite = this.direction === 'left' ? this.sprites.run.left : this.sprites.run.right;
       
        this.currentCropWidth = this.sprites.run.cropWidth;
        this.currentframeCount = this.sprites.run.frameCount;
        this.currentCropHeight = this.sprites.stand.cropHeight;
        
        this.width = 156/9.1;
        this.height = 180/8.25;
      } else {
        this.currentSprite = this.direction === 'left' ? this.sprites.stand.left : this.sprites.stand.right;
        this.currentCropWidth = this.sprites.stand.cropWidth;
        this.currentCropHeight = this.sprites.stand.cropHeight;
        
        this.currentframeCount = this.sprites.stand.frameCount;
        this.width = 156/9.1;
        this.height = 180/8.5;
  
      }
  
  
  
      
      
  
  
      this.draw();
    }
    checkForHorizontalCollisions(){
      for(let i=0;i<this.collisionBlocks.length;i++){
          const collisionBlock = this.collisionBlocks[i];
          if(collision({object1:this,object2:collisionBlock})){
            if(this.velocity.x>0){
              
              
              this.velocity.x=0;
              this.position.x=collisionBlock.position.x-this.width-0.1;
            }
            if(this.velocity.x<0){
              
              this.velocity.x=0;
              this.position.x=collisionBlock.position.x+collisionBlock.width+0.1;
            }
      }
   }
}

    applyGravity(){
        this.position.y += this.velocity.y;
  
    
        this.velocity.y += gravity;
     }
     checkForVerticalCollisions(){
        for(let i=0;i<this.collisionBlocks.length;i++){
            const collisionBlock = this.collisionBlocks[i];
            if(collision({object1:this,object2:collisionBlock})){
              if(this.velocity.y>0){
                
                this.velocity.y=0;
                this.position.y=collisionBlock.position.y-this.height-0.1;
              }
              if(this.velocity.y<0){
                
                this.velocity.y=0;
                this.position.y=collisionBlock.position.y+collisionBlock.height-0.1;
              }
        }
     }
  }}