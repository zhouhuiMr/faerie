var GAMEWIDTH = 960,
    GAMEHEIGHT = 540;

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
    game.load.atlas('faerie','/faerie/resource/faerie/faerie.png','/faerie/resource/faerie/faerie.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}


// init the object of game
function create(){
    //set world bounds
    game.world.setBounds(0, 0, GAMEWIDTH, GAMEWIDTH);

    //set physics engine
    game.physics.startSystem(Phaser.ARCADE);

    //set back ground
    game.stage.backgroundColor = "#324a62";

    //set scale mode
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    new mainScene(game);
}

//refresh frame of game
function update(){

}

//debug game
function render(){

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
        this.init();
    }
    mainScene.prototype = {
        init : function(){
            //create faerie
            var player = new faerie(this.game);
        }
    }
    window.mainScene = mainScene;
})(window)
