(function(window){
    var faerie = function(game){
        this.game = game;
        this.body = null;

        //object attribute
        this.HEALTH = 5;
        this.ATK = 1;
        this.DEF = 0;
        this.speed = 200;

        this.weapon = null;

        this.partical = null;

        // object init
        this.init();
    }
    faerie.prototype = {
        init : function(){
            //init partical
            this.partical = new particalStar(this.game,80, this.game.height/2+40,60);

            //init faerie
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
            this.partical.start();
        },
        fly : function(){
            this.body.animations.play("fly",10,true);
        },
        attack : function(keycontroller){
            if(keycontroller.ATK.isDown){
                var atk = this.body.animations.play("attack",10,false);
                var f = this;
                atk.onComplete.add(function(sprite, animation){
                    if(sprite.frame == 3){
                        f.weapon.weapon.fire();
                        f.fly();
                    }
                },this);
            }
        },
        move : function(keycontroller){
            if(keycontroller.UP.isDown){
                this.body.body.velocity.y = -1*this.speed;
            }
            if(keycontroller.DOWN.isDown){
                this.body.body.velocity.y = this.speed;
            }
            if(keycontroller.LEFT.isDown){
                this.body.body.velocity.x = -1*this.speed;
            }
            if(keycontroller.RIGHT.isDown){
                this.body.body.velocity.x = this.speed;
            }
            this.partical.emitter.emitX = this.body.x-40;
            this.partical.emitter.emitY = this.body.y+40;
        }
    }
    window.faerie = faerie;
})(window)