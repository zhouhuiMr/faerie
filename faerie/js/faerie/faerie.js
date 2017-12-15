(function(window){
    var faerie = function(game){
        this.game = game;
        this.body = null;

        //object attribute
        this.HEALTH = 5;
        this.ATK = 1;
        this.DEF = 0;

        this.weapon = null;

        // object init
        this.init();
    }
    faerie.prototype = {
        init : function(){
            this.body = this.game.add.sprite(120,this.game.height/2,'faerie');
            this.body.anchor.set(0.5,0.5);
            this.body.smoothed = true;
            this.game.physics.enable(this.body,Phaser.Physics.ARCADE);
            this.body.body.setSize(40,70,40,30);
            this.body.body.collideWorldBounds = true;

            //faerie action of fly
            this.body.animations.add("fly",["faerie_fly1.png","faerie_fly2.png","faerie_fly3.png"]);
            this.body.animations.add("attack",["faerie_attack1.png","faerie_attack2.png","faerie_attack3.png","faerie_attack4.png"]);
            this.fly();

            //init weapon
            this.weapon = new fireball(this.game,this.body,45,12,false);
        },
        fly : function(){
            this.body.animations.play("fly",10,true);
        },
        attack : function(){
            var atk = this.body.animations.play("attack",10,false);
            var f = this;
            atk.onComplete.add(function(sprite, animation){
                if(sprite.frame == 3){
                    f.weapon.weapon.fire();
                    f.fly();
                }
            },this)
        }
    }
    window.faerie = faerie;
})(window)