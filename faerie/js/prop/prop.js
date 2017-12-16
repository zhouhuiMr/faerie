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
            this.emitter.gravity.x = -400;
            this.emitter.setAlpha(0.7,1,1000);
            this.emitter.setScale(0.8,0,0.8,0,1000);
        },
        start : function(){
            this.emitter.start(false,1000,5);
        }
    }
    window.particalStar = particalStar;
})(window)