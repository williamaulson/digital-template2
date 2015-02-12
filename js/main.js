window.onload = function()
{
    // William Aulson
    // CS 325 Digital Assignment #2
    // Heart Saver Deluxe
    
    "use strict";
    
    var game = new Phaser.Game( 1024, 576, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
   
 
    function preload() // load assets
    {
    	    game.load.image( 'back', 'assets/back.png' );
    	    game.load.image( 'ground', 'assets/ground.png' );
    	    game.load.image( 'spawn1', 'assets/spawn1.png' );
    	    game.load.image( 'spawn2', 'assets/spawn2.png' );
    	    game.load.image( 'spawn3', 'assets/spawn3.png' );
    	    game.load.image( 'spawn4', 'assets/spawn4.png' );
    	    game.load.image( 'spawn5', 'assets/spawn5.png' );
    	    game.load.image( 'spawn6', 'assets/spawn6.png' );
    	    game.load.image( 'spawn7', 'assets/spawn7.png' );
    	    game.load.image( 'spawn8', 'assets/spawn8.png' );
    	    game.load.image( 'spawn9', 'assets/spawn9.png' );
    	    game.load.image( 'kill', 'assets/kill.png' );
    	    game.load.image( 'kill2', 'assets/kill2.png' );
    	    game.load.image( 'heart', 'assets/heart.png' );
    	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    	    game.load.image( 'back2', 'assets/back2.png' );
    	    game.load.image( 'back3', 'assets/back3.png' );
    	    game.load.image( 'fore', 'assets/fore.png' );
    	    game.load.audio('floating', 'assets/float.mp3');
    	    game.load.audio('heartBell', 'assets/bell.mp3');
    	    game.load.audio('reed', 'assets/reed.mp3');
    }
    // variables, still global, much shame
    var reed;
    var floating;
    var heartBell;
    var back;
    var back2;
    var back3;
    var fore;
    var ground;
    var spawn1;
    var spawn2;
    var spawn3;
    var spawn4;
    var spawn5;
    var spawn6;
    var spawn7;
    var spawn8;
    var spawn9;
    var spawnCountCeiling = -1;
    var spawnCountHigh = -1;
    var spawnCountMed = -1;
    var spawnCountLow = 1;
    var spawnKey = {};
    var loop;
    var spawnGroup;
    var spawnPlat;
    var killBack;
    var killFloor;
    var xOffset = 0;
    var heart;
    var freezeHeartGroup;
    var heartGroup;
    var newHeart;
    var heartTimer = 1;
    var player;
    var cursors;
    var style = { font: "40px Arial", fill: "#A30000", align: "center" };
    var statusStyle = { font: "20px Arial", fill: "#000000", align: "center" };
    var heartText;
    var freezeHeartText;
    var textDict = {};
    var heartLost = 0;
    var floatHeartSaved = 0;
    var heartSaved = 0;
    var statusText;
    var firstMusicRun = 1;
    
    function create()
    {
    	    game.physics.startSystem(Phaser.Physics.ARCADE); // set up scrolling backgrounds
    	    game.world.setBounds(0, 0, 1024, 576);
    	    back = game.add.tileSprite(0, -736, 2048, 2048, 'back');
    	    back2 = game.add.tileSprite(0, -736, 2048, 2048, 'back2');
    	    back3 = game.add.tileSprite(0, -736, 2048, 2048, 'back3');
    	    back3.alpha = .1;
    	    ground = game.add.tileSprite(0, 536, 2048, 40, 'ground');
    	    game.physics.arcade.enable(ground);
    	    ground.body.allowGravity = false;
    	    ground.body.immovable = true; 
    	    killBack = game.add.sprite(-800, 0, 'kill');
    	    game.physics.arcade.enable(killBack);
    	    killBack.body.allowGravity = false;
    	    killBack.body.immovable = true;
    	    killFloor = game.add.sprite(-1024, 580, 'kill2');
    	    game.physics.arcade.enable(killFloor);
    	    killFloor.body.allowGravity = false;
    	    killFloor.body.immovable = true;
    	    
    	    player = game.add.sprite(50, 450, 'dude'); // set up player character
    	    game.physics.arcade.enable(player);
    	    player.body.gravity.y = 300;
    	    player.body.collideWorldBounds = true;
    	    player.animations.add('left', [0, 1, 2, 3], 10, true);
    	    player.animations.add('right', [5, 6, 7, 8], 10, true);

    	    cursors = game.input.keyboard.createCursorKeys();

    	    spawnGroup = game.add.group(); //set up groups
    	    game.physics.arcade.enable(spawnGroup);
    	    heartGroup = game.add.group();
    	    game.physics.arcade.enable(heartGroup);
    	    freezeHeartGroup = game.add.group();
    	    game.physics.arcade.enable(freezeHeartGroup);
    	    fore = game.add.tileSprite(0, -736, 2048, 2048, 'fore');
    	    fore.alpha = .3;
    	    
    	    for (loop = 1; loop < 10; loop = loop + 1) //Store assets for random calls
    	    {
    	    	    spawnKey[loop] = 'spawn' + loop;
    	    }
    	    // Collect heart text database
    	    textDict[0] = 'love';
    	    textDict[1] = 'peace';
    	    textDict[2] = 'hope';
    	    textDict[3] = 'candy';
    	    textDict[4] = 'flowers';
    	    textDict[5] = 'cupcakes';
    	    textDict[6] = 'games';
    	    textDict[7] = 'potatoes';
    	    textDict[8] = 'song';
    	    textDict[9] = 'dance';
    	    textDict[10] = 'music';
    	    textDict[11] = 'hugs';
    	    textDict[12] = 'kisses';
    	    textDict[13] = 'smiles';
    	    textDict[14] = 'chocolate';
    	    textDict[15] = 'sweets';
    	    textDict[16] = 'sweetie';
    	    textDict[17] = 'snuggly';
    	    textDict[18] = 'fuzzy';
    	    textDict[19] = 'cookies';
    	    
    	    game.physics.arcade.gravity.y = 100;
    	    // set up HUD
    	    statusText = game.add.text(15, 10, 'Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost, statusStyle);
    	    // set up audio
    	    floating = game.add.audio('floating');
    	    floating.allowMultiple = true;
    	    heartBell = game.add.audio('heartBell');
    	    heartBell.allowMultiple = true;
    	    
    	    // set up full screen and game start  	    
    	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    	    game.input.onDown.add(fullScreenStart, this);
    	    game.paused = true;
    	    
    	    // set up music
    	    reed = game.add.audio('reed');
    	        	    

    }
    // full screen method and game pausing
    function fullScreenStart()
    {
    	    if (game.scale.isFullScreen)
    	    {
    	    	    game.paused = true;
    	    	    game.scale.stopFullScreen();
    	    }
    	    else
    	    {
    	    	    game.scale.startFullScreen(true);
    	    	    game.paused = false;
    	    	    if (firstMusicRun === 1)
    	    	    {
    	    	    	    firstMusicRun = 0;
    	    	    	    reed.play('',0,1,true);
    	    	    }
    	    	    
    	    }
    }
    // heartbeat functions, checks, and assignments
    function update()
    {
    	    if (heartTimer === 1)
    	    {
    	    	    heartTimer = 0;
    	    	    makeHeart();
    	    	 
    	    }
    	    // scroll assets
    	    xOffset = xOffset + 4;
    	    back.tilePosition.x = back.tilePosition.x - .2;
    	    back2.tilePosition.x = back2.tilePosition.x - .6;
    	    back3.tilePosition.x = back3.tilePosition.x - 1;
    	    ground.tilePosition.x = ground.tilePosition.x - 4;
    	    fore.tilePosition.x = fore.tilePosition.x - 4.5;
    	    spawnGroup.x = spawnGroup.x - 4;
    	    // check for collisions
    	    game.physics.arcade.collide(player, ground, null, null, this);
    	    game.physics.arcade.collide(player, spawnGroup, null, null, this);
    	    game.physics.arcade.overlap(player, heartGroup, playerHeart, null, this);
    	    game.physics.arcade.overlap(player, freezeHeartGroup, playerFreezeHeart, null, this);
    	    game.physics.arcade.collide(spawnGroup, freezeHeartGroup, null, null, this);
    	    game.physics.arcade.collide(ground, freezeHeartGroup, null, null, this);
    	    game.physics.arcade.collide(spawnGroup, heartGroup, freezeHeart, null, this);
    	    game.physics.arcade.collide(ground, heartGroup, freezeHeartGround, null, this);
    	    game.physics.arcade.overlap(spawnGroup, killBack, murderSpawn, null, this);
    	    game.physics.arcade.overlap(heartGroup, killBack, heartKillWall, null, this);
    	    game.physics.arcade.overlap(freezeHeartGroup, killBack, freezeHeartKillWall, null, this);
    	    game.physics.arcade.overlap(heartGroup, killFloor, heartKillFloor, null, this);
    	    game.physics.arcade.overlap(freezeHeartGroup, killFloor, freezeHeartKillFloor, null, this);
    	    //spawn platforms
    	    if (spawnCountCeiling > 0)
    	    {
    	    	    spawnCountCeiling = -1;
    	    	
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 125, getSpawnKey());
    	    	
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnCeilingReset, null);
    	    	
    	    }
    	    
    	    if (spawnCountHigh > 0)
    	    {
    	    	    spawnCountHigh = -1;
    	    	  
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 225, getSpawnKey());
    	    	
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnHighReset, null);
    	    	
    	    }
   
    	    if (spawnCountMed > 0)
    	    {
    	    	    spawnCountMed = -1;
    	    	
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 325, getSpawnKey());
    	    	  
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnMedReset, null);
    	    	
    	    }
    	    
    	    if (spawnCountLow > 0)
    	    {
    	    	
    	    	    spawnCountLow = -1;
    	    	  
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 425, getSpawnKey());
    	    	   
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnLowReset, null);
    	    	  
    	    }
    	    // player movement inputs
    	    player.body.velocity.x = 0;
    	    if (cursors.left.isDown)
    	    {
    	    	    player.body.velocity.x = -200;
    	    	    player.animations.play('left');
    	    }
    	    else if (cursors.right.isDown)
    	    {
    	    	    player.body.velocity.x = 200;
    	    	    player.animations.play('right');
    	    }
    	    else
    	    {
    	    	    player.animations.stop();
    	    	    player.frame = 4;
    	    }
    	    if (cursors.up.isDown && player.body.touching.down)
    	    {
    	    	    player.body.velocity.y = -450;
    	    }

       
    }
    // debug info
    function render()
    {
    	    //game.debug.cameraInfo(game.camera, 500, 32);
    	    //game.debug.spriteCoords(game.camera, 32, 32);
    }
    // return random platform asset
    function getSpawnKey()
    {
    	    return ('spawn' + game.rnd.integerInRange(1, 9));
    }
    // choose random platform other than low   
    function spawnLowReset()
    {
    	    var choiceLow = game.rnd.integerInRange(1, 3);
    	    if (choiceLow === 1)
    	    {
    	    	    spawnCountCeiling = 1;
    	    }
    	    else if (choiceLow === 2)
    	    {
    	    	    spawnCountHigh = 1;
    	    }
    	    else
    	    {
    	    	    spawnCountMed = 1;
    	    }
    }
    // choose random platform other than med 
    function spawnMedReset()
    {
    	    var choiceMed = game.rnd.integerInRange(1, 3);
    	    if (choiceMed === 1)
    	    {
    	    	    spawnCountCeiling = 1;
    	    }
    	    else if (choiceMed === 2)
    	    {
    	    	    spawnCountHigh = 1;
    	    }
    	    else
    	    {
    	    	    spawnCountLow = 1;
    	    }
    }
    // choose random platform other than high 
    function spawnHighReset()
    {
    	    var choiceHigh = game.rnd.integerInRange(1, 3);
    	    if (choiceHigh === 1)
    	    {
    	    	    spawnCountCeiling = 1;
    	    }
    	    else if (choiceHigh === 2)
    	    {
    	    	    spawnCountMed = 1;
    	    }
    	    else
    	    {
    	    	    spawnCountLow = 1;
    	    }
    }
    // choose random platform other than ceiling 
    function spawnCeilingReset()
    {
    	    var choiceCeiling = game.rnd.integerInRange(1, 3);
    	    if (choiceCeiling === 1)
    	    {
    	    	    spawnCountHigh = 1;
    	    }
    	    else if (choiceCeiling === 2)
    	    {
    	    	    spawnCountMed = 1;
    	    }
    	    else
    	    {
    	    	    spawnCountLow = 1;
    	    }
    }
    // destroy platforms offscreen
    function murderSpawn(killBack, spawnPlat)
    {
	spawnPlat.destroy();
	
    }
    // spawn new heart on platform
    function freezeHeart(spawnPlat, heart)
    {
    	    newHeart = freezeHeartGroup.create(heart.x, heart.y, 'heart');
    	    game.physics.arcade.enable(newHeart);
    	    newHeart.body.velocity.x = -240;
    	    heart.destroy();
    	
    }
    // spawn new heart on ground
    function freezeHeartGround(ground, heart)
    {
    	    newHeart = freezeHeartGroup.create(heart.x, heart.y, 'heart');
    	    game.physics.arcade.enable(newHeart);
    	    newHeart.body.velocity.x = -240;
    	    heart.destroy();
    
    }
    // spawn falling hearts
    function makeHeart()
    {
    	
    	    heart = heartGroup.create((/*xOffset +*/ game.rnd.integerInRange(600, 1050)), game.rnd.integerInRange(-10, -5), 'heart');
    	    game.physics.arcade.enable(heart);
    	    game.add.tween(heart).to({x: (heart.x + 30)}, 400, Phaser.Easing.Linear.NONE, true, 0, 20, true);
    	    game.time.events.add(Phaser.Timer.SECOND * 2, heartTimerReset, null);
    }
    // keep update from spamming hearts
    function heartTimerReset()
    {
    	    heartTimer = 1;
    }
    // remove any missed hearts that are offscreen
    function heartKillWall(killBack, heart)
    {
    	    heart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    // remove any missed hearts that are offscreen
    function freezeHeartKillWall(killBack, newHeart)
    {
    	    newHeart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    // remove any missed hearts that are offscreen
    function heartKillFloor(killFloor, heart)
    {
    	    heart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    // remove any missed hearts that are offscreen
    function freezeHeartKillFloor(killFloor, newHeart)
    {
    	    newHeart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    // remove falling hearts collected by player
    function playerHeart(player, heart)
    {
    	    floating.play('', .2, .2);
    	    heartText = game.add.text(heart.x, heart.y, getText(), style);
    	    heartText.anchor.set(0.5);
    	    game.time.events.add(Phaser.Timer.SECOND * .3, killHeartText, null);
    	    heart.destroy();
    	    floatHeartSaved = floatHeartSaved + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    // remove hearts collected by player
    function playerFreezeHeart(player, newHeart)
    {
    	    heartBell.play();
    	    freezeHeartText = game.add.text(newHeart.x, newHeart.y, getText(), style);
    	    freezeHeartText.anchor.set(0.5);
    	    game.time.events.add(Phaser.Timer.SECOND * .3, killFreezeText, null);
    	    newHeart.destroy();
    	    heartSaved = heartSaved + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    // remove heart text
    function killFreezeText()
    {
    	    freezeHeartText.destroy();
    }
    // remove falling heart text
    function killHeartText()
    {
    	    heartText.destroy();
    }
    // choose random heart collection text
    function getText()
    {
    	    var textNum = game.rnd.integerInRange(0, 19);
    	    return textDict[textNum];
    }
};
