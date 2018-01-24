(function(window){
    var fireball = function(game,sprite,offsetx,offsety,trackrotation){
        this.game = game;
        this.weapon = null;

        this.init(sprite,offsetx,offsety,trackrotation);
    }
    fireball.prototype = {
        init : function(sprite,offsetx,offsety,trackrotation){
            this.weapon = this.game.add.weapon(10,"bullet");
            this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            this.weapon.bulletSpeed = 500;
            this.weapon.addBulletAnimation("bullet",
                [
                    "fireball1-1.png",
                    "fireball1-2.png",
                    "fireball1-3.png",
                    "fireball1-4.png",
                    "fireball1-5.png"
                ],10,true,false);
            this.weapon.trackSprite(sprite,offsetx,offsety,trackrotation);
            this.weapon.fireAngle = 0;
        },
        fire : function(){
            this.weapon.fire();
        }
    }
    window.fireball = fireball;

    /**==============================**/
    /**                              **/
    /**       grade of gem           **/
    /**                              **/
    /**==============================**/
    var gem = function(game,x,y){
        this.game = game;
        this.body = null;

        this.GRADE = 10; // the grade of gem

        this.x = x;
        this.y = y;

        this.FRAMENUMBER = 1+Math.round(Math.random());

        this.init();
    };
    gem.prototype = {
        init : function(){
            this.body = this.game.add.sprite(this.x,this.y,'prop','gem'+this.FRAMENUMBER+'.png');
            var scale = (3+Math.round(Math.random()*1))/10;
            this.body.scale.set(scale,scale);
            this.body.anchor.set(0.5,0.5);
            this.body.angle = 180 - Math.round(Math.random()*360);
            this.body.outOfBoundsKill = false;
            this.body.checkWorldBounds = false;
            this.game.physics.enable(this.body,Phaser.Physics.ARCADE);
            this.body.body.collideWorldBounds = false;
            this.body.body.immovable = true;
        },
        move : function(){
            this.body.x -= 5;
        },
        kill : function(){
            this.body.kill();
        }
    }
    window.gem = gem;

    /**==============================**/
    /**                              **/
    /**       explode animations     **/
    /**                              **/
    /**==============================**/
    var explode1 = function(game,x,y){
        this.game = game;
        this.body = null;
        this.x = x;
        this.y = y;

        this.init();
    };
    explode1.prototype = {
        init : function(){
            this.body = this.game.add.sprite(this.x,this.y,'prop');
            this.body.anchor.set(0.5,0.5);
            this.body.scale.set(1,1);
            var ani = this.body.animations.add('explode',
                    [
                        'explode1-1.png',
                        'explode1-2.png',
                        'explode1-3.png',
                        'explode1-4.png',
                        'explode1-5.png',
                        'explode1-6.png'
                    ]);
            ani.onComplete.add(function(sprite, animation){
                sprite.destroy();
            },this.game);
        },
        explode : function(){
            this.body.animations.play("explode",13,false,false);
        }
    };
    window.explode1 = explode1;

    /**==============================**/
    /**                              **/
    /**          all movement        **/
    /**                              **/
    /**==============================**/
    window.moveMent = {
        line : function(object){
            object.body.body.velocity.x = object.SPEEDX;
            object.body.body.velocity.y = object.SPEEDY;
        },
        parabolic_equation : function(object){
            object.body.x += object.SPEEDX;
            object.ANGLE += 1;
            object.body.y = object.A*Math.sin(object.ANGLE/50*Math.PI)+object.STARTY;
        }
    }
})(window)