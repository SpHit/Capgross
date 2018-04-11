/*
anchor = punto de apoyo
scale = escalar imagen (x, y)
angle = angulo de la imagen (x, y)
spritesheet = animacion
frame = elige img en concreto
*/
var personaje;
var pelota;
var cursor;
var puntos1;
var puntos2;
var txtPuntos1;
var txtPuntos2;
var capgross = new Phaser.Game(1074, 724, Phaser.CANVAS, 'juego');
var ball_launched;
var ball_velocity;
var mando; 
var salto;


//
var pad1;
//


var estado_princ = {
    
    preload: function(){
        capgross.load.image('fondo', 'img/campo.png');
        capgross.load.image('jugador1', 'img/alex.png');
        capgross.load.image('pelota', 'img/pelota2.png');
    },
    

    create: function(){
        capgross.add.tileSprite(0, 0, 1074, 724, 'fondo');
        personaje = capgross.add.sprite(capgross.width, capgross.height, 'jugador1');
        pelota = capgross.add.sprite(capgross.width/2, capgross.height/2, 'pelota');
        

        ball = create_ball(capgross.world.centerX,capgross.world.centerY);


        capgross.input.onDown.add(launch_ball, this);
        
        //mando 
        capgross.input.gamepad.start();

        mando = capgross.input.gamepad.pad1;


        pelota.anchor.setTo(0.5,0.5);
        pelota.scale.setTo(0.4,0.4);
        personaje.anchor.setTo(1,1);     
        
        personaje.scale.setTo(0.23,0.23);
        
        ball_launched = false;
        ball_velocity = 400; 



        capgross.physics.arcade.enable(personaje, pelota);
        capgross.physics.arcade.enable(pelota);

        pelota.body.gravity.y = 700;

        
        

        cursor = capgross.input.keyboard.createCursorKeys();
        capgross.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        personaje.body.gravity.y = 1900;
        pelota.body.collideWorldBounds = true;
        pelota.body.bounce.set();

        personaje.body.collideWorldBounds = true;
        puntos1 = 0;
        puntos2 = 0;
        txtPuntos1 = capgross.add.text(30, 20, "0", {font:"30px Arial", fill:"black"});
        txtPuntos2 = capgross.add.text(800, 20, "0", {font:"30px Arial", fill:"black"});
    
    ///
        capgross.input.gamepad.start();
    
        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
        pad1 = capgross.input.gamepad.pad1;
    
        
    
    ///
    },
    update: function(){
/* celebracion
if (pad1.isDown(Phaser.Gamepad.XBOX360_A))
{
    personaje.angle += 5;
}
*/        
        //Derecha
        if (cursor.right.isDown || (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)){
            personaje.position.x += 4;
            puntos1++;
            txtPuntos1.text = puntos1;
        }
        //Izqueirda
        if (cursor.left.isDown || (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)){
            personaje.position.x -= 4;
            puntos2++;
            txtPuntos2.text = puntos2;
        }
        //Salto
        if ((cursor.up.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_X )) && personaje.body.blocked.down){
            personaje.body.velocity.y = -600;
                      
        }

        capgross.physics.arcade.collide(personaje,ball);

        if(ball.body.blocked.left){
            console.log("A TOCADO EL BORDE izquierdo")
        }
        if(ball.body.blocked.right){
            console.log("A TOCADO EL derecho")
        }





        personaje.body.immovable=true;


        pelota.angle += 1;
    }
};
function create_ball(x,y){
    var ball = capgross.add.sprite(x,y,'img/pelota2.png');
    ball.anchor.setTo(0.5,0.5);
    capgross.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.58,0.58);
    ball.body.gravity.y = 700;
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