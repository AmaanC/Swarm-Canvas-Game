window.onload = function (){
    var ctx = document.getElementById('bugs').getContext('2d');
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;

    ctx.strokeStyle = 'white';

    var chasers = [], dead = []; // Holds the indices of dead chasers so they can be removed from the chasers array after the loop
    
    var Bug = function (bonus){
        var x,
        y,
        disx,
        disy,
        speed = 2 + (Math.random() * 5),
        angle = 0;

        ctx.fillStyle = bonus ? 'green' : 'maroon';

        x = -100 + Math.random() * (ctx.canvas.width + 100);
        y = -100 + Math.random() * (ctx.canvas.height + 100);
        if(x > 0 && x < ctx.canvas.width && y > 0 && y < ctx.canvas.height){
            Math.random() > 0.5 ?
            x = (Math.random() > 0.5) ? -(Math.random()*50) : ctx.canvas.width + Math.random()*50
            :
            y = (Math.random() > 0.5) ? -(Math.random()*50) : ctx.canvas.height + Math.random()*50;
        }

        var draw = function (){
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.strokeRect(0, 0, RECT_WIDTH, RECT_HEIGHT);
            ctx.fillRect(0, 0, RECT_WIDTH, RECT_HEIGHT);
            ctx.restore();
        };

        this.logic = function (){
            angle = Math.atan2(window.player.y - y, window.player.x - x);
            disx = speed * Math.cos(angle);
            disy = speed * Math.sin(angle);
            x += disx;
            y += disy;
            if(x > WIDTH){
                x = 0;
            }
            else if(x < 0){
                x = WIDTH;
            }

            if(y > HEIGHT){
                y = 0;
            }
            else if(y < 0){
                y = HEIGHT;
            }

            //Collision test
            //This isn't a precise hit-test, but it works
            if(Math.sqrt(Math.pow((window.player.x - x) , 2) + Math.pow((window.player.y - y) , 2)) < RECT_WIDTH){
                this.anim = function(){};
                window.player.health -= bonus ? -80 : 10;
                if(window.player !== 0){
                    dead.push(chasers.indexOf(this));
                    this.logic = function (){};
                }
            }

            draw();
        };
    };


    var spawnChasers = function (n){
        window.player.health = 255;
        for(var i = 0; i < n; i++){
            chasers.push(new Bug());
        }
    };

    var loop = function (){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        chasers.forEach(function (chaser){
            chaser.logic();
        });
        if(dead.length > 0){
            dead.forEach(function (index){
                chasers.splice(index, 1);
            });
            dead = [];
        }
        setTimeout(loop, 100/3);
    };

    spawnChasers(18);
    loop();

};