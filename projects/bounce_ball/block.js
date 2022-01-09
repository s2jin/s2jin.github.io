export class Block{
    constructor(width, height, x, y){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.max_x = width + x;
        this.max_y = height + y;
    }

    draw(ctx){
        const x_gap = 80;
        const y_gap = 60;

        ctx.fillStyle = '#ff384e';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.lineTo(this.max_x, this.max_y);
        ctx.lineTo(this.max_x - x_gap, this.max_y + y_gap);
        ctx.lineTo(this.x - x_gap, this.max_y + y_gap);
        ctx.lineTo(this.x - x_gap, this.max_y + y_gap - this.height);
        ctx.fill();

        // bottom shadow
        ctx.fillStyle = 'rgba(0,0,0,.5)';
        ctx.beginPath();
        ctx.moveTo(this.max_x, this.max_y);
        ctx.lineTo(this.max_x - x_gap, this.max_y + y_gap);
        ctx.lineTo(this.x - x_gap, this.max_y + y_gap);
        ctx.lineTo(this.x, this.max_y);
        ctx.fill();

        // left shadow
        ctx.fillStyle = 'rgba(0,0,0,.2)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.max_y);
        ctx.lineTo(this.x - x_gap, this.max_y + y_gap);
        ctx.lineTo(this.x - x_gap, this.max_y + y_gap - this.height);
        ctx.fill();
    }
}
