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
var jumpTimer2 = 0;


var estado_princ = {

    preload: function () {
        //LOAD IMAGES
        capgross.load.image('fondo', 'img/estadi.jpg');
        capgross.load.image('pelota', 'img/Pelota3.png')
        capgross.load.image('JordiRightIMG', 'img/JordiR.png');
        capgross.load.image('JordiLeftIMG', 'img/JordiL.png');
        capgross.load.image('EricRightIMG', 'img/EricR.png');
        capgross.load.image('EricLeftIMG', 'img/EricL.png');
        capgross.load.image('VictorRightIMG', 'img/VictorR.png');
        capgross.load.image('VictorLeftIMG', 'img/VictorL.png');
        capgross.load.image('AlexRightIMG', 'img/AlexR.png');
        capgross.load.image('AlexLeftIMG', 'img/AlexL.png');
        //LOAD PHYSICS P2
        capgross.load.physics('physicsRight', 'jsons/PlayerRight.json');
        capgross.load.physics('physicsLeft', 'jsons/PlayerLeft.json');
        capgross.load.physics('ballPhysycs', 'jsons/tolerancia1.json');

    },




    create: function () {
        //ACTIVAR P2 PHYSICS
        capgross.physics.startSystem(Phaser.Physics.P2JS);

        //ACTIVAR GRAVEDAD 
        capgross.physics.p2.gravity.y = 1500;

        //Fondo blau
        capgross.backgroundColor = '#ffffff';

        //AFEGIM EL JUGADOR 1
        personaje = capgross.add.sprite(500, 400, 'JordiRightIMG');
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje], false);
        personaje.body.clearShapes();
        personaje.body.loadPolygon("physicsRight", "JordiR");

        //AFEGIM EL JUGADOR 2
        personaje2 = capgross.add.sprite(200, 200, 'AlexLeftIMG');
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje2], false);
        personaje2.body.clearShapes();
        personaje2.body.loadPolygon("physicsLeft", "JordiR");

        //AFEGIM PILOTA
        bola = capgross.add.sprite(10,300,'pelota');
        capgross.physics.p2.enable([bola], true);
        personaje2.body.clearShapes();
        personaje2.body.loadPolygon("ballPhysics", "Pelota3");


        // Get rid of current bounding box
        

        cursor = capgross.input.keyboard.createCursorKeys();
        derecha = capgross.input.keyboard.addKey(Phaser.Keyboard.D);
        izquierda = capgross.input.keyboard.addKey(Phaser.Keyboard.A);
        arriba = capgross.input.keyboard.addKey(Phaser.Keyboard.W);
        space = capgross.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
        if (derecha.isDown) {
            personaje2.body.velocity.x = 250;

        }
        if (izquierda.isDown) {
            personaje2.body.velocity.x = -250;

        }
        if (arriba.isDown && capgross.time.now > jumpTimer2 && checkIfCanJump2()) {
            personaje2.body.moveUp(600);
            jumpTimer2 = capgross.time.now + 0;
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

function checkIfCanJump2() {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < capgross.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = capgross.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === personaje2.body.data || c.bodyB === personaje2.body.data) {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === personaje2.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }

    return result;

}