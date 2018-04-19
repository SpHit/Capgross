var p1 = "";
var p2 = "";
var alex_error;
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
var sePuedeMarcar = true;

var pad1;

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
        capgross.load.image('error','img/error.png');
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
               } else if (p2 == "") {
                p2 = "Jordi";
               }

            } else if (jugador.text == 'Victor') {
                if (p1 == "") {
                    p1 = "Victor";
                   } else if (p2 == "") {
                    p2 = "Victor";
                   } 

            } else if (jugador.text == 'Eric') {
                if (p1 == "") {
                    p1 = "Eric";
                   } else if (p2 == "") {
                    p2 = "Eric";
                   } 

            } else if (jugador.text == 'Alex') {
                if (p1 == "") {
                    p1 = "Alex";
                   } else if (p2 == "") {
                    p2 = "Alex";
                   } 
            }

            

            capgross.add.text(475,197,p1,{
                font: 'Open Sans',
                fontSize: 45,
                fill: 'black',
                fontWeight: 'bold'
            });

            capgross.add.text(475,296,p2,{
                font: 'Open Sans',
                fontSize: 45,
                fill: 'white',
                fontWeight: 'bold'
            });
    },

    Salir: function() {
        this.state.start('Menu');
        p1 = "";
        p2 = "";
    },

    Pelota: function() {
        if (p1 == "" || p2 == "") {
           
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

var estado_princ = {
    
    preload: function(){
        capgross.load.image('fondo', 'img/campo.png');
        capgross.load.image('pelota', 'img/Pelota.png');
        
        capgross.load.image('jugador1', 'img/Jugadores/EricR.png');
        capgross.load.image('jugador2', 'img/Jugadores/JordiR.png');
        capgross.load.image('jugador3', 'img/Jugadores/VictorR.png');
        capgross.load.image('jugador4', 'img/Jugadores/AlexR.png');

        capgross.load.image('Miniatura1', 'img/Jugadores/EricR.png');
        capgross.load.image('Miniatura2', 'img/Jugadores/JordiR.png');
        capgross.load.image('Miniatura3', 'img/Jugadores/VictorR.png');
        capgross.load.image('Miniatura4', 'img/Jugadores/AlexR.png');

        capgross.load.image('Marcador', 'img/Marcador.png');
        capgross.load.image('salir','img/salir.png');

        capgross.load.image('Largero', 'img/Largero.png');
    },
    

    create: function(){
        capgross.add.tileSprite(0, 0, 1074, 724, 'fondo');
        marcador = capgross.add.sprite(340, -50, 'Marcador');
        marcador.scale.setTo(0.70);
        
        var salir = capgross.add.button(15,15,'salir',this.Salir,this);
        salir.scale.setTo(0.10,0.10);

        largero = capgross.add.sprite(capgross.width, capgross.height/2 +150,'Largero');
        largero2 = capgross.add.sprite(0, capgross.height/2 +150,'Largero');
        
        
        largero.scale.setTo(-0.35,0.25);
        largero2.scale.setTo(0.25);

        if (p1 == "Eric") {
            personaje2 = capgross.add.sprite(600, capgross.height, 'jugador1');
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura1');
            miniatura1.scale.setTo(-0.35,0.35);
        } else if (p1 == "Jordi"){
            personaje2 = capgross.add.sprite(600, capgross.height, 'jugador2');
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura2');
            miniatura1.scale.setTo(-0.35,0.35);
        } else if (p1 == "Victor"){
            personaje2 = capgross.add.sprite(600, capgross.height, 'jugador3');
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura3');
            miniatura1.scale.setTo(-0.35,0.35);
        } else if (p1 == "Alex"){
            personaje2 = capgross.add.sprite(600, capgross.height, 'jugador4');
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura4');
            miniatura1.scale.setTo(-0.35,0.35);
        }

        if (p2 == "Eric") {
            personaje = capgross.add.sprite(850, capgross.height, 'jugador1');
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura1');
            miniatura2.scale.setTo(0.35);
        } else if (p2 == "Jordi"){
            personaje = capgross.add.sprite(850, capgross.height, 'jugador2');
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura2');
            miniatura2.scale.setTo(0.35);
        } else if (p2 == "Victor"){
            personaje = capgross.add.sprite(850, capgross.height, 'jugador3');
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura3');
            miniatura2.scale.setTo(0.35);
        } else if (p2 == "Alex"){
            personaje = capgross.add.sprite(850, capgross.height, 'jugador4');
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura4');
            miniatura2.scale.setTo(0.35);
        }
        
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


        txtPuntos1 = capgross.add.text(520, 50, "0", {font:"45px Open Sans", fill:"white"});
        txtPuntos2 = capgross.add.text(580, 50, "0", {font:"45px Open Sans", fill:"white"});
        txtPuntos1.fontWeight = 'bold';
        txtPuntos2.fontWeight = 'bold';
        
        miniatura1.inputEnabled = true;
        
        miniatura1.input.useHandCursor = true;
        
        capgross.input.gamepad.start();
    
        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
        pad1 = capgross.input.gamepad.pad1;
    
    },
    update: function(){

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
        
        capgross.physics.arcade.collide(largero, ball);
        capgross.physics.arcade.collide(largero2, ball);
        
        if(ball.body.blocked.left && sePuedeMarcar && ball.body.position.y > capgross.height/2 +150 ){

            destroySprite(miniatura1,miniatura2,txtPuntos1,txtPuntos2);
            puntos2++;
            txtPuntos2.text = puntos2;
        }
        if(ball.body.blocked.right && sePuedeMarcar && ball.body.position.y > capgross.height/2 +150){

            destroySprite(miniatura1,miniatura2,txtPuntos1,txtPuntos2);            
            puntos1++;
            txtPuntos1.text = puntos1;
        }

        ball.angle += 1;
        
        personaje.body.immovable=true;
        personaje2.body.immovable=true;

    },

    Salir: function() {
        this.state.start('Menu');
        p1 = '';
        p2 = '';
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

        if (p1 == "Eric") {
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura1');
            miniatura1.scale.setTo(-0.35,0.35);
        } else if (p1 == "Jordi"){
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura2');
            miniatura1.scale.setTo(-0.35,0.35);
        } else if (p1 == "Victor"){
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura3');
            miniatura1.scale.setTo(-0.35,0.35);
        } else if (p1 == "Alex"){
            miniatura1 = capgross.add.sprite(500, 52, 'Miniatura4');
            miniatura1.scale.setTo(-0.35,0.35);
        }

        if (p2 == "Eric") {
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura1');
            miniatura2.scale.setTo(0.35);
        } else if (p2 == "Jordi"){
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura2');
            miniatura2.scale.setTo(0.35);
        } else if (p2 == "Victor"){
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura3');
            miniatura2.scale.setTo(0.35);
        } else if (p2 == "Alex"){
            miniatura2 = capgross.add.sprite(615, 52, 'Miniatura4');
            miniatura2.scale.setTo(0.35);
        }

        ball.position.x = capgross.world.centerX;
        ball.position.y = capgross.world.centerY;
        sePuedeMarcar = true;
    }
    
    var Ayuda = {
        preload: function() {
            capgross.load.image('salir','img/salir.png');
            capgross.load.image('background','img/campo.png');
            capgross.load.image('credito','img/Creditos/creditoG.png');
            capgross.load.image('titulo','img/Buttons/TituloControles.png');
            capgross.load.image('p1c','img/P1_controles.png');
            capgross.load.image('p2c','img/P2_controles.png');
    
        },
    
        create: function(){
            capgross.background = this.game.add.sprite(0,0,'background');
            var salir = capgross.add.button(15,15,'salir',this.Salir,this);
            salir.scale.setTo(0.10,0.10);

            var titulo = capgross.add.image(395,70,'titulo');
            
            var p1c = capgross.add.image(120,180,'p1c');
           
            var p2c = capgross.add.image(560,180,'p2c');
        },
    
        Salir: function() {
            this.state.start('Menu');
        }
    }