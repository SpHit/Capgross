/*
anchor = punto de apoyo
scale = escalar imagen (x, y)
angle = angulo de la imagen (x, y)
spritesheet = animacion
frame = elige img en concreto
*/
var personaje;
var personaje2;
var pelota;
var cursor;
var derecha;
var izquierda;
var arriba;
var puntos1;
var puntos2;
var txtPuntos1;
var txtPuntos2;
var capgross = new Phaser.Game(1074, 724, Phaser.CANVAS, 'juego');
var ball_launched;
var ball_velocity;

var estado_princ = {
    
    preload: function(){
        capgross.load.image('fondo', 'img/campo.png');
        capgross.load.image('jugador1', 'img/EricR.png');
        capgross.load.image('pelota', 'img/Pelota2.png');
        capgross.load.image('jugador2', 'img/JordiR.png');
    },
    

    create: function(){
        capgross.add.tileSprite(0, 0, 1074, 724, 'fondo');
        personaje = capgross.add.sprite(capgross.width, capgross.height, 'jugador1');
        personaje2 = capgross.add.sprite(capgross.width/2, capgross.height/2, 'jugador2');
        
        ball = create_ball(capgross.world.centerX,capgross.world.centerY);


        capgross.input.onDown.add(launch_ball, this);
        

        
        personaje.anchor.setTo(1);
        personaje.scale.setTo(1,1);
        personaje2.anchor.setTo(-2.07);
        personaje2.scale.setTo(-1, 1);
        
        ball_launched = false;
        ball_velocity = 400; 



        capgross.physics.arcade.enable(personaje, ball);
        capgross.physics.arcade.enable(personaje2, ball);



        cursor = capgross.input.keyboard.createCursorKeys();
        derecha = capgross.input.keyboard.addKey(Phaser.Keyboard.D);
        izquierda = capgross.input.keyboard.addKey(Phaser.Keyboard.A);
        arriba = capgross.input.keyboard.addKey(Phaser.Keyboard.W);

        capgross.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        personaje.body.gravity.y = 1900;
        personaje2.body.gravity.y = 1900;   
        
   

        personaje.body.collideWorldBounds = true;
        personaje2.body.collideWorldBounds = true;

        puntos1 = 0;
        puntos2 = 0;
        txtPuntos1 = capgross.add.text(30, 20, "0", {font:"30px Arial", fill:"black"});
        txtPuntos2 = capgross.add.text(800, 20, "0", {font:"30px Arial", fill:"black"});
    },
    
    update: function(){
        if (cursor.right.isDown){
            personaje.position.x += 4;
            puntos1++;
            txtPuntos1.text = puntos1;
        }
        if (cursor.left.isDown){
            personaje.position.x -= 4;
            puntos2++;
            txtPuntos2.text = puntos2;
        }
        if (cursor.up.isDown && personaje.body.blocked.down){
            personaje.body.velocity.y = -600;
            
        }
        if (derecha.isDown){
            personaje2.position.x += 4;
        }
        if (izquierda.isDown){
            personaje2.position.x -= 4;
        }
        if (arriba.isDown && personaje2.body.blocked.down){
            personaje2.body.velocity.y = -600;
        }
        

        capgross.physics.arcade.collide(personaje, personaje2);
        capgross.physics.arcade.collide(personaje, ball);
        capgross.physics.arcade.collide(personaje2, ball);
        
        if(ball.body.blocked.left){
            console.log("A TOCADO EL BORDE")
        }
        if(ball.body.blocked.right){
            console.log("A TOCADO EL derecho")
        }

        ball.angle += 1;
        
        personaje.body.immovable=true;
        personaje2.body.immovable=true;

    }
};
function create_ball(x,y){
    var ball = capgross.add.sprite(x,y,'pelota');
    ball.anchor.setTo(0.5,0.5);
    capgross.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.58,0.58);
    ball.body.gravity.y = 700;
    ball.scale.setTo(0.4,0.4);
    return ball;
}
function launch_ball(){
    if(ball_launched){
        ball.x = capgross.world.centerX;
        ball.y = capgross.world.centerY;
        ball.body.velocity.setTo(0,0);
        ball_launched = false;
    }else{
        ball.body.velocity.x = ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
    }
}

capgross.state.add('principal', estado_princ);
capgross.state.start('principal');

//prueva guardar comentario