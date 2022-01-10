import{
    Ball
} from './ball.js';
import {
    Block
} from './block.js';

class App{
    constructor() {
        this.initWindow();
				this.resize();
				
        this.ball = new Ball(this.style_width, this.style_height, 15, 7);
        this.block = new Block(this.style_width/3, this.style_height/30, this.style_width/4, this.style_height/3); // w, h, x, y
				
        this.animation = window.addEventListener('resize', this.resize.bind(this), false);
    }

    main(){
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

				this.block.update(this.style_width/3, this.style_height/30, this.style_width/4, this.style_height/3); // w,h,x,y

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.style_width, this.style_height, this.block);
    }
    
    initWindow(){
        this.canvas = document.createElement('canvas');    
        this.ctx = this.canvas.getContext('2d');
        
        document.body.appendChild(this.canvas);
        document.body.style.background='#222222';
        this.setCanvasStyle();
    }
      
    setCanvasStyle(){
        this.canvas.style.background='rgba(85,100,150,1)';
        
        this.canvas.style.position='absolute';
        this.canvas.style.top = '0';
        this.canvas.style.bottom = '0';
        this.canvas.style.left = '0';
        this.canvas.style.right = '0';
        this.canvas.style.margin = 'auto';
    }
    
    resize(){
        this.dpr = window.devicePixelRatio;
        this.window_width = window.innerWidth;
        this.window_height = window.innerHeight;

        this.style_width = Math.min(this.window_width,this.window_height)*0.9;
        this.style_height = this.style_width;

				this.stage_width = this.style_width*this.dpr;
				this.stage_height = this.style_height*this.dpr;

        this.canvas.style.width = this.style_width+'px';
        this.canvas.style.height = this.style_height+'px';

				this.canvas.width = this.stage_width;
				this.canvas.height = this.stage_height;

        this.ctx.scale(this.dpr,this.dpr);
    }
}

var app = new App();
window.onload = () => {
    app.main();
}
