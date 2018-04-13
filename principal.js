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
var mando; 
var salto;
var gol;


//
var pad1;
//


var estado_princ = {
    
    preload: function(){
        capgross.load.image('fondo', 'img/campo.png');
        capgross.load.image('pelota', 'img/Pelota2.png');
        capgross.load.image('jugador1', 'img/EricR.png');
        capgross.load.image('jugador2', 'img/JordiR.png');
        capgross.load.image('Miniatura1', 'img/EricR.png');
        capgross.load.image('Miniatura2', 'img/JordiR.png');
        capgross.load.image('Marcador', 'img/Marcador.png');
    },
    

    create: function(){
        capgross.add.tileSprite(0, 0, 1074, 724, 'fondo');
        personaje = capgross.add.sprite(capgross.width, capgross.height, 'jugador1');
        personaje2 = capgross.add.sprite(capgross.width/2, capgross.height/2, 'jugador2');
        
        ball = create_ball(capgross.world.centerX,capgross.world.centerY);


        capgross.input.onDown.add(launch_ball, this);
        
        //mando 
        capgross.input.gamepad.start();

        mando = capgross.input.gamepad.pad1;


        
        personaje.anchor.setTo(1,1);     
        
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

        //miniaturas y scoreboard
        puntos1 = 0;
        puntos2 = 0;

        marcador = capgross.add.sprite(340, -50, 'Marcador');
        marcador.scale.setTo(0.70)
        miniatura1 = capgross.add.sprite(500, 52, 'Miniatura2');
        miniatura2 = capgross.add.sprite(615, 52, 'Miniatura1');
        miniatura1.scale.setTo(-0.35,0.35);
        miniatura2.scale.setTo(0.35);
        txtPuntos1 = capgross.add.text(520, 50, "0", {font:"45px Open Sans", fill:"white"});
        txtPuntos2 = capgross.add.text(580, 50, "0", {font:"45px Open Sans", fill:"white"});
        txtPuntos1.fontWeight = 'bold';
        txtPuntos2.fontWeight = 'bold';
        
        miniatura1.inputEnabled = true;
        
        miniatura1.input.useHandCursor = true;
        

        


    
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
        }
        //Izqueirda
        if (cursor.left.isDown || (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)){
            personaje.position.x -= 4;

        }
        //Salto
        if ((cursor.up.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_X )) && personaje.body.blocked.down){
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

            destroySprite(miniatura1,miniatura2,txtPuntos1,txtPuntos2);
            puntos2++;
            txtPuntos2.text = puntos2;
        }
        if(ball.body.blocked.right){

            destroySprite(miniatura1,miniatura2,txtPuntos1,txtPuntos2);            
            puntos1++;
            txtPuntos1.text = puntos1;
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
    ball.scale.setTo(1,1);
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

function destroySprite (sprite,sprite1,sprite2,sprite3) {
    
        sprite.destroy();
        sprite1.destroy();
        sprite2.destroy();
        sprite3.destroy();
        gol = capgross.add.text(460, 50, "GOOOL!!!", {font:"45px Open Sans", fill:"white"});
        capgross.time.events.add(Phaser.Timer.SECOND * 2, SetMarcador, gol);

    }

function SetMarcador() {
    
        capgross.add.tween(gol).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
        txtPuntos1 = capgross.add.text(520, 50, puntos1, {font:"45px Open Sans", fill:"white"});
        txtPuntos2 = capgross.add.text(580, 50, puntos2, {font:"45px Open Sans", fill:"white"});
        txtPuntos1.fontWeight = 'bold';
        txtPuntos2.fontWeight = 'bold';
        miniatura1 = capgross.add.sprite(500, 52, 'Miniatura2');
        miniatura2 = capgross.add.sprite(615, 52, 'Miniatura1');
        miniatura1.scale.setTo(-0.35,0.35);
        miniatura2.scale.setTo(0.35);
    }
    
//prueva guardar comentario