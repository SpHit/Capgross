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
var mando; 
var salto;
var gol;
var sePuedeMarcar = true;
var jumpTimer = 0;
var jumpTimer2 = 0;


//
var pad1;
//


var estado_princ = {
    
    preload: function(){
        //CAMPO
        capgross.load.image('fondo', 'img/campo.png');
        //BOLA
        capgross.load.image('pelota', 'img/Pelota3.png');
        //MINIATURAS Y MARCADOR
        capgross.load.image('Miniatura1', 'img/EricR.png');
        capgross.load.image('Miniatura2', 'img/JordiR.png');
        capgross.load.image('Marcador', 'img/Marcador.png');
        capgross.load.image('Largero', 'img/Largero.png');
        //PJ
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
    

    create: function(){

        //ACTIVAR P2 PHYSICS
        capgross.physics.startSystem(Phaser.Physics.P2JS);
        //ACTIVAR GRAVEDAD 
        capgross.physics.p2.gravity.y = 1400;
        
        //BACKGROUND
        capgross.add.tileSprite(0, 0, 1074, 724, 'fondo');

        //AFEGIM EL JUGADOR 1
        personaje = capgross.add.sprite(1074/1.25 , 700, 'EricRightIMG');
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje], true);
        personaje.body.clearShapes();
        personaje.body.loadPolygon("physicsRight", "JordiR");
        personaje.body.fixedRotation = true;

        //AFEGIM EL JUGADOR 2
        personaje2 = capgross.add.sprite(1074/5, 700, 'JordiLeftIMG');
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje2], true);
        personaje2.body.clearShapes();
        personaje2.body.loadPolygon("physicsLeft", "JordiR");
        personaje2.body.fixedRotation = true;

        //AFEGIM PILOTA
        bola = capgross.add.sprite(1074/2,300,'pelota');
        capgross.physics.p2.enable([bola], true);
        bola.body.clearShapes();
        bola.body.setCircle(21);
        bola.body.data.gravityScale = 0.3;
        bola.body.setMaterial(spriteMaterial);

        //TRY
        // capgross.physics.startSystem(Phaser.Physics.ARCADE);
        // capgross.physics.arcade.enable(bola);
        // bola.body.collideWorldBounds = true;
        // bola.body.bounce.setTo(0.58,0.58);
        // bola.body.gravity.y = 700;
        

        //PARA QUE LA PELOTA BOTE
        var spriteMaterial = capgross.physics.p2.createMaterial('spriteMaterial');
        var worldMaterial = capgross.physics.p2.createMaterial('worldMaterial');
        var contactMaterial = capgross.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });
        capgross.physics.p2.setWorldMaterial(worldMaterial);
        bola.body.setMaterial(spriteMaterial);

        //AFEGIM LARGUEROS
        largero = capgross.add.sprite(capgross.width, capgross.height/2 +150,'Largero');
        largero2 = capgross.add.sprite(0, capgross.height/2 +150,'Largero');
        largero.scale.setTo(-0.35,0.25);
        largero2.scale.setTo(0.25);

        capgross.physics.arcade.collide(largero, bola);
        capgross.physics.arcade.collide(largero2, bola);

        //CURSOR 
        cursor = capgross.input.keyboard.createCursorKeys();
        derecha = capgross.input.keyboard.addKey(Phaser.Keyboard.D);
        izquierda = capgross.input.keyboard.addKey(Phaser.Keyboard.A);
        arriba = capgross.input.keyboard.addKey(Phaser.Keyboard.W);
        space = capgross.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        
        
        //mando 
        capgross.input.gamepad.start();

        mando = capgross.input.gamepad.pad1;


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

        personaje.body.immovable = true; 
    
    ///
    },
    update: function(){ 
        
        //Izqueirda
        if (cursor.left.isDown || (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)){
            personaje.body.velocity.x = -250;
        }else{personaje.body.velocity.x = 7;}
        //Derecha
        if (cursor.right.isDown || (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)){
            personaje.body.velocity.x = 250;
        }
        //Salto
        if ((cursor.up.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_X )) && capgross.time.now > jumpTimer && checkIfCanJump()){
            personaje.body.moveUp(600);
            jumpTimer = capgross.time.now + 0; 
        }
        if (derecha.isDown){
            personaje2.body.velocity.x = 250;
            
        }else{personaje2.body.velocity.x = -7;}
        if (izquierda.isDown){
            personaje2.body.velocity.x = -250;
            
        }
        if (arriba.isDown && capgross.time.now > jumpTimer2 && checkIfCanJump2()){
            personaje2.body.moveUp(600);
            jumpTimer2 = capgross.time.now + 0;
            
        }
        
         if( bola.position.x >= 1053 && sePuedeMarcar && bola.position.y > capgross.height/2 +150 ){

             destroySprite(miniatura1,miniatura2,txtPuntos1,txtPuntos2);
             puntos1++;
             txtPuntos2.text = puntos2;
         }
         if(bola.position.x <= 21 && sePuedeMarcar && bola.position.y > capgross.height/2 +150){

             destroySprite(miniatura1,miniatura2,txtPuntos1,txtPuntos2);            
             puntos2++;
             txtPuntos1.text = puntos1;
         }
       /* if(bola.position.y > (capgross.height/2 +150) && bola.position.x >= 1053){
            puntos1++;
            txtPuntos1.text = puntos1;
        }

        else if(bola.position.y > (capgross.height/2 +150) && bola.position.x <= 21){
            puntos2++;
            txtPuntos2.text = puntos2;
        }
*/
        

        personaje.body.immovable=true;
        personaje2.body.immovable=true;

    }
};

capgross.state.add('principal', estado_princ);
capgross.state.start('principal');

function destroySprite (sprite,sprite1,sprite2,sprite3) {
        sePuedeMarcar = false;
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
        bola.destroy();
        sePuedeMarcar = true;
        
        //AFEGIM PILOTA
        bola = capgross.add.sprite(1074/2,300,'pelota');
        capgross.physics.p2.enable([bola], true);
        bola.body.clearShapes();
        bola.body.setCircle(21);
        bola.body.data.gravityScale = 0.3;
        
    }
    
//SE PUEDE SALTAR??

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