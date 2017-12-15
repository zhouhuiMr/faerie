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
            this.weapon.bulletSpeed = 400;
            this.weapon.addBulletAnimation("bullet",["fireball1.png","fireball2.png","fireball3.png"],10,true,false);
            this.weapon.trackSprite(sprite,offsetx,offsety,trackrotation);
            this.weapon.fireAngle = 0;
        },
        fire : function(){
            this.weapon.fire();
        }
    }
    window.fireball = fireball;
})(window)