var GAMEWIDTH = 960,
    GAMEHEIGHT = 540;

var STARTSCENE = null,
    GAMESCENE = null,
    ENDSCENE = null;

//html init
var USERAGENT =navigator.userAgent.toLowerCase();
var loadingImg = document.getElementsByClassName("loading_img")[0],
    loadingNum = document.getElementsByClassName("loading_num")[0];
var loadingBarW = 0;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'gamecontainer', {
    preload: preload,
    create: create,
    update: update,
    render: render
});


/*================================*/
/*                                */
/*    the config of phaser.js     */
/*                                */
/*================================*/

//load resource of game
function preload(){
    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(filecomplete, this);
    game.load.onLoadComplete.add(loadcomplete, this);
    game.load.atlas('ground','/faerie/resource/ground/ground.png','/faerie/resource/ground/ground.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('character','/faerie/resource/character/character.png','/faerie/resource/character/character.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('bullet','/faerie/resource/fireball/fireball.png','/faerie/resource/fireball/fireball.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    game.load.atlas('prop','/faerie/resource/prop/prop.png','/faerie/resource/prop/prop.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}


// init the object of game
function create(){
    //set world bounds
    game.world.setBounds(0,0, GAMEWIDTH, GAMEHEIGHT);

    //set physics engine
    game.physics.startSystem(Phaser.ARCADE);

    //set back ground
    game.stage.backgroundColor = "#333333";//#77b8f8 #22384e #22384e

    //set scale mode
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


    GAMESCENE = new mainScene(game);

}

//refresh frame of game
function update(){
    GAMESCENE.update();
}

//debug game
function render(){
    GAMESCENE.debug();
}

/*================================*/
/*                                */
/*   the listening of game load   */
/*                                */
/*================================*/

// loading game resource start
function loadStart(){
    console.info("loading start");
    
    loadingBarW = document.getElementsByClassName("loading_span")[0].scrollWidth;
    console.info(document.getElementsByClassName("loading_span"))
}

// the game is loading
function filecomplete(progress, cacheKey, success, totalLoaded, totalFiles){
    //console.info("progress:"+progress);
    //console.info("cacheKey:"+cacheKey);
    //console.info("success:"+success);
    //console.info("totalLoaded:"+totalLoaded);
    //console.info("totalFiles:"+totalFiles);
    loadingImg.style.left = progress/100*loadingBarW+"px";
    loadingNum.innerHTML = progress+"%";

}

//the game loading  is complete
function loadcomplete(){
    var parent = document.getElementById("gamecontainer"),
       son = document.getElementById("gameloading");
    parent.removeChild(son);
    console.info("loading complete");
}

/*================================*/
/*                                */
/*        set game scene          */
/*                                */
/*================================*/

(function(window){
    //start scene of game
    var startScene = function(){

    };
    window.startScene = startScene;

    //main scene of game
    var mainScene = function(game){
        this.game = game;

        this.LEVELNUMBER = 1;
        this.level = null;

        this.GAMEGRADE = 0;

        this.KeyController = null;

        this.Player = null;

        this.enemyGroup = null;

        this.gemGroup = null;

        this.foreground = null;
        this.midground = null;

        this.init();
    };
    mainScene.prototype = {
        init : function(){
            //add controller on mobile phone
            if(
                USERAGENT.indexOf("iphone")>=0 ||
                USERAGENT.indexOf("android")>=0 ||
                USERAGENT.indexOf("ipad")>=0 ||
                USERAGENT.indexOf("windows phone")>=0
            ){

            }

            //init key board controller
            this.KeyController = this.game.input.keyboard.addKeys({
                "UP":Phaser.Keyboard.W,
                "DOWN":Phaser.Keyboard.S,
                "LEFT":Phaser.Keyboard.A,
                "RIGHT":Phaser.Keyboard.D,
                "ATK":Phaser.Keyboard.J
            });

            //init game level
            this.level = null;
            if(this.LEVELNUMBER == 1){
                this.level = new levelOne(this.game);
            }
            if(this.level != null){
                this.Player = this.level.Player;
                this.enemyGroup = this.level.enemyGroup;
                this.foreground = this.level.foreground;
                this.midground = this.level.midground;
                this.gemGroup = this.level.gemGroup;
            }else{
                var tiptext = this.game.add.text(this.game.world.centerX,
                    this.game.world.centerY,
                    '\u6e38\u620f\u521d\u59cb\u5316\u5931\u8d25',
                    {
                        "fill"            : "#ffffff",
                        "stroke"          : "#50a6fb",
                        "strokeThickness" : "5"
                    });
                tiptext.anchor.set(0.5,0.5);
            }
        },
        update :function(){
            if(this.level != null){
                this.Player.body.body.velocity.x = 0;
                this.Player.body.body.velocity.y = 0;

                this.Player.move(this.KeyController);
                this.Player.attack(this.KeyController);

                this.foreground.tilePosition.x -= 5;

                this.midground.tilePosition.x -= 4;

                this.level.enemyCreate();


                /**==============================**/
                /**                              **/
                /**        physics collision     **/
                /**                              **/
                /**==============================**/
                var obj = this;
                for(var i=0;i<this.enemyGroup.length;i++){
                    var character = this.enemyGroup[i];
                    if(character.body != null){
                        character.move();
                        /**==============================**/
                        /**                              **/
                        /** if player collide everything,**/
                        /** then everything destroy and  **/
                        /** player's health subtract 1   **/
                        /**                              **/
                        /**==============================**/
                        this.game.physics.arcade.collide(character.body,obj.Player.body,function(ch,player){
                            character.kill();
                            obj.Player.HEALTH -= 1;
                            if(obj.Player.HEALTH <= 0){
                                //game over scene start
                            }
                        },null, this.game);

                        /**==================================**/
                        /**                                  **/
                        /** if bullet collide everything,    **/
                        /** then bullet destroy and          **/
                        /** everything's health subtract ATK **/
                        /**                                  **/
                        /**==================================**/
                        this.game.physics.arcade.collide(character.body,obj.Player.weapon.weapon.bullets,function(ch,bullet){
                            bullet.kill();
                            if(character.DEF - obj.Player.ATK <= 0){
                                character.HEALTH +=character.DEF - obj.Player.ATK;
                            }
                            if(character.HEALTH <= 0){
                                //when enemy explodes ,then create gem.
                                var g = new gem(this,character.body.x,character.body.y);
                                obj.gemGroup.push(g);

                                character.kill();
                            }
                        },null,this.game);
                    }
                }

                /**==================================**/
                /**                                  **/
                /** if Player collide gem,           **/
                /** then gem destroy and             **/
                /** game grade plus gem grade        **/
                /**                                  **/
                /**==================================**/
                for(var i=0;i<this.gemGroup.length;i++){
                    var g = this.gemGroup[i];
                    if(g != null){
                        g.move();
                        this.game.physics.arcade.collide(g.body,obj.Player.body,function(ge,player){
                            obj.GAMEGRADE += g.GRADE;
                            ge.kill();
                        },null, this.game);
                    }
                }

                /**==================================**/
                /**                                  **/
                /** remove object that is out bound  **/
                /** and object's body is null        **/
                /**                                  **/
                /**==================================**/
                for(var i=0;i<this.enemyGroup.length;i++){
                    var enemy = this.enemyGroup[i];
                    if(!enemy.body.alive){
                        enemy.body.destroy();
                        this.enemyGroup.splice(i,1);
                        break;
                    }else{
                        var enemyW = enemy.body.width,
                            enemyH = enemy.body.height;
                        if(enemy.body.x <= -1*enemyW){
                            enemy.destroy();
                            this.enemyGroup.splice(i,1);
                            break;
                        }
                        if(enemy.body.y <= -1*enemyH){
                            enemy.destroy();
                            this.enemyGroup.splice(i,1);
                            break;
                        }
                        if(enemy.body.y >= this.game.world.height+enemyH){
                            enemy.destroy();
                            this.enemyGroup.splice(i,1);
                            break;
                        }
                    }
                }

                /**==================================**/
                /**                                  **/
                /** remove object that is out bound  **/
                /** and object's body is null        **/
                /**                                  **/
                /**==================================**/
                for(var i=0;i<this.gemGroup.length;i++){
                    var g = this.gemGroup[i];
                    if(!g.body.alive){
                        g.body.destroy();
                        this.gemGroup.splice(i,1);
                        break;
                    }else{
                        var gW = g.body.width;
                        if(g.body.x <= -1 * gW){
                            g.body.destroy();
                            this.gemGroup.splice(i,1);
                            break;
                        }
                    }
                }
            }
            //console.info(this.GAMEGRADE);
            //console.info(this.game.world.children.length);
        },
        debug:function(){
            //this.game.debug.body(this.Player.body);
            //this.game.debug.spriteInfo(this.Player.body, 32, 32);
            //this.game.debug.body(this.foreground);
            //this.game.debug.spriteInfo(this.foreground, 32, 32);
        }
    };
    window.mainScene = mainScene;
})(window);
