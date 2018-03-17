/**====================================================**/
/**      the game of level                             **/
/**      set level init                                **/
/** 'mainScene' set game updating                      **/
/**                                                    **/
/** note:every level must has that initializing scene  **/
/** and creating enemy                                 **/
/**====================================================**/
(function(window){
    var levelOne = function(game){
        this.game = game;

        this.Player = null;

        this.foreground = null;
        this.midground = null;

        this.enemyGroup = null;

        this.gemGroup = null;

        this.enemyCreateTime = null;

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

            //init enemy creating time
            this.enemyCreateTime = {
                pumpkinQueue : new Date().getTime(),
                pumpkinSingle : {
                    line :new Date().getTime(),
                    parabolic_equation : new Date().getTime()
                }
            };
            //craete enemy and add this to group
            this.enemyGroup = new Array();

            //create grade gem and add this to group
            this.gemGroup = new Array();

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
        },
        enemyCreate : function(){
            createEnemyFactory.pumkinEnemy(this);
        }
    }
    window.levelOne = levelOne;

    /**==============================**/
    /**                              **/
    /**          all movement        **/
    /**                              **/
    /**==============================**/
    window.createEnemyFactory = {
        pumkinEnemy : function(level){
            var type = Math.round(Math.random()*3);
            switch (type){
                case 1:
                    //single pumpin create
                    var pumpkinSingleTime = level.enemyCreateTime.pumpkinSingle.line,
                        nowTime = new Date().getTime();
                    var interval_pumpkinSingle = 2000;
                    if(nowTime - pumpkinSingleTime >= interval_pumpkinSingle){
                        var p = new pumpkin(level.game);
                        p.body.x = level.game.world.width+p.body.width;
                        p.body.y = Math.random()*(level.game.world.height - 50)+50;
                        p.moveType = 1;
                        p.ENDX = -p.body.width;
                        p.ENDY = level.Player.body.y;
                        p.RUNTIME = 3000;
                        level.enemyGroup.push(p);
                        level.enemyCreateTime.pumpkinSingle.line = new Date().getTime();
                    }
                    break;
                case 2 :
                    var QueueTime = level.enemyCreateTime.pumpkinQueue,
                        nowTime = new Date().getTime();
                    var interval_pumpkinQueue = 6000;
                    if(nowTime - QueueTime >= interval_pumpkinQueue){
                        var y = Math.random()*(level.game.world.height - 50)+50,
                            a = Math.random()*50+50;
                        for(var i = 0;i < 4; i++){
                            var p = new pumpkin(level.game);
                            p.body.x = level.game.world.width+(p.body.width+10)*(i+1);
                            p.body.y = y;
                            p.A = a;
                            p.ANGLE = 0+i*25;
                            p.STARTY = p.body.y;
                            p.SPEEDX = -5;
                            p.moveType = 2;
                            level.enemyGroup.push(p);
                        }
                        level.enemyCreateTime.pumpkinQueue = new Date().getTime();
                    }
                    break;
            }
        }
    }
})(window)
