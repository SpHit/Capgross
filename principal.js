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

        pelota.anchor.setTo(0.5,0.5);
        pelota.scale.setTo(0.4,0.4);
        personaje.anchor.setTo(1,1);     
        
        personaje.scale.setTo(0.23,0.23);




        capgross.physics.arcade.enable(personaje, pelota);
        capgross.physics.arcade.enable(pelota);

        pelota.body.gravity.y = 500;


        

        cursor = capgross.input.keyboard.createCursorKeys();
        capgross.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        personaje.body.gravity.y = 1900;
        pelota.body.collideWorldBounds = true;
        personaje.body.collideWorldBounds = true;
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
        pelota.angle += 1;
    }
};

capgross.state.add('principal', estado_princ);
capgross.state.start('principal');

//prueva guardar comentario