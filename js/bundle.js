(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';






 function Enemy (game, image, frame, x, y) {
  Phaser.Sprite.call(this, game, x, y, image, frame);
  game.physics.arcade.enable(this);
  this.body.enable = true;
  this.body.gravity.y = 2000;
  this.body.gravity.x = 0;
  this.body.collideWorldBounds = true;
  this.body.bounce.x = 0.1;
  this.anchor.setTo(0.5, 0.5);
  //this.scale.setTo(0.85,0.85);
  var run = this.animations.add('run', [6, 7, 8], 10, false);
  var runLeft = this.animations.add('runLeft', [3, 4, 5], 10, false);
  var iddle = this.animations.add('iddle', [4, 7], 1, true);

}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.constructor = Enemy;

Enemy.prototype.update = function (rushX, rushY, stopTrigger){

  // SEGUIR AL JUGADOR SI ESTAN EN SU RANGO (OFFSET--> RUSH.X y RUSH.Y)

 var offsetX = 200;
 var offsetY = 150;

 if((this.x + offsetX >= rushX && this.x < rushX) ){

   if((this.y - offsetY <= rushY && this.y >= rushY) || (this.y + offsetY >= rushY && this.y <= rushY)){
     this.body.velocity.x = 250;

   }
   else this.body.velocity.x = 0;

 }
 else if((this.x - offsetX <= rushX && this.x > rushX)){

   if((this.y - offsetY <= rushY && this.y >= rushY) || (this.y + offsetY >= rushY && this.y <= rushY)){
     this.body.velocity.x = -250;

   }
   else this.body.velocity.x = 0;

}
else if (this.x === rushX) this.body.velocity.x = 0;

this.SetAnimations();

}﻿

Enemy.prototype.SetAnimations = function(){
  if(this.body.velocity.x < 0)  this.animations.play('runLeft');
  else if (this.body.velocity.x > 0)  this.animations.play('run');
  else this.animations.play('iddle');
}

module.exports = Enemy;

},{}],2:[function(require,module,exports){
var end = {
    create: function () {
        console.log("You win!");
        this.game.world.setBounds(0,0,800,600);
        var wallpaper2 = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY,
                                        'wallpaper2');
        wallpaper2.anchor.setTo(0.5, 0.5);
        var button = this.game.add.button(600, 300,
                                          'buttonReset',
                                          this.actionOnClick,
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        //var goText = this.game.add.text(400, 100, "You win!");
        //var text = this.game.add.text(0, 0, "Reset Game");
        //text.anchor.set(0.5);
        //goText.anchor.set(0.5);
        //button.addChild(text);


        var buttonMenu = this.game.add.button(250, 300,
                                          'buttonMenu',
                                          this.menuOnClick,
                                          this, 2, 2, 4);
        buttonMenu.anchor.set(0.5);
        //var textMenu = this.game.add.text(0, 0, "Return Main Menu");
        //textMenu.anchor.set(0.5);
        //buttonMenu.addChild(textMenu);

    },



    actionOnClick: function(){
        this.game.state.start('play');
    },
    menuOnClick: function(){
        this.game.state.start('menu');
    }

};


module.exports = end;
﻿

},{}],3:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        this.game.world.setBounds(0,0,800,600);
        var wallpaper = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY,
                                        'wallpaper');
        wallpaper.anchor.setTo(0.5, 0.5);
        var button = this.game.add.button(400, 500,
                                          'buttonReset',
                                          this.actionOnClick,
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        button.alpha = 0.9;


        //var goText = this.game.add.text(400, 100, "GameOver");
        var goImage = this.game.add.sprite(400, 100, 'go');
        goImage.anchor.set(0.5);
        //var text = this.game.add.text(0, 0, "Reset");
        //text.anchor.set(0.5);
        //goText.anchor.set(0.5);
        //button.addChild(text);


        var buttonMenu = this.game.add.button(400, 300,
                                          'buttonMenu',
                                          this.menuOnClick,
                                          this, 2, 2, 4);
        buttonMenu.anchor.set(0.5);
        buttonMenu.alpha = 0.9;
        //var textMenu = this.game.add.text(0, 0, "Main Menu");
        //textMenu.anchor.set(0.5);
        //buttonMenu.addChild(textMenu);

    },

    //TODO 7 declarar el callback del boton.

    actionOnClick: function(){
        this.game.state.start('play');
    },
    menuOnClick: function(){
        this.game.state.start('menu');
    }

};


