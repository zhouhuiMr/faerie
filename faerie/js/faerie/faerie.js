(function(window){
    var faerie = function(game){
        this.game = game;
        this.body = null;

        // object init
        this.init();
    }
    faerie.prototype = {
        init : function(){
            console.info(this.game)
            this.body = this.game.add.sprite(90,99,'faerie');
            //faerie action of fly
            this.body.animations.add("fly",["faerie_fly1.png","faerie_fly2.png","faerie_fly3.png"]);
            this.body.animations.add("attack",["faerie_attack1.png","faerie_attack2.png","faerie_attack3.png"]);
            this.fly();
        },
        fly : function(){
            this.body.animations.play("fly",10,true);
        },
        attack : function(){
            this.body.animations.play("attack",7,false);
        }
    }
    window.faerie = faerie;
})(window)