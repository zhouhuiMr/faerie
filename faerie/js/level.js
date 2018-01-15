/**===============================**/
/**      the game of level        **/
/**      set level init           **/
/** 'mainScene' set game updating **/
/**===============================**/
(function(window){
    var levelOne = function(game){
        this.game = game;

        this.Player = null;

        this.foreground = null;
        this.midground = null;

        this.init();
    }
    levelOne.prototype = {
        init : function(){
            //add background(farground)
            this.game.add.sprite(0,0,'ground','background.png');

            //add far background
            this.midground = this.foreground = this.game.add.tileSprite(0,0,GAMEWIDTH,GAMEHEIGHT,'ground','midground.png');

            //create faerie
            this.Player = new faerie(this.game);

            //set foreground
            this.foreground = game.add.tileSprite(0,GAMEHEIGHT,GAMEWIDTH,40,'ground');
            //set foreground animations
            this.foreground.animations.add('grass',['foreground1.png','foreground2.png','foreground3.png'],2,true,true);
            this.foreground.animations.play('grass',2,true,false);
            //set foreground physics
            this.game.physics.arcade.enable(this.foreground);
            this.foreground.body.setSize(GAMEWIDTH,10,0,20);
            this.foreground.body.collideWorldBounds = true;
            this.foreground.body.immovable = true;
            this.foreground.anchor.set(0,1);
        }
    }
    window.levelOne = levelOne;
})(window)