module.exports = GameOver;

},{}],4:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

var gameOver = require ('./gameover_scene.js');
var playScene = require ('./play_scene.js');
var menuScene = require ('./menu_scene.js');
var end = require ('./end.js');




var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    //this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('buttonStart', 'images/START.png');
    this.game.load.image('buttonReset', 'images/RESET.png');
    this.game.load.image('buttonMenu', 'images/MAINMENU.png');
    this.game.load.image('logo', 'images/FondoDef.png');

  },

  create: function () {
    //this.game.state.start('preloader');
    this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000"

    this.load.onLoadStart.add(this.loadStart, this);

    this.game.load.image('wallpaper', 'images/wallpaperZOMBIE.png');
    this.game.load.image('wallpaper2', 'images/YouWin.png');
    this.game.load.image('go', 'images/YouDie.png');
    this.game.load.image('tiles', 'images/simples_pimples.png');
	  this.game.load.image('tilesFiccion', 'images/tiles3.png');
	  this.game.load.image('tilesPared', 'images/tiles2.png');
    this.game.load.tilemap('tilemap', 'images/mapa.json', null, Phaser.Tilemap.TILED_JSON);
    //this.game.load.atlas('rush', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.spritesheet('rush', 'images/Hero1.png', 80, 124, 16);
	  this.game.load.image('powerbar', 'images/RedBar.png');
	  this.game.load.image('pauseScreen', 'images/pause_screen.png');
	  this.game.load.image('winTrigger', 'images/win_trigger.png');
	  this.game.load.image('stopTrigger', 'images/stopTrigger.png');
	  this.game.load.image('laserBarrier','images/laser.png');
	  this.game.load.image('coreItem', 'images/core.png');
	  this.game.load.image('bloodLayer', 'images/sangre.png');
	  this.game.load.image('bloodButton', 'images/botonSangre.png')
	  this.game.load.audio('backgroundTheme', ['audio/BackgroundTheme.mp3', 'audio/BackgroundTheme.ogg']);
	  this.game.load.audio('propulsion', ['audio/enginehum3.ogg', 'audio/enginehum.mp3']);
	  this.game.load.audio('zombies', 'audio/zombies.ogg');

    this.game.load.spritesheet('zombie', 'images/ZombieSheet.png', 64, 64, 12);
    this.load.onLoadComplete.add(this.loadComplete,this);



  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },
  loadComplete: function(){
  	this.game.state.start('play');

  },



    update: function(){
        this._loadingBar
    }
};


var wfconfig = {

    active: function() {
        console.log("font loaded");
        init();
    },

    google: {
        families: ['Sniglet']
    }

};



window.onload = function () {

 	WebFont.load(wfconfig);


};

function init(){
 var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

                game.state.add('boot',BootScene);
                game.state.add('menu',menuScene);
                game.state.add('preloader',PreloaderScene);
                game.state.add('play',playScene);
                game.state.add('gameOver', gameOver);
                game.state.add('end', end);
                game.state.start('boot');


};

},{"./end.js":2,"./gameover_scene.js":3,"./menu_scene.js":5,"./play_scene.js":6}],5:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.game.world.setBounds(0,0,800,600);
        var logo = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY,
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY+50,
                                               'buttonStart',
                                               this.actionOnClick,
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        buttonStart.alpha = 0.90;
        //buttonStart.scale.setTo(0.25, 0.25);
        //var style = { font: "40px Arial", fill: "#000000", align: "center"};
        //var textStart = this.game.add.text(0, 0, "Start", style);
        //textStart.font = 'Sniglet';
        //textStart.anchor.set(0.5);
        //buttonStart.addChild(textStart);
    },

    actionOnClick: function(){
        this.game.state.start('preloader');
    }
};

module.exports = MenuScene;

},{}],6:[function(require,module,exports){
'use strict';

//var Pool = require('./Pool');
var Enemy = require('./Enemy');
//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}



//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 60, //altura máxima del salto.
	  _jetPackPower: 700,
	  _jetPack: 700,
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
	  _doubleJump: false,	//Booleano que nos permite ver si ya se ha realizado el doble salto.
	  _alreadyJump: false, //Booleano que nos permite ver si ya se ha realizado el primer salto.
	  _jetPackText: '100 %',
	  _pause: true,
	  _continueButton: {},
	  _buttonMenu: {},
    _enemies: {},//[]
    //_flipped : false,
    //_pool: {},
    //_time_til_spawn: Math.random()*3000 + 2000,//Controla el tiempo de spawn
    //_last_spawn_time: 1000,
    //_timer: null,
    //_spawn_time: Math.random() * (25000-20000) + 20000,//(15s, 10s] Este tiempo hay que hacer que dependa de la velocidad del personaje
    //o del tiempo que queda para que acabe la partida si lo hacemos contrarreloj.
	  _pauseScreen:{}, //Sprite de Pause.
	  _pausex: 0, //Variables que utilizamos para mover el sprite de pause con la camara.
	  _pauseY: 0,
	  _winTrigger: {},//Trigger que controla el win del player.
    _rushX: null,
    _rushY: null,
    _stopTrigger: {},
    _laserBarrier: {},//Sprite de barrera laser.
    _coreItem: {},//Sprite del item que hay que recoger y que abre la puerta.
    _life: 0,//Vida del personaje.
    _bloodLayer: {},//Sprite que indica al jugador como va de vida.
	_mainTheme: {},
	_propulsionSound: {},
	_easyModeButton: {},
	_hardModeButton: {},
	_zombiesSound: {},

//--------------------------------------------------------------------------------

    //Método constructor...
  create: function () {
    //this._rush = this.game.add.sprite(30,1350, 'rush');
    //------------------------------------------------
    //-----------TIMER--------------------------------
    //this._timer = this.game.time.create(false);
    //this._timer.loop(this._spawn_time, this.spawnEnemies, this);
    //this._timer.start();
    //------------------------------------------------

    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('patrones','tiles');
    this.map.addTilesetImage('patrones2', 'tilesPared');
    this.map.addTilesetImage('patrones3', 'tilesFiccion');
    //Creacion de las layers
    this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('Estructuras');
    //plano de muerte
    this.death = this.map.createLayer('Death');
	  //Añadimos el sprite de sangre.
	  this._bloodLayer = this.add.sprite(70,3350,'bloodLayer');
    this._bloodLayer.scale.setTo(0.3,0.3);
	  this._bloodLayer.alpha = 0;
	  //Añadimos al jugador.
    this._rush = this.game.add.sprite(70, 3350, 'rush', 1);
    this._rush.scale.setTo(0.5, 0.5);
	  //Añadimos el sprite de pause.
    this._pauseScreen = this.add.sprite(70,3350,'pauseScreen');
    this._pauseScreen.scale.setTo(2.5,2.8);
    this._pauseScreen.alpha = 0.8;
    this._pauseScreen.x = this.game.camera.x;
    this._pauseScreen.y = this.game.camera.y;
	  //Añadimos el trigger de victoria.
    this._winTrigger = this.add.sprite(70, 680,'winTrigger');
    this._winTrigger.alpha = 0;
	  //Añadimos el core item
	  this._coreItem = this.add.sprite(300, 3200, 'coreItem');
	  this._coreItem.scale.setTo(0.6,0.6);
	  this.game.physics.arcade.enable(this._coreItem);
	  this._coreItem.body.immovable = true;
    //"Triggers" para detener a los zombies en ciertos puntos del mapa
    this._stopTrigger = this.game.add.group();
    this._stopTrigger = this.game.add.physicsGroup();
    this._stopTrigger.enableBody = true;
    this._stopTrigger.physicsBodyType = Phaser.Physics.ARCADE
    //this._stopTrigger.setAll('enable.body', true);
    this._stopTrigger.create(950, 3350, 'stopTrigger');
    this._stopTrigger.create(1100, 3350, 'stopTrigger');
    this._stopTrigger.create(2008, 3093, 'stopTrigger');
    this._stopTrigger.create(767, 2709, 'stopTrigger');
    this._stopTrigger.create(1586, 2853, 'stopTrigger');
    this._stopTrigger.create(388, 2517, 'stopTrigger');
    this._stopTrigger.create(2102, 2277, 'stopTrigger');
    this._stopTrigger.create(1636, 1893, 'stopTrigger');
    this._stopTrigger.create(1399, 1893, 'stopTrigger');
    this._stopTrigger.create(341, 1557, 'stopTrigger');
    this._stopTrigger.create(2065, 1557, 'stopTrigger');
    this._stopTrigger.setAll('body.immovable', true);
    this._stopTrigger.setAll('anchor.x', 0.5);
    this._stopTrigger.setAll('anchor.y', 0.5);
    this._stopTrigger.setAll('alpha', 0);
	  //Añadimos el indicador de potencia del jetPack
	  this._jetPackText = this.game.add.text(-80, -20, "100 %", { font: "65px Arial", fill: "#002AFA", align: "center" });
	  this._jetPackText.font = 'Sniglet';
	  this._rush.addChild(this._jetPackText);
	  this._jetPackText.scale.setTo(0.4,0.4);
    //Colisiones con el plano de muerte y con suelo.
    this.map.setCollisionBetween(1, 5000, true, 'Death');
    this.map.setCollisionBetween(1, 5000, true, 'Estructuras');
	  //this.backgroundLayer.visible = false;
    //Cambia la escala a x3.
    this.groundLayer.setScale(3,3);
    this.backgroundLayer.setScale(3,3);
    this.death.setScale(3,3);

	this._mainTheme = this.game.add.audio('backgroundTheme');
	this._propulsionSound = this.game.add.audio('propulsion');
	this._zombiesSound = this.game.add.audio('zombies');
	this.game.sound.setDecodedCallback([this._mainTheme, this._propulsionSound, this._zombiesSound], this.startMusic, this);
    //this.groundLayer.resizeWorld(); //resize world and adjust to the screen

    //nombre de la animación, frames, framerate, isloop
    var run = this._rush.animations.add('run', [8, 9, 10, 11], 10, false);
    var runLeft = this._rush.animations.add('runLeft', [4, 5, 6, 7], 10, false);
    var iddle = this._rush.animations.add('stop',[0, 1, 2], 3, true);
    var jump = this._rush.animations.add('jump',[12, 13, 14, 15], 0, true);




//CODIGO DE ENEMIGOS  ----------------------------------------------------------------------
    this._enemies = this.game.add.group();

    //this._enemies = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
    //this._enemies.setAll('body.collideWorldBounds', true);
    //this.spawnEnemies(890, 3350);
    this.spawnEnemies(1247, 3350);
    //this.spawnEnemies(1700, 3350);
    this.spawnEnemies(1274, 2803);
    this.spawnEnemies(1950, 3350);
    this.spawnEnemies(2105, 2871);
    this.spawnEnemies(889, 2679);
    this.spawnEnemies(777, 3063);
    this.spawnEnemies(1117, 3063);
    this.spawnEnemies(1467, 3063);
    this.spawnEnemies(1862, 3063);
    this.spawnEnemies(750, 2487);
    this.spawnEnemies(1100, 2487);
    this.spawnEnemies(1570, 2007);
    this.spawnEnemies(1167, 2055);
    this.spawnEnemies(1805, 2247);
    this.spawnEnemies(2057, 1863);
    this.spawnEnemies(350, 1863);
    this.spawnEnemies(1179, 1863);
    this.spawnEnemies(1555, 1507);
    this.spawnEnemies(1700, 1507);
    this.spawnEnemies(900, 1699);
	  //Barrera laser
	  this._laserBarrier = this.add.sprite(1376,1932, 'laserBarrier');
	  this._laserBarrier.scale.setTo(1.6,1);
	  this.game.physics.arcade.enable(this._laserBarrier);
	  this._laserBarrier.body.immovable = true;
	  this._laserBarrier.body.moves = false;

	  //Añadir los botones de pause.
	  this._pauseX = this.game.camera.x + (this.camera.width / 3);
	  this._pauseY = this.game.camera.y - (this.camera.height / 2);
	  this._continueButton = this.game.add.button(0 , 0,
							  'button',
							  this.continueOnClick,
							  this, 2, 1, 0);
    this._continueButton.anchor.set(0.5);

	  var text = this.game.add.text(0, 0, "Continue");
	  text.anchor.set(0.5);

	  this._continueButton.addChild(text);


	  this._buttonMenu = this.game.add.button(0, 0,
									  'button',
									  this.exitOnClick,
									  this, 2, 1, 0);
	  this._buttonMenu.anchor.set(0.5);
	  var textMenu = this.game.add.text(0, 0, "Main Menu");
	  textMenu.anchor.set(0.5);
	  this._buttonMenu.addChild(textMenu);
	  this._continueButton.visible = false;
	  this._buttonMenu.visible = false;
	  this._continueButton.inputEnable = false;
	  this._buttonMenu.inputEnable = false;
	  //Añadimos el sprite de la sangre.
	  this._bloodLayer = this.add.sprite(70,3350,'bloodLayer');
    this._bloodLayer.scale.setTo(0.3,0.3);
	  this._bloodLayer.alpha = 0;
	  //Botones de dificultad
    this._easyModeButton = this.game.add.button(200, 3400,
							  'bloodButton',
							  this.easyModeAction,
							  this, 2, 1, 0);
    this._easyModeButton.anchor.set(0.5);

	  var text = this.game.add.text(0, 0, "Easy");
	  text.anchor.set(0.5);

	this._easyModeButton.addChild(text);
	this._easyModeButton.scale.setTo(0.8,0.8);
    this._hardModeButton = this.game.add.button(550, 3400,
							  'bloodButton',
							  this.hardModeAction,
							  this, 2, 1, 0);
    this._hardModeButton.anchor.set(0.5);

	  var text = this.game.add.text(0, 0, "Hard");
	  text.anchor.set(0.5);

	  this._hardModeButton.addChild(text);
	  this._hardModeButton.scale.setTo(0.8,0.8);
	  this.configure();
  },

    //IS called one per frame.
  update: function () {
    //Chekeamos la pausa en el update.
	  this.checkPause();
	  //Comprobamos las colisiones.
	  this.game.physics.arcade.collide(this._enemies, this.groundLayer);
	  this.game.physics.arcade.collide(this._rush, this._laserBarrier);
	  this.game.physics.arcade.collide(this._rush, this.groundLayer);
		//Si la variable de pause está a false, si hay que comprobar el bucle del juego.
	  if (this._pause === false){
      var moveDirection = new Phaser.Point(0, 0);
      var movement = this.GetMovement();
      //transitions
      switch(this._playerState){
        case PlayerState.STOP:
        case PlayerState.RUN:
        if(this.isJumping()){
          this._playerState = PlayerState.JUMP;
					//this._alreadyJump = true;
          this._initialJumpHeight = this._rush.y;
          this._rush.animations.play('jump');
        }else{
          if(movement == Direction.RIGHT){
            this._playerState = PlayerState.RUN;
            /*if(this.flipped) this._rush.scale.setTo(-0.5, 0.5);*/
            this._rush.animations.play('run');
          }
          else if(movement == Direction.LEFT){
            this._playerState = PlayerState.RUN;
            /*this.flipped = true;
            if(this.flipped){
              // this._rush.scale.setTo(-0.5, 0.5);*/
              this._rush.animations.play('runLeft');
          }else{
            this._playerState = PlayerState.STOP;
              this._rush.animations.play('stop');
            }
          }
          break;
          case PlayerState.JUMP:
          if (!this.doubleJump()){
            var currentJumpHeight = this._rush.y - this._initialJumpHeight;
            this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                      ? PlayerState.JUMP : PlayerState.FALLING;

            this._alreadyJump = true;
            break;
				  }else {
            if (this._jetPack <= 15) this._playerState = PlayerState.FALLING;
            else this._playerState = PlayerState.JUMP;
				  }
          case PlayerState.FALLING:
          if(this.isStanding()){
            //this._doubleJump = false;
  				  this._jetPack = this._jetPackPower;
				  this._alreadyJump = false;
				  this._propulsionSound.mute = true;
            if(movement !== Direction.NONE){
              this._playerState = PlayerState.RUN;
              this._rush.animations.play('run');
            }else{
              this._playerState = PlayerState.STOP;
              this._rush.animations.play('stop');
            }
          }
          else if (this.doubleJump()){
            this._playerState = PlayerState.JUMP;
				  }
          break;
        }
        //States
        switch(this._playerState){
          case PlayerState.STOP:
          moveDirection.x = 0;
          break;
          case PlayerState.JUMP:
          case PlayerState.RUN:
          case PlayerState.FALLING:
          if(movement === Direction.RIGHT){
            moveDirection.x = this._speed;
                   /* if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;*/
          }
          else if(movement === Direction.LEFT){
            moveDirection.x = -this._speed;
                    /*if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1;*/
          }
          if(this._playerState === PlayerState.JUMP){
            if (this._rush.body.blocked.up || this._rush.body.touching.up){
            this._playerState = PlayerState.FALLING;
            }
            else {
              moveDirection.y = -this._jumpSpeed;

            }
          }
          if(this._playerState === PlayerState.FALLING){
            moveDirection.y = 0;
          }
          break;
        }
        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();
        //Actualizamos el sprite de sangre para que esté centrado en la pantalla y se muestre según la vida.
        this.updateBloodLayer();
        //Comprobar colision con el item. No
        this.checkItem();
        //Actualizamos el indicador de jetPack.
        this.jetPackPower();
        //Llamamos a las colisiones con el enemigo.
        this.onCollisionEnemy();
        //Comprobamos si el jugador a ganado ya.
        this.checkPlayerWin();
        this._rushX = this._rush.x;
        this._rushY = this._rush.y;

        /*if(!this.game.physics.arcade.collide(this._enemies, this._stopTrigger)){
          this._enemies.forEach(function (zombie){
            zombie.update(this.game, this._rushX, this._rushY, this._stopTrigger);
          },this);
      }*/

        this._enemies.forEach(function (zombie){
          if(!this.game.physics.arcade.collide(zombie, this._stopTrigger)){
            zombie.update(/*this.game,*/ this._rushX, this._rushY, this._stopTrigger);
          }
        },this);
		}
  },

  onPlayerDie: function(){
      //TODO 6 Carga de 'gameOver';
      this.game.state.start('gameOver');
	  this._mainTheme.stop();
	  this._zombiesSound.stop();
	  this._propulsionSound.stop();
		

  },

  onPlayerWin: function(){
    this.game.state.start('end');
	this._mainTheme.stop();
	this._zombiesSound.stop();
	this._propulsionSound.stop();
		
  },

  checkPlayerFell: function(){
      if(this.game.physics.arcade.collide(this._rush, this.death))
          this.onPlayerDie();
  },

	checkPlayerWin: function(){

		if(this.game.physics.arcade.collide(this._rush, this._winTrigger))
            this.onPlayerWin();

	},

  isStanding: function(){
      return this._rush.body.blocked.down || this._rush.body.touching.down
  },

  isJumping: function(){

      return ( this.game.input.keyboard.downDuration(Phaser.Keyboard.UP,5));
  },

  GetMovement: function(){
      var movement = Direction.NONE
      //Move Right
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
          movement = Direction.RIGHT;
      }
      //Move Left
      if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
          movement = Direction.LEFT;
      }
      return movement;
  },
  //configure the scene
  configure: function(){
    //Start the Arcade Physics systems
    //this.game.world.setBounds(0, 0, 2400, 160);
	  this.game.world.setBounds(0, 0, 2200, 7550);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#a9f0ff';
    this.game.physics.arcade.enable(this._rush);
	 this.game.physics.arcade.enable(this._winTrigger);
    this._rush.anchor.setTo(0.5, 0.5);
    this._rush.body.bounce.y = 0.2;
    this._rush.body.gravity.y = 20000;
    this._rush.body.gravity.x = 0;
    this._rush.body.velocity.x = 0;
    this.game.camera.follow(this._rush);
    this.game.camera.setSize(700,500)

  },
  //move the player
  movement: function(point, xMin, xMax){
      this._rush.body.velocity = point;// * this.game.time.elapseTime;

      if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
          this._rush.body.velocity.x = 0;
  },

  //TODO 9 destruir los recursos tilemap, tiles y logo.
  destroyResources: function(){
    this.tilemap.destroy();
    this.tiles.destroy();
	this.tilesFiccion.destroy();
	this.tilesPared.destroy();
	this._mainTheme.destroy();
	this.game.cache.removeSound('backgroundTheme');
	this._propulsionSound.destroy();
	this.game.cache.removeSound('propulsion');
    this.game.world.setBounds(0,0,800,600);
  },

	jetPackPower : function(){
		var power = ((this._jetPack / this._jetPackPower) * 100);
			this._jetPackText.text = Math.round(power) + ' %';
		if(power > 50)
		  this._jetPackText.fill = '#002AFA';

		if(power <= 50 && power > 30)
		  this._jetPackText.fill = '#F2FA00';
			if(power <=30)
				this._jetPackText.fill = '#FA0000';

	},

	checkPause : function () {
    if(this.game.input.keyboard.downDuration(Phaser.Keyboard.P,10)){
           // Si el juego no esta pausado, lo ponemos en pause y mostramos los botones.
			if (this._pause === false){
				this._pause = true;
				this._mainTheme.mute = true;
				this._rush.body.bounce.y = 0;
				this._rush.body.allowGravity = false;
				this._rush.body.velocity.y = 0;
				this._rush.body.velocity.x = 0;
				this.stopEnemies();

        //-------------------TIMER--------------------------------------
        //this._timer.pause();
        //--------------------------------------------------------------


				//Añadir los botones y esas cosas.
				var x,y;
				x = this.game.camera.x + (this.camera.width / 1.7);
				y = this.game.camera.y + (this.camera.height / 2);
				this._continueButton.x = x;
				this._continueButton.y = (y + this.game.camera.height/6.6)

				this._buttonMenu.x = x;
				this._buttonMenu.y = (y + this.game.camera.height/3);
				this._continueButton.visible = true;
				this._continueButton.alpha = 0;
				this._buttonMenu.visible = true;
				this._buttonMenu.alpha = 0;
				this._continueButton.inputEnable = true;
				this._buttonMenu.inputEnable = true;
				this._pauseScreen.visible = true;
				this._pauseScreen.x = this.game.camera.x - 50;
				this._pauseScreen.y = this.game.camera.y;
			}

			else {
				this.continueOnClick();
			}
    }
	},

	continueOnClick: function (){
		//Mostramos los botones y reseteamos el juego.
		this._pause = false;
		this._mainTheme.mute = false;

		this._continueButton.visible = false;
		this._buttonMenu.visible = false;
		this._pauseScreen.visible = false;

		this._rush.body.bounce.y = 0.2;
		this._rush.body.allowGravity = true;
		this._rush.body.gravity.y = 20000;
    //-----------------TIMER--------------------------------
    //this._timer.resume();
    //------------------------------------------------------

	},

	exitOnClick: function (){
    this._pause = false;
		this.game.state.start('menu');

	},


	doubleJump: function(){
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && /*!this._doubleJump*/ this._jetPack >= 15 && this._alreadyJump){
      this._initialJumpHeight = this._rush.y;

			this._propulsionSound.mute = false;
			this._jetPack -= 5;
			return true;
		}
		
    return false;
	
	},

  //CODIGO DE ENEMIGOS
  onCollisionEnemy: function() {

    if(this.game.physics.arcade.collide(this._rush, this._enemies)){

      if(this._life > 1) { this._life -= 2; }
      else this.onPlayerDie();

    }
	else {
		if (this._life < 100)this._life += 0.5;
	}
  },

  stopEnemies: function() {

	  this._enemies.forEach(function (zombie){
            zombie.body.velocity.x = 0;
			zombie.body.velocity.y = 0;
          },this);


  },

  checkItem: function(){
	  if(this.game.physics.arcade.collide(this._rush, this._coreItem)){
			this._laserBarrier.destroy();
			this._coreItem.destroy();
		}
  },

  updateBloodLayer: function(){

	  var x, y;
	  x = this.game.camera.x;
	  y = this.game.camera.y;
	  this._bloodLayer.x = x;
	  this._bloodLayer.y = y;
	  this._bloodLayer.alpha = 1 - (this._life * 0.01);

  },

  spawnEnemies: function(x, y) {

      /*var current_time = this.game.time;
      if(current_time - this._last_spawn_time > this._time_til_spawn){

        this._last_spawn_time = current_time;*/
        //var posRandX = (((Math.random() * (3 - 1) ) + 1) % 2 === 0) ? this.game.rnd.between(this._rush.x - 300, this._rush.x - 200) :
                                                                        //this.game.rnd.between(this._rush.x + 200, this._rush.x + 300);
        var enemy = new Enemy(this.game, 'zombie', 5, x, y);
        enemy.anchor.setTo(0.5, 0.5);
        enemy.scale.setTo(1, 1);
        this._enemies.add(enemy);

    //}
  },

  startMusic: function(){

	  //this._mainTheme.play();
	  this._mainTheme.loop = true;
	  this._propulsionSound.loop = true;
	  this._zombiesSound.loop = true;
	  this._zombiesSound.volume = 0.2;


  },

  easyModeAction: function(){

	  this._life = 100;
	  this._pause = false;
	  this._mainTheme.play();
	  this._propulsionSound.play();
	  this._propulsionSound.mute = true;
	  this._zombiesSound.play();

	  this._easyModeButton.destroy();
	  this._hardModeButton.destroy();


  },

  hardModeAction: function(){

	  this._life = 10;
	  this._bloodLayer.destroy();
	  this._pause = false;
	  this._mainTheme.play();
	  this._propulsionSound.play();
	  this._propulsionSound.mute = true;
	  this._zombiesSound.play();

	  this._easyModeButton.destroy();
	  this._hardModeButton.destroy();

  }
};

module.exports = PlayScene;

},{"./Enemy":1}]},{},[4]);
