(function(window){
    var particalStar = function(game,x,y,number){
        this.game = game;
        this.emitter = null;

        this.init(x,y,number);
    }
    particalStar.prototype = {
        init : function(x,y,number){
            this.emitter = this.game.add.emitter(x,y,number);
            this.emitter.makeParticles("prop",["star.png"]);
            this.emitter.width = 20;
            this.emitter.height = 20;
            this.emitter.setXSpeed(-10,0);
            this.emitter.setYSpeed(0,20);
            this.emitter.gravity.x = -400;
            this.emitter.setAlpha(0.7,1,500);
            this.emitter.setScale(0.7,0,0.7,0,800);
        },
        start : function(){
            this.emitter.start(false,1000,5);
        }
    }
    window.particalStar = particalStar;
})(window)