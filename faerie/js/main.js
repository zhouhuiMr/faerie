var GAMEWIDTH = 960,
    GAMEHEIGHT = 540;

var STARTSCENE = null,
    GAMESCENE = null,
    ENDSCENE = null;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'gamecontainer', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


/*================================*/
/*                                */
/*    the config of phaser.js     */
/*                                */
/*================================*/

//load resource of game
function preload(){
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(filecomplete, this);
    game.load.onLoadComplete.add(loadcomplete, this);
    game.load.atlas('ground','/faerie/resource/ground/ground.png','/faerie/resource/ground/ground.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('faerie','/faerie/resource/faerie/faerie.png','/faerie/resource/faerie/faerie.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('bullet','/faerie/resource/fireball/fireball.png','/faerie/resource/fireball/fireball.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('prop','/faerie/resource/prop/prop.png','/faerie/resource/prop/prop.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}

var player = null,
    keycontroller = null,
    foreground = null;

// init the object of game
function create(){
    //set world bounds
    game.world.setBounds(0, 0, GAMEWIDTH, GAMEHEIGHT);

    //set physics engine
    game.physics.startSystem(Phaser.ARCADE);

    //set back ground
    game.stage.backgroundColor = "#22384e";//#77b8f8 #22384e

    //set scale mode
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


    GAMESCENE = new mainScene(game);

    player = GAMESCENE.Player;

    keycontroller = GAMESCENE.KeyController;

    //set foreground
    foreground = game.add.tileSprite(0,GAMEHEIGHT,GAMEWIDTH,100,'ground','foreground.png');
    foreground.anchor.set(0,1);
}

//refresh frame of game
function update(){
    player.body.body.velocity.x = 0;
    player.body.body.velocity.y = 0;

    player.move(keycontroller);
    player.attack(keycontroller);
    foreground.tilePosition.x -= 2;
}

//debug game
function render(){
    // game.debug.body(player.body);
    // game.debug.spriteInfo(player.body, 32, 32);
}

/*================================*/
/*                                */
/*   the listening of game load   */
/*                                */
/*================================*/

// loading game resource start
function loadStart(){
    console.info("loading start")
}

// the game is loading
function filecomplete(progress, cacheKey, success, totalLoaded, totalFiles){
    console.info("progress:"+progress)
    console.info("cacheKey:"+cacheKey)
    console.info("success:"+success)
    console.info("totalLoaded:"+totalLoaded)
    console.info("totalFiles:"+totalFiles)
}

//the game loading  is complete
function loadcomplete(){
    console.info("loading complete")
}

/*================================*/
/*                                */
/*        set game scene          */
/*                                */
/*================================*/

(function(window){
    //start scene of game
    var startScene = function(){

    }
    window.startScene = startScene;

    //main scene of game
    var mainScene = function(game){
        this.game = game;
        this.KeyController = null;

        this.Player = null;

        this.init();
    }
    mainScene.prototype = {
        init : function(){
            //add background
            this.game.add.sprite(0,0,'ground','background.png');
            //init key board controller
            this.KeyController = this.game.input.keyboard.addKeys({
                "UP":Phaser.Keyboard.W,
                "DOWN":Phaser.Keyboard.S,
                "LEFT":Phaser.Keyboard.A,
                "RIGHT":Phaser.Keyboard.D,
                "ATK":Phaser.Keyboard.J,
            });
            //create faerie
            this.Player = new faerie(this.game);

        }
    }
    window.mainScene = mainScene;
})(window)
