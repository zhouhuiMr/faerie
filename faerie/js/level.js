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
            var type = Math.round(Math.random()*3);
            //var type = 3;
            switch(type){
                case 1 :
                    //single pumpin create
                    var pumpkinSingleTime = this.enemyCreateTime.pumpkinSingle.line,
                        nowTime = new Date().getTime();
                    var interval_pumpkinSingle = 2000;
                    if(nowTime - pumpkinSingleTime >= interval_pumpkinSingle){
                        var p = new pumpkin(this.game);
                        p.body.x = this.game.world.width+p.body.width;
                        p.body.y = Math.random()*(this.game.world.height - 50)+50;
                        p.SPEEDX = -300;
                        p.SPEEDY = -100+Math.random()*100;
                        p.moveType = 1;
                        this.enemyGroup.push(p);
                        this.enemyCreateTime.pumpkinSingle.line = new Date().getTime();
                    }
                    break;
                case 2 :
                    var pumpkinSingleTime = this.enemyCreateTime.pumpkinSingle.parabolic_equation,
                        nowTime = new Date().getTime();
                    var interval_pumpkinSingle = 4000;
                    if(nowTime - pumpkinSingleTime >= interval_pumpkinSingle){
                        var p = new pumpkin(this.game);
                        p.body.x = this.game.world.width+p.body.width;
                        p.body.y = Math.random()*(this.game.world.height - 50)+50;
                        p.A = Math.random()*50+30;
                        p.ANGLE = 0;
                        p.STARTY = p.body.y;
                        p.SPEEDX = -5;
                        p.moveType = 2;
                        this.enemyGroup.push(p);
                        this.enemyCreateTime.pumpkinSingle.parabolic_equation = new Date().getTime();
                    }
                    break;
                case 3 :
                    var QueueTime = this.enemyCreateTime.pumpkinQueue,
                        nowTime = new Date().getTime();
                    var interval_pumpkinQueue = 6000;
                    if(nowTime - QueueTime >= interval_pumpkinQueue){
                        var y = Math.random()*(this.game.world.height - 50)+50,
                            a = Math.random()*50+50;
                        for(var i = 0;i < 4; i++){
                            var p = new pumpkin(this.game);
                            p.body.x = this.game.world.width+(p.body.width+10)*(i+1);
                            p.body.y = y;
                            p.A = a;
                            p.ANGLE = 0+i*25;
                            p.STARTY = p.body.y;
                            p.SPEEDX = -5;
                            p.moveType = 2;
                            this.enemyGroup.push(p);
                        }
                        this.enemyCreateTime.pumpkinQueue = new Date().getTime();
                    }
                    break;
            }
        }
    }
    window.levelOne = levelOne;
})(window)
