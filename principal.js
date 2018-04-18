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
var puntos1;
var puntos2;
var txtPuntos1;
var txtPuntos2;
var capgross = new Phaser.Game(852, 480, Phaser.CANVAS, 'juego');
var fondo;
var jumpTimer = 0;

var estado_princ = {

    preload: function () {
        capgross.load.image('fondo', 'img/estadi.jpg');
        //LOAD JORDI RIGHT AND LEFT
        capgross.load.image('JordiRightIMG', 'img/JordiR.png');
        capgross.load.physics('physicsRight', 'jsons/PlayerRight.json');
        capgross.load.physics('physicsLeft', 'jsons/PlayerLeft.json');
    },




    create: function () {
        //ACTIVAR P2 PHYSICS
        capgross.physics.startSystem(Phaser.Physics.P2JS);

        //ACTIVAR GRAVEDAD 
        capgross.physics.p2.gravity.y = 1500;

        //Fondo blau
        capgross.backgroundColor = '#000000';

        //AFEGIM EL JUGADOR 
        personaje = capgross.add.sprite(500, 400, 'JordiRightIMG');
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje], true);
        personaje.body.clearShapes();
        personaje.body.loadPolygon("physicsRight", "JordiR");

        personaje2 = capgross.add.sprite(200, 200, 'JordiRightIMG');
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje2], true);
        personaje2.body.clearShapes();
        personaje2.body.loadPolygon("physicsLeft", "JordiR");

        // Get rid of current bounding box
        

        cursor = capgross.input.keyboard.createCursorKeys();

    },

    update: function () {
        personaje.body.rotateLeft(0.0);
        personaje.body.rotateRight(0.0);

        personaje2.body.rotateLeft(0.0);
        personaje2.body.rotateRight(0.0);
        
        if (cursor.right.isDown) {
            personaje.body.velocity.x = 250;

        }
        if (cursor.left.isDown) {
            personaje.body.velocity.x = -250;

        }
        if (cursor.up.isDown && capgross.time.now > jumpTimer && checkIfCanJump()) {
            personaje.body.moveUp(600);
            jumpTimer = capgross.time.now + 0;
        }
        //pelota.angle += 1;
    }
};

capgross.state.add('principal', estado_princ);
capgross.state.start('principal');

//prueva guardar comentario



function checkIfCanJump() {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < capgross.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = capgross.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === personaje.body.data || c.bodyB === personaje.body.data) {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === personaje.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }

    return result;

}