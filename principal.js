
//VICTOR
var p1 = "";
var jp2 = "";
var miniatura1;
var miniatura2;

var Menu = {
    preload: function() {
        capgross.load.image('background','img/campo.png');
        capgross.load.image('jugar','img/Buttons/Jugar.png');
        capgross.load.image('creditos','img/Buttons/Creditos.png');
        capgross.load.image('controles','img/Buttons/Controles.png');
        capgross.load.image('logo','img/logo.png');
    },

    create: function() {
        capgross.background = this.game.add.sprite(0,0,'background');
       
        var logo = capgross.add.image(250,
            20,'logo');

        var start = this.add.button(560,
            260,'jugar',this.iniciarcapgross,this);
            start.anchor.setTo(0.5);
        
        var jugar = this.add.button(560,
            410,'controles',this.ComoJugar,this);
            jugar.anchor.setTo(0.5);

        var creditos = this.add.button(560,
            550,'creditos',this.Creditoscapgross,this);
            creditos.anchor.setTo(0.5);
    },

    iniciarcapgross: function() {
        this.state.start('Seleccion');
    },

    Creditoscapgross: function() {
        this.state.start('Creditos');
    },

    ComoJugar: function() {
        this.state.start('Ayuda');
    }

};

var Seleccion = {
    preload: function() {
        capgross.load.image('background','img/campo.png');
        capgross.load.image('Alex','img/Jugadores/Alex.png');
        capgross.load.image('Jordi','img/Jugadores/Jordi.png');
        capgross.load.image('Eric','img/Jugadores/Eric.png');
        capgross.load.image('Victor','img/Jugadores/Victor.png');
        capgross.load.image('salir','img/salir.png');
        capgross.load.image('cruz','img/Buttons/cruz.png');
        capgross.load.image('p1','img/P1.png');
        capgross.load.image('ban1','img/P1BAN.png');
        capgross.load.image('ban2','img/P2BAN.png');
        capgross.load.image('play','img/PelotaPlay.png');


    },

    create: function() {
       
        capgross.background = this.game.add.sprite(0,0,'background');

        var ban1 = capgross.add.image(250,190,'ban1');
        var ban2 = capgross.add.image(250,290,'ban2');

        var alex = capgross.add.button(70,450,'Alex',this.Jugador,this);
        alex.scale.setTo(0.35,0.35);
        alex.text = 'Alex';

        var eric = capgross.add.button(320,450,'Eric',this.Jugador,this);
        eric.scale.setTo(0.35,0.35);
        eric.text = 'Eric';
        
        var victor = capgross.add.button(570,450,'Victor',this.Jugador,this);
        victor.scale.setTo(0.35,0.35);
        victor.text = 'Victor';

        var jordi = capgross.add.button(840,450,'Jordi',this.Jugador,this);
        jordi.scale.setTo(0.35,0.35);
        jordi.text = 'Jordi';


        var salir = capgross.add.button(15,15,'salir',this.Salir,this);
        salir.scale.setTo(0.10,0.10);

        var playp = capgross.add.button(800,175,'play',this.Pelota,this);
        playp.scale.setTo(0.30,0.30);

        capgross.add.text(320,50,"Seleccionar Jugador",{
            font: 'Arial',
            fontSize: 50,
            fill: 'red'
        });
    },

    Jugador: function(jugador) {        
            if (jugador.text == 'Jordi') {
               if (p1 == "") {
                p1 = "Jordi";
               } else if (jp2 == "") {
                jp2 = "Jordi";
               }

            } else if (jugador.text == 'Victor') {
                if (p1 == "") {
                    p1 = "Victor";
                   } else if (jp2 == "") {
                    jp2 = "Victor";
                   } 

            } else if (jugador.text == 'Eric') {
                if (p1 == "") {
                    p1 = "Eric";
                   } else if (jp2 == "") {
                    jp2 = "Eric";
                   } 

            } else if (jugador.text == 'Alex') {
                if (p1 == "") {
                    p1 = "Alex";
                   } else if (jp2 == "") {
                    jp2 = "Alex";
                   } 
            }

            

            capgross.add.text(475,197,p1,{
                font: 'Open Sans',
                fontSize: 45,
                fill: 'black',
                fontWeight: 'bold'
            });

            capgross.add.text(475,296,jp2,{
                font: 'Open Sans',
                fontSize: 45,
                fill: 'white',
                fontWeight: 'bold'
            });
    },

    Salir: function() {
        this.state.start('Menu');
        p1 = "";
        jp2 = "";
    },

    Pelota: function() {
        if (p1 == "" || jp2 == "") {
           
        } else {
            this.state.start('estado_princ');
        }
    }
}

var Creditos = {
    preload: function() {
        capgross.load.image('salir','img/salir.png');
        capgross.load.image('background','img/campo.png');
        capgross.load.image('credito','img/Creditos/creditoG.png');

        capgross.load.image('Alex','img/Jugadores/Alex.png');
        capgross.load.image('Jordi','img/Jugadores/Jordi.png');
        capgross.load.image('Eric','img/Jugadores/Eric.png');
        capgross.load.image('Victor','img/Jugadores/Victor.png');

    },

    create: function(){
        capgross.background = this.game.add.sprite(0,0,'background');
        var salir = capgross.add.button(15,15,'salir',this.Salir,this);
        salir.scale.setTo(0.10,0.10);

        var credito = capgross.add.image(580,
            20,'credito');
        credito.scale.setTo(0.45,0.45);
        
        var j1 = capgross.add.image(70,
            180,'Alex');
        j1.scale.setTo(0.40,0.40);

        var j2 = capgross.add.image(325,
            180,'Jordi');
        j2.scale.setTo(0.40,0.40);

        var j3 = capgross.add.image(70,
            450,'Eric');
        j3.scale.setTo(0.40,0.40);

        var j4 = capgross.add.image(325,
            450,'Victor');
        j4.scale.setTo(0.40,0.40);


    },

    Salir: function() {
        this.state.start('Menu');
    }
}
    
    var Ayuda = {
        preload: function() {
            capgross.load.image('salir','img/salir.png');
            capgross.load.image('background','img/campo.png');
            capgross.load.image('credito','img/Creditos/creditoG.png');
            capgross.load.image('titulo','img/Buttons/TituloControles.png');
            capgross.load.image('p1c','img/P1_controles.png');
            capgross.load.image('p2c','img/P2_controles.png');

            capgross.load.image('asdf','img/asdf.png');
            capgross.load.image('flechas','img/flechas.png');
    
        },
        
    
        create: function(){
            capgross.background = this.game.add.sprite(0,0,'background');
            var salir = capgross.add.button(15,15,'salir',this.Salir,this);
            salir.scale.setTo(0.10,0.10);

            var titulo = capgross.add.image(395,70,'titulo');
            
            var p1c = capgross.add.image(120,180,'p1c');
           
            var p2c = capgross.add.image(560,180,'p2c');

            var asdf = capgross.add.image(170,
                300,'asdf');
            asdf.scale.setTo(1.20,1.20);

            var flechas = capgross.add.image(600,
                300,'flechas');
                flechas.scale.setTo(1.20,1.20);
        },
    
        Salir: function() {
            this.state.start('Menu');
        }
    }
//JRODI
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
        //SALIR
        capgross.load.image('salir','img/salir.png');
        //CAMPO
        capgross.load.image('fondo', 'img/campo.png');
        //BOLA
        capgross.load.image('pelota', 'img/Pelota3.png');
        //MINIATURAS Y MARCADOR
        capgross.load.image('Miniatura1', 'img/EricR.png');
        capgross.load.image('Miniatura2', 'img/JordiR.png');
        capgross.load.image('Miniatura3', 'img/VictorR.png');
        capgross.load.image('Miniatura4', 'img/AlexR.png');
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

        //AFEGIM EL JUGADOR 2
        if (jp2 == 'Jordi') {
            personaje = capgross.add.sprite(1074/1.25 , 700, 'JordiRightIMG');
        } else if (jp2 == 'Victor') {
            personaje = capgross.add.sprite(1074/1.25 , 700, 'VictorRightIMG');
        } else if (jp2 == 'Eric') {
            personaje = capgross.add.sprite(1074/1.25 , 700, 'EricRightIMG');
        } else if (jp2 == 'Alex') {
            personaje = capgross.add.sprite(1074/1.25 , 700, 'AlexRightIMG');
        }

        
        // Enable physics, use "true" to enable debug drawing
        capgross.physics.p2.enable([personaje], true);
        personaje.body.clearShapes();
        personaje.body.loadPolygon("physicsRight", "JordiR");
        personaje.body.fixedRotation = true;

        //AFEGIM EL JUGADOR 1
        if (p1 == 'Jordi') {
            personaje2 = capgross.add.sprite(1074/5, 700, 'JordiLeftIMG');
        } else if (p1 == 'Victor') {
            personaje2 = capgross.add.sprite(1074/5, 700, 'VictorLeftIMG');
        } else if (p1 == 'Eric') {
            personaje2 = capgross.add.sprite(1074/5, 700, 'EricLeftIMG');
        } else if (p1 == 'Alex') {
            personaje2 = capgross.add.sprite(1074/5, 700, 'AlexLeftIMG');
        }
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
        marcador.scale.setTo(0.70);

        if (p1 == 'Jordi') {
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura2');
        } else if (p1 == 'Eric') {
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura1');
        } else if (p1 == 'Victor') {
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura3');
        } else if (p1 == 'Alex') {
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura4');
        }

        if (jp2 == 'Jordi') {
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura2');
        } else if (jp2 == 'Eric') {
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura1');
        } else if (jp2 == 'Victor') {
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura3');
        } else if (jp2 == 'Alex') {
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura4');
        }
       
       
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
     //SALIR
     var salir = capgross.add.button(15,15,'salir',this.Salir,this);
     salir.scale.setTo(0.15,0.15);
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

    },

    Salir: function() {
        this.state.start('Menu');
        p1 = "";
        jp2 = "";
    }
};

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
        //PARA QUE LA PELOTA BOTE
        var spriteMaterial = capgross.physics.p2.createMaterial('spriteMaterial');
        var worldMaterial = capgross.physics.p2.createMaterial('worldMaterial');
        var contactMaterial = capgross.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });
        capgross.physics.p2.setWorldMaterial(worldMaterial);
    
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
        
        bola.body.setMaterial(spriteMaterial);
        
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