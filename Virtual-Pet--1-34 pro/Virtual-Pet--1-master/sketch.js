//Create variables here
var dog,dogImg,happydogImg;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png");
  happydogImg=loadImage("images/happydog.png");
  
}

function setup() {
  createCanvas(800, 700);

  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
 
  foodStock=database.ref('Food');

  foodStock.on("value",readStock);
  textSize(20); 
  
}

function draw() {  

  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);

    dog.addImage(happydogImg);
 
}
drawSprites();

fill(255,255,254);
stroke("black");
text("Food remaining : "+foodS,170,200);   

textSize(13);
text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data){
foodS=data.val();
}


function writeStock(x){    
if(x<=0){                 
  x=0;
}
else{
  x=x-1;              
} 
database.ref('/').update({
  Food:x      
})
}




