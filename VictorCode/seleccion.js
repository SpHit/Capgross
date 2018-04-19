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
        juego.load.image('fondo', 'img/campo.png');
        juego.load.image('pelota', 'img/Pelota.png');
        juego.load.image('jugador1', 'img/Jugadores/EricR.png');
        juego.load.image('jugador2', 'img/Jugadores/JordiR.png');
        juego.load.image('Miniatura1', 'img/Jugadores/EricR.png');
        juego.load.image('Miniatura2', 'img/Jugadores/JordiR.png');
        juego.load.image('Marcador', 'img/Marcador.png');
    },
    

    create: function(){
        juego.add.tileSprite(0, 0, 1074, 724, 'fondo');
        personaje = juego.add.sprite(juego.width, juego.height, 'jugador1');
        personaje2 = juego.add.sprite(juego.width/2, juego.height/2, 'jugador2');
        
        ball = create_ball(juego.world.centerX,juego.world.centerY);


        juego.input.onDown.add(launch_ball, this);
        
        //mando 
        juego.input.gamepad.start();

        mando = juego.input.gamepad.pad1;


        
        personaje.anchor.setTo(1,1);     
        
        personaje.anchor.setTo(1);
        personaje.scale.setTo(1,1);
        personaje2.anchor.setTo(-2.07);
        personaje2.scale.setTo(-1, 1);
        
        ball_launched = false;
        ball_velocity = 400; 



        juego.physics.arcade.enable(personaje, ball);
        juego.physics.arcade.enable(personaje2, ball);



        cursor = juego.input.keyboard.createCursorKeys();
        derecha = juego.input.keyboard.addKey(Phaser.Keyboard.D);
        izquierda = juego.input.keyboard.addKey(Phaser.Keyboard.A);
        arriba = juego.input.keyboard.addKey(Phaser.Keyboard.W);

        juego.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        personaje.body.gravity.y = 1900;
        personaje2.body.gravity.y = 1900;   
        
   

        personaje.body.collideWorldBounds = true;
        personaje2.body.collideWorldBounds = true;

        //miniaturas y scoreboard
        puntos1 = 0;
        puntos2 = 0;

        marcador = juego.add.sprite(340, -50, 'Marcador');
        marcador.scale.setTo(0.70)
        miniatura1 = juego.add.sprite(500, 52, 'Miniatura2');
        miniatura2 = juego.add.sprite(615, 52, 'Miniatura1');
        miniatura1.scale.setTo(-0.35,0.35);
        miniatura2.scale.setTo(0.35);
        txtPuntos1 = juego.add.text(520, 50, "0", {font:"45px Open Sans", fill:"white"});
        txtPuntos2 = juego.add.text(580, 50, "0", {font:"45px Open Sans", fill:"white"});
        txtPuntos1.fontWeight = 'bold';
        txtPuntos2.fontWeight = 'bold';
        
        miniatura1.inputEnabled = true;
        
        miniatura1.input.useHandCursor = true;
        

        


    
    ///
        juego.input.gamepad.start();
    
        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
        pad1 = juego.input.gamepad.pad1;
    
        
    
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
        

        juego.physics.arcade.collide(personaje, personaje2);
        juego.physics.arcade.collide(personaje, ball);
        juego.physics.arcade.collide(personaje2, ball);
        
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
    var ball = juego.add.sprite(x,y,'pelota');
    ball.anchor.setTo(0.5,0.5);
    juego.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(0.58,0.58);
    ball.body.gravity.y = 700;
    ball.scale.setTo(1,1);
    return ball;
}
function launch_ball(){
    if(ball_launched){
        ball.x = juego.world.centerX;
        ball.y = juego.world.centerY;
        ball.body.velocity.setTo(0,0);
        ball_launched = false;
    }else{
        ball.body.velocity.x = ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
    }
}

juego.state.add('principal', estado_princ);
juego.state.start('principal');

function destroySprite (sprite,sprite1,sprite2,sprite3) {
    
        sprite.destroy();
        sprite1.destroy();
        sprite2.destroy();
        sprite3.destroy();
        gol = juego.add.text(460, 50, "GOOOL!!!", {font:"45px Open Sans", fill:"white"});
        juego.time.events.add(Phaser.Timer.SECOND * 2, SetMarcador, gol);

    }

function SetMarcador() {
    
        juego.add.tween(gol).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
        txtPuntos1 = juego.add.text(520, 50, puntos1, {font:"45px Open Sans", fill:"white"});
        txtPuntos2 = juego.add.text(580, 50, puntos2, {font:"45px Open Sans", fill:"white"});
        txtPuntos1.fontWeight = 'bold';
        txtPuntos2.fontWeight = 'bold';
        miniatura1 = juego.add.sprite(500, 52, 'Miniatura2');
        miniatura2 = juego.add.sprite(615, 52, 'Miniatura1');
        miniatura1.scale.setTo(-0.35,0.35);
        miniatura2.scale.setTo(0.35);
    }
    
//prueva guardar comentario