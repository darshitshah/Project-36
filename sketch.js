var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var Feed

var feed,lastFed

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  Feed=createButton("Feed The Dog");
  Feed.position(680,95);
  Feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  var fedtime = database.ref("Feedtime")
  fedtime.on("value",function (data){
    lastFed = data.val()
    console.log(lastFed)
  })
fill("black")
  if (lastFed>=12){
text("Last Fed :"+ lastFed%12+"pm",350,30)
  }else if (lastFed==0){
    text("Last Fed : 12AM",350,30)
  }else{
    text("LastFed :"+ lastFed+"am",350,30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
 
  database.ref('/').update({ Food:foodObj.getFoodStock(), Feedtime:hour() })

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
