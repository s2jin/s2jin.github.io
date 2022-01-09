export class Ball{
    constructor(stage_width, stage_height, radius, speed){
        this.radius = radius; // 반지름
        this.vx = speed; // x 방향으로 움직이는 속도
        this.vy = speed; // y 방향으로 움직이는 속도

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * (stage_width - diameter)); // 공의 x 위치
        this.y = diameter + (Math.random() * (stage_height - diameter)); // 공의 y 위치
    }
    
    draw(ctx, stage_width, stage_height, block){
        this.x += this.vx;
        this.y += this.vy;
        
        this.bounceWindow(stage_width, stage_height);

        this.bounceBlock(block);

        ctx.fillStyle = "#fdd700";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }

    bounceWindow(stage_width, stage_height){
        const min_x = this.radius;
        const max_x = stage_width - this.radius;
        const min_y = this.radius;
        const max_y = stage_height - this.radius;
        console.log(min_x, max_x, min_y, max_y);

        // 부딛히면 방향을 반대로(*-1)
        if (this.x <= min_x || this.x >= max_x){
            this.vx *= -1;
            this.x += this.vx;
        }
        else if (this.y <= min_y || this.y >= max_y){
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block){
        const min_x = block.x - this.radius;
        const max_x = block.max_x + this.radius;
        const min_y = block.y - this.radius;
        const max_y = block.max_y + this.radius;

        if (this.x > min_x && this.x < max_x && this.y > min_y && this.y < max_y){
            const x1 = Math.abs(min_x - this.x);
            const x2 = Math.abs(this.x - max_x);
            const y1 = Math.abs(min_y - this.y);
            const y2 = Math.abs(this.y - max_y);
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            if (min == min1){
                this.vx *= -1;
                this.x += this.vx;
            }
            else if (min == min2){
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }
}
