class Game {
  constructor() {
    this.resetTitle = createElement("h2")
    this.resetButton = createButton('')


    this.leaderBoardTitle = createElement('h2')
    this.leader1 = createElement('h2')
    this.leader2 = createElement('h2')

  }

  getState(){
    var gameStateref = database.ref("gameState")
    gameStateref.on("value", function(data){
      gameState = data.val()
    })
  }
  update(state){
    database.ref("/").update({gameState:state})
  }
  start() {
    player = new Player();
    playerCount=player.getCount();
    form = new Form();
    form.display();
    car1 = createSprite(width/2 -50, height -100)
    car1.addImage(car1img)
    car1.scale = 0.07
    car2 = createSprite(width/2 +100, height -100)
    car2.addImage(car2img)
    car2.scale = 0.07
    carros = [car1, car2]
    oils = new Group()
    coins = new Group()
    grupoobsta = new Group()
    var posiobsta = [{ x: width / 2 + 250,
    y: height - 800,
    image: obstacle2Image },
    { x: width / 2 - 150,
    y: height - 1300,
    image: obstacle1Image },
    { x: width / 2 + 250,
    y: height - 1800,
    image: obstacle1Image },
    { x: width / 2 - 180,
    y: height - 2300,
    image: obstacle2Image },
    { x: width / 2,
    y: height - 2800,
    image: obstacle2Image },
    { x: width / 2 - 180, y: height - 3300,
    image: obstacle1Image },
    { x: width / 2 + 180,
    y: height - 3300,
    image: obstacle2Image },
    { x: width / 2 + 250,
    y: height - 3800,
    image: obstacle2Image }, 
    { x: width / 2 - 150,
    y: height - 4300, 
    image: obstacle1Image },
    { x: width / 2 + 250,
    y: height - 4800,
    image: obstacle2Image }, 
    {x: width / 2,
    y: height - 5300, image: obstacle1Image },
    { x: width / 2 - 180, y: height - 5500,
    image: obstacle2Image } ];
    this.addSprites(oils, 4, oilsimg, 0.02)
    this.addSprites(coins, 18, coinsimg, 0.09)
    this.addSprites(grupoobsta, posiobsta.length, posiobsta.image, 0.04, posiobsta)
  }
  
  handleElements(){
    form.hide()
      form.titleImg.position(40, 50)
      form.titleImg.class("gameTitleAfterEffect")
    
      this.resetTitle.html("reiniciar jogo")
      this.resetTitle.class("resetText")
      this.resetTitle.position(width/2 + 200, 40)

      this.resetButton.class('resetButton')
      this.resetButton.position(width/2 +230, 100)

      this.leaderBoardTitle.html("placar")
      this.leaderBoardTitle.class("resetText")
      this.leaderBoardTitle.position(width/3 - 60, 40)
      

      this.leader1.class("leadersText")
      this.leader1.position (width/ 3-50, 80 )

      this.leader2.class("leadersText")
      this.leader2.position (width/ 3-50, 130 )
  }
  play(){
    this.handleElements()
    this.handleresetbutton();
  Player.getPlayersInfo()
 if(allPlayers!== undefined){
   image(pistaimg, 0, -height *5, width, height *6)
   this.showleaderboard()
   var index = 0
   for(var plr in allPlayers){
     index = index+1
     var x = allPlayers[plr].positionX
     var y = height - allPlayers[plr].positionY
     carros[index-1].position.x = x
     carros[index-1].position.y = y
    if(index === player.index){
      stroke(10);
      fill('red');
      ellipse(x, y, 60, 60);
      camera.position.y = carros[index - 1].position.y
    
    }
  }
   this.handlePlayerControls()
   drawSprites()
 }
    }

    handlePlayerControls(){
      if(keyIsDown(UP_ARROW)){
        player.positionY+=10
        player.update()
      }
      if(keyIsDown(LEFT_ARROW)&& player.positionX > width /3 - 50){
        player.positionX -= 5 
        player.update()
      }
      if(keyIsDown(RIGHT_ARROW)&& player.positionX < width /2 + 300){
        player.positionX += 5 
        player.update()
      }
    }

    handleoils(index){
      carros[index - 1].overlap(oils, function(collector, collected){
      player.oil =185
      collected.remove()
      })
    }

    handlecoins(index){
      carros[index - 1].overlap(coins, function(collector, collected){
      player.score +=21
      collected.remove()
      player.update()
    })
    }

    handleresetbutton(){
      this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount: 0 , 
        gameState: 0 , 
        players: {}
      })
      window.location.reload()
    })
    }
    showleaderboard(){
      var leader1, leader2;
      var players = Object.values(allPlayers)
     if(players[0].rank === 0 && players[1].rank === 0 || players[0].rank === 1 ){
       leader1 =
       players[0].rank +
       "&emsp;"+
       players[0].name+
       "&emsp;"+
       players[0].score

       leader2 =
       players[1].rank +
       "&emsp;"+
       players[1].name+
       "&emsp;"+
       players[1].score

     } 
     if(players[1].rank === 1){
      leader1 =
      players[1].rank +
      "&emsp;"+
      players[1].name+
      "&emsp;"+
      players[1].score

      leader2 =
      players[0].rank +
      "&emsp;"+
      players[0].name+
      "&emsp;"+
      players[0].score
     }
     this.leader1.html(leader1)
     this.leader2.html(leader2)
    }
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, posicao = []){
    for(var i = 0; i <numberOfSprites; i ++){
      var x , y
      if(posicao.length > 0){
       x = posicao[i].x
       y = posicao[i].y
      spriteImage = posicao[i].image}
      else{
      x = random(width /2 + 150, width /2 - 150)
      y = random(- height * 4.5, height -400)}
      var sprite = createSprite(x, y)
      sprite.addImage("sprite", spriteImage)
      sprite.scale = scale
      spriteGroup.add(sprite)
    }
  }
  }