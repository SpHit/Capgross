var capgross = new Phaser.Game(1074,724,Phaser.CANVAS,'inicio');

capgross.state.add('Menu', Menu);
capgross.state.add('Seleccion',Seleccion);
capgross.state.add('estado_princ',estado_princ);
capgross.state.add('Creditos', Creditos);
capgross.state.add('Ayuda',Ayuda);

capgross.state.start('Ayuda');