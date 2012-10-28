(function (){
    var ctx = document.getElementById('player').getContext('2d');
    var keysDown = {}, up = 38, down = 40, right = 39, left = 37;

    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    
    ctx.strokeStyle = 'white';

    window.player = {
        'width': RECT_WIDTH,
        'height': RECT_HEIGHT,
        'x': 300,
        'y': 200,
        'health': 255,
        'stopped': false
    };
    var accSpeed = 1,
    speed = 0,
    maxSpeed = 10,
    disx = 0,
    disy = 0,
    angle = 0,
    turnAngle = Math.PI / 180 * 10;

    var draw = function (){
        ctx.fillStyle = "rgb(255," + window.player.health + "," + window.player.health + ")";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fill();

        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.rotate(angle);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, player.width, player.height);
        ctx.strokeRect(0, 0, player.width, player.height);
        ctx.restore();
    };

    var logic = function (){
        if(speed > 0){
            if(keysDown[right] === true){
                angle += turnAngle;
            }
            if(keysDown[left] === true){
                angle -= turnAngle;
            }
        }
        if(keysDown[up] === true){
            speed += accSpeed;
            if(speed > maxSpeed){
                speed = maxSpeed;
            }
        }
        else if(player.stopped === true){
            speed -= accSpeed;
            if(speed <= 0){
                speed = 0;
                player.stopped = false;
            }
        }

        disx = speed * Math.cos(angle);
        disy = speed * Math.sin(angle);
        player.x += disx;
        player.y += disy;
        if(player.x > WIDTH){
            player.x = 0;
        }
        else if(player.x < 0){
            player.x = WIDTH;
        }

        if(player.y > HEIGHT){
            player.y = 0;
        }
        else if(player.y < 0){
            player.y = HEIGHT;
        }

        draw();
        setTimeout(logic, 100/3);
    };

    document.body.addEventListener('keydown', function (e){
        keysDown[e.keyCode] = true;
    }, false);
    
    document.body.addEventListener('keyup', function (e){
        delete keysDown[e.keyCode];
        if(e.keyCode === 38){
            player.stopped = true;
        }
    }, false);
    logic();
})();