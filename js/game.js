//Hello World of Phaser = Basic Game = Single Scene in Spin & Win Game
// How to create the basic skeleton for the game -> Game Loop

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}



let config = {
    type : Phaser.CANVAS,
    width : 800,
    height:600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
       // input.enabled : true,
    }
   
};
 //scene.input.enabled = false;
let game = new Phaser.Game(config);
var canSpin;
var button;


function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image('background','../spin_and_win/Assets/back.jpg');
    console.log(this);
    this.load.image('wheel','../spin_and_win/Assets/wheel.png');
    this.load.image('pin','../spin_and_win/Assets/pin.png');
    this.load.image('stand','../spin_and_win/Assets/stand.png');
    //this.load.image('button','../spin_and_win/Assets/stand.png',193,71);
       
}
function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
     //lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 250,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 1;
    
    //let create wheel
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); 
    //this.wheel.alpha = 0.5;
    
    
    //create button
    //document.getElementById("canvas").innerHTML = "<button>dfhg</button>";
    //button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
    //event listener for mouse click
    canSpin = true;
    //this.input.on("pointerdown",spinwheel,this);
   
    //lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);

    
    
    
}

//Game Loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 1;
}
 function myFunction(){
        spinwheel();
    }

function spinwheel(){
   
    if (canSpin) {console.log("You clicked the mouse");
    console.log("Start spinning");
    //this.game_text.setText("You clicked the mouse!");
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
        let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
       
    canSpin=false;
    
    tween = this.tweens.add({

        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",
        //scene.input.enabled :false,
        duration: 6000,
        callbackScope:this,
        onComplete:function(){
            this.game_text.setText("You won something " + prizes_config.prize_names[idx]);
        },

    });}

    
}


