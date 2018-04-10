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
var capgross = new Phaser.Game(852, 480, Phaser.CANVAS, 'juego');
var fondo;

var estado_princ = {
    
    preload: function(){
        capgross.load.image('fondo', 'img/estadi.jpg');
        capgross.load.image('jugador1', 'img/pers.png');
        //capgross.load.image('pelota', 'img/bola.png');
        capgross.load.physics('physicsP1', 'jsons/Jordi.json');
        //capgross.load.physics('pelota', 'jsons/pelota.json');
    },

    

    
    create: function(){
        //ACTIVAR P2 PHYSICS
        capgross.physics.startSystem(Phaser.Physics.P2JS);

        //ACTIVAR GRAVEDAD 
        capgross.physics.p2.gravity.y = 1000;

        //Fondo blau
        capgross.backgroundColor = '#ccddff';

        //AFEGIM EL JUGADOR I LA PILOTA AL CANVAS I EL TITOL
        personaje = capgross.add.sprite(500, 400, 'jugador1');
        
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje],true);
        
        // Get rid of current bounding box
        personaje.body.clearShapes();
        
        personaje.body.loadPolygon("physicsP1", "jugador1");

        cursor = capgross.input.keyboard.createCursorKeys();
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
        //pelota.angle += 1;
    }
};

capgross.state.add('principal', estado_princ);
capgross.state.start('principal');

//prueva guardar comentario