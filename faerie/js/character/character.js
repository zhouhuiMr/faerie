(function(window){
    /**=======================**/
    /**                       **/
    /** create faerie object  **/
    /**                       **/
    /**=======================**/
    var faerie = function(game){
        this.game = game;
        this.body = null;

        //object attribute
        this.HEALTH = 5;
        this.ATK = 1;
        this.DEF = 0;
        this.SPEEDX = 250;
        this.SPEEDY = 250;

        this.weapon = null;

        this.emitter = null;

        // object init
        this.init();
    }
    faerie.prototype = {
        init : function(){
            //init faerie
            this.body = this.game.add.sprite(120,this.game.height/2,'character');
            this.body.anchor.set(0.5,0.5);
            this.body.scale.set(1,1);
            this.body.smoothed = true;
            this.game.physics.enable(this.body,Phaser.Physics.ARCADE);
            this.body.body.setSize(40,70,40,30);
            this.body.body.immovable = true;
            this.body.body.collideWorldBounds = true;

            //faerie action of fly
            this.body.animations.add("fly",["faerie_fly1.png","faerie_fly2.png","faerie_fly3.png"]);
            this.body.animations.add("attack",["faerie_attack1.png","faerie_attack2.png","faerie_attack3.png","faerie_attack4.png"]);
            this.fly();

            //init weapon
            this.weapon = new fireball(this.game,this.body,50,11,false);

            //init partical
            this.createPartical();
        },
        createPartical:function(){
            this.emitter = this.game.add.emitter(0,0,60);
            this.emitter.makeParticles("prop",["star.png"]);
            this.emitter.width = 20;
            this.emitter.height = 18;
            this.emitter.setXSpeed(-10,0);
            this.emitter.setYSpeed(0,20);
            this.emitter.gravity.x = -300;
            this.emitter.setAlpha(0.7,1,500);
            this.emitter.setScale(0.7,0,0.7,0,800);
            this.emitter.start(false,1000,20);
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
                if(this.body.y > 100){
                    this.body.body.velocity.y = -1*this.SPEEDY;
                }
            }
            if(keycontroller.DOWN.isDown){
                if(this.body.y < this.game.height - 60){
                    this.body.body.velocity.y = this.SPEEDY;
                }
            }
            if(keycontroller.LEFT.isDown){
                this.body.body.velocity.x = -1*this.SPEEDX;
                this.emitter.start(false,1000,20);
            }
            if(keycontroller.RIGHT.isDown){
                this.body.body.velocity.x = this.SPEEDX;
            }
            this.emitter.emitX = this.body.x-45;
            this.emitter.emitY = this.body.y+40;
        }
    };
    window.faerie = faerie;


    /**=======================**/
    /**                       **/
    /** create pumpkin object **/
    /**                       **/
    /**=======================**/
    var pumpkin = function(game){
        this.game = game;
        this.body = null;

        this.TYPE = "PUMPKIN";

        //object attribute
        this.HEALTH = 1;
        this.ATK = 1;
        this.DEF = 0;

        this.STARTX = 0;
        this.STARTY = 0;
        this.SPEEDX = 0;
        this.SPEEDY = 0;
        this.ENDX = 0;
        this.ENDY = 0;
        this.ANGLE = 0;
        this.A = 0;
        this.DWELLTIME = 0;


        this.weapon = null;

        this.emitter = null;

        this.moveType = 1;

        this.init();
    };
    pumpkin.prototype = {
        init : function(){
            this.body = this.game.add.sprite(this.game.world.width,0,'character','pumpkin.png');
            this.body.anchor.set(0.5,0.5);
            this.body.scale.set(1,1);
            this.body.smoothed = true;
            this.body.outOfBoundsKill = false;
            this.body.checkWorldBounds = false;
            this.game.physics.enable(this.body,Phaser.Physics.ARCADE);
            this.body.body.collideWorldBounds = false;
            this.body.body.immovable = true;
        },
        move : function(){
            switch(this.moveType){
                case 1:
                    moveMent.line(this);
                    break;
                case 2:
                    moveMent.parabolic_equation(this);
                    break;
            }
        },
        kill : function(){
            //explode animation
            var explode = new explode1(this.game,this.body.x,this.body.y);
            explode.body.scale.set(0.8,0.8);
            explode.explode();

            this.body.kill();
        },
        destroy : function(){
            this.body.destroy();
            this.body = null;
        },
        clone : function(){
            return new pumpkin(this.game);
        }
    };
    window.pumpkin = pumpkin;
})(window)