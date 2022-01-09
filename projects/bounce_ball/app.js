import{
    Ball
} from './ball.js';

import {
    Block
} from './block.js';

class App{
    constructor() {
        this.initWindow();
        window.addEventListener('resize', this.resize.bind(this), false);
        //window.requestAnimationFrame(this.animate.bind(this));
    }

    main(){
        this.setRestart();
        //this.checkPosition(10,10);
        //this.checkPosition(this.stage_width, this.stage_height);
        //this.checkPosition(this.canvas.width-10, this.canvas.height-10);
        this.checkPosition(this.canvas.style.width, this.canvas.style.height,'red');

        this.ball = new Ball(this.canvas.width, this.canvas.height, 30, 10);
        this.block = new Block(500, 30, 300, 450); // w, h, x, y

        //window.requestAnimationFrame(this.animate.bind(this));
    }
    
    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.canvas.width, this.canvas.height, this.block);
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
        this.window_width = window.innerWidth;
        this.window_height = window.innerHeight;

        this.stage_width = Math.min(this.window_width,this.window_height)*0.9;
        this.stage_height = this.stage_width;

        this.canvas.style.width = this.stage_width+'px';
        this.canvas.style.height = this.stage_height+'px';

        this.dpr = window.devicePixelRatio;
        this.canvas.width = this.stage_width*this.dpr;
        this.canvas.height = this.stage_hegith*this.dpr;
        
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.dpr,this.dpr);
    }

    checkPosition(x,y,color='rgba(0,0,255,.5)'){
        //return
        this.ctx.beginPath();
        var fill_style = this.ctx.fillStyle;
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = fill_style;
    }

    setRestart(){
        this.resize();
        this.canvas.width = this.stage_width*this.dpr;
        this.canvas.height = this.stage_height*this.dpr;
    }
}

var app = new App();
app.main();
window.onload = () => {
    app.main();
}
