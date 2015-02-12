window.onload = function()
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 1024, 576, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render} );
   
 
    function preload()
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
    //var killFront;
    var killBack;
    var killFloor;
    var xOffset = 0;
    var heart;
    var freezeHeartGroup;
    var heartGroup;
    //var freezeHeart;
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
    
    function create()
    {
    	    game.physics.startSystem(Phaser.Physics.ARCADE);
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
    	    
    	    player = game.add.sprite(50, 450, 'dude');
    	    game.physics.arcade.enable(player);
    	    player.body.gravity.y = 300;
    	    player.body.collideWorldBounds = true;
    	    player.animations.add('left', [0, 1, 2, 3], 10, true);
    	    player.animations.add('right', [5, 6, 7, 8], 10, true);

    	    cursors = game.input.keyboard.createCursorKeys();

    	    
    	    
    	    //makeHeart();
    	    //makeHeart();
    	    //makeHeart();
    	    
    	    
    	    
    	    spawnGroup = game.add.group();
    	    game.physics.arcade.enable(spawnGroup);
    	    heartGroup = game.add.group();
    	    game.physics.arcade.enable(heartGroup);
    	    freezeHeartGroup = game.add.group();
    	    game.physics.arcade.enable(freezeHeartGroup);
    	    fore = game.add.tileSprite(0, -736, 2048, 2048, 'fore');
    	    fore.alpha = .3;
    	    
    	    //game.physics.arcade.enable(spawnGroup);
    	    
    	    //grass = game.add.sprite(0, 400, 'grass');
    	    //game.physics.arcade.enable(grass);
    	        	   
    	    for (loop = 1; loop < 10; loop = loop + 1)
    	    {
    	    	    spawnKey[loop] = 'spawn' + loop;
    	    }
    	    
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
    	    
    	    statusText = game.add.text(15, 10, 'Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost, statusStyle);
    	    //statusText.anchor.set(0.5);
    	    
    	    floating = game.add.audio('floating');
    	    floating.allowMultiple = true;
    	    heartBell = game.add.audio('heartBell');
    	    heartBell.allowMultiple = true;
    	    
    	    reed = game.add.audio('reed');
    	    reed.play('',0,1,true);
    	        	    
    	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    	    game.input.onDown.add(fullScreenStart, this);
    	    game.paused = true;
    	    
    	    

    }
    
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
    	    }
    }
    
    function update()
    {
    	    if (heartTimer === 1)
    	    {
    	    	    heartTimer = 0;
    	    	    makeHeart();
    	    	    //heartTimer = 0;
    	    }
    	    
    	    xOffset = xOffset + 4;
    	    back.tilePosition.x = back.tilePosition.x - .2;
    	    back2.tilePosition.x = back2.tilePosition.x - .6;
    	    back3.tilePosition.x = back3.tilePosition.x - 1;
    	    ground.tilePosition.x = ground.tilePosition.x - 4;
    	    fore.tilePosition.x = fore.tilePosition.x - 4.5;
    	    spawnGroup.x = spawnGroup.x - 4;
    	    //if (newHeartLive > 0)
    	    //{
    	    //	 freezeHeartGroup.x = freezeHeartGroup.x - 4;   
    	   // }
    	    //newHeart.x = newHeart.x - 2;
    	    
    	    //console.log('hello');
    	    //spawnCountHigh = 1;
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
    	    if (spawnCountCeiling > 0)
    	    {
    	    	    spawnCountCeiling = -1;
    	    	    //console.log("hi");
    	    	    //spawnPlat = game.add.sprite(1000, 350, getSpawnKey());
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 125, getSpawnKey());
    	    	    //grass = game.add.sprite(0, 400, 'grass');
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnCeilingReset, null);
    	    	    //musicBubble = spawnGroup.create(3500, 350, getSpawnKey());
    	    }
    	    
    	    if (spawnCountHigh > 0)
    	    {
    	    	    spawnCountHigh = -1;
    	    	    //console.log("hi");
    	    	    //spawnPlat = game.add.sprite(1000, 350, getSpawnKey());
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 225, getSpawnKey());
    	    	    //grass = game.add.sprite(0, 400, 'grass');
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnHighReset, null);
    	    	    //musicBubble = spawnGroup.create(3500, 350, getSpawnKey());
    	    }
    	    //spawnCountMed = 1;
    	    //game.physics.arcade.overlap(spawnGroup, killFront, setSpawnHigh(), null, this);
    	    if (spawnCountMed > 0)
    	    {
    	    	    spawnCountMed = -1;
    	    	    //console.log("hi");
    	    	    //spawnPlat = game.add.sprite(1000, 350, getSpawnKey());
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 325, getSpawnKey());
    	    	    //grass = game.add.sprite(0, 400, 'grass');
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    //spawnPlat.alpha = .2;
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnMedReset, null);
    	    	    //musicBubble = spawnGroup.create(3500, 350, getSpawnKey());
    	    }
    	    
    	    if (spawnCountLow > 0)
    	    {
    	    	    //console.log('hello');
    	    	    spawnCountLow = -1;
    	    	    //console.log("hi");
    	    	    //spawnPlat = game.add.sprite(1000, 350, getSpawnKey());
    	    	    spawnPlat = spawnGroup.create((xOffset + 1030), 425, getSpawnKey());
    	    	    //grass = game.add.sprite(0, 400, 'grass');
    	    	    game.physics.arcade.enable(spawnPlat);
    	    	    spawnPlat.body.allowGravity = false;
    	    	    spawnPlat.body.immovable = true; 
    	    	    game.time.events.add(Phaser.Timer.SECOND * 1.5, spawnLowReset, null);
    	    	    //musicBubble = spawnGroup.create(3500, 350, getSpawnKey());
    	    }
    	    
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
    
    function render()
    {
    	    //game.debug.cameraInfo(game.camera, 500, 32);
    	    //game.debug.spriteCoords(game.camera, 32, 32);
    }
    
    function getSpawnKey()
    {
    	    return ('spawn' + game.rnd.integerInRange(1, 9));
    }
    
    function getYSpawnHigh()
    {
    	    return game.rnd.integerInRange(225, 225);
    }
    
    function getYSpawnHigh()
    {
    	    return game.rnd.integerInRange(225, 225);
    }
    
    function getYSpawnMed()
    {
    	    return game.rnd.integerInRange(325, 325);
    }
    
    function getYSpawnLow()
    {
    	    return game.rnd.integerInRange(425, 425);
    }
    
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
    
    function murderSpawn(killBack, spawnPlat)
    {
	spawnPlat.destroy();
	//heartLost = heartLost + 1;
    	  //  statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
	//currentBubbles = currentBubbles - 1;
	//noteArray[rollingIndex] = game.add.audio('blank');
	//rollingIndex = rollingIndex + 1;
	//pop.play(); //Possible bug!! Pop sounds may not play or only playing sound fragment.
    }

    function freezeHeart(spawnPlat, heart)
    {
    	    newHeart = freezeHeartGroup.create(heart.x, heart.y, 'heart');
    	    game.physics.arcade.enable(newHeart);
    	    newHeart.body.velocity.x = -240;
    	    heart.destroy();
    	    //newHeartLive = newHeartLive + 1;
    	    //heart.body.immovable = true;
    }
    
    function freezeHeartGround(ground, heart)
    {
    	    newHeart = freezeHeartGroup.create(heart.x, heart.y, 'heart');
    	    game.physics.arcade.enable(newHeart);
    	    newHeart.body.velocity.x = -240;
    	    heart.destroy();
    	    //newHeartLive = newHeartLive + 1;
    	    //heart.body.immovable = true;
    }
    
    function makeHeart()
    {
    	    //heartTimer = 0;
    	    //heart = heartGroup.create(1000, 5, 'heart');
    	    //heart = game.add.sprite(1000, 5, 'heart');
    	    heart = heartGroup.create((/*xOffset +*/ game.rnd.integerInRange(600, 1050)), game.rnd.integerInRange(-10, -5), 'heart');
    	    game.physics.arcade.enable(heart);
    	    game.add.tween(heart).to({x: (heart.x + 30)}, 400, Phaser.Easing.Linear.NONE, true, 0, 20, true);
    	    game.time.events.add(Phaser.Timer.SECOND * 2, heartTimerReset, null);
    }
    
    function heartTimerReset()
    {
    	    heartTimer = 1;
    }
    
    function heartKillWall(killBack, heart)
    {
    	    heart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    
    function freezeHeartKillWall(killBack, newHeart)
    {
    	    newHeart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    
    function heartKillFloor(killFloor, heart)
    {
    	    heart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    
    function freezeHeartKillFloor(killFloor, newHeart)
    {
    	    newHeart.destroy();
    	    heartLost = heartLost + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    
    function playerHeart(player, heart)
    {
    	    floating.play('', .2, .3);
    	    heartText = game.add.text(heart.x, heart.y, getText(), style);
    	    heartText.anchor.set(0.5);
    	    game.time.events.add(Phaser.Timer.SECOND * .3, killHeartText, null);
    	    heart.destroy();
    	    floatHeartSaved = floatHeartSaved + 1;
    	    statusText.setText('Hearts Saved: ' + heartSaved + '  Floating Hearts Saved: ' + floatHeartSaved + '  Hearts Lost: ' + heartLost);
    }
    
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
    
    function killFreezeText()
    {
    	    freezeHeartText.destroy();
    }
    
    function killHeartText()
    {
    	    heartText.destroy();
    }
    
    function getText()
    {
    	    var textNum = game.rnd.integerInRange(0, 19);
    	    return textDict[textNum];
    }
};
