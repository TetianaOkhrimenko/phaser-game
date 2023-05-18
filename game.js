const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
});

let platforms;

function preload() {
  //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  //game.scale.pageAlignHorizontally = true;
  //game.scale.pageAlignVertically = true;
  //game.stage.backgroundColor = "#bbe4e9";

  this.load.image("background", "assets/nebula.jpg");
  //this.load.image("background", "assets/background.png");
  this.load.image("block", "assets/platform4.png");
  this.load.image("ground", "assets/platform4.png");
  this.load.image("platform", "assets/platform5.png");
  this.load.image("doggo", "assets/orange-cat1.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

let score = 0;
let scoreText;

function create() {
  this.w = this.cameras.main.width;
  this.h = this.cameras.main.height;
  console.log(this.w, this.h);

  const worldHeight = 3000;

  /*let bg = this.add.image(this.w / 2, this.h / 2, "background");

  for (let i = 1; i < 10; i++) {
    this.backgr = this.add
      .tileSprite(0, 0, this.w, this.h * i, "background")
      .setOrigin(0, 1)
      .setScrollFactor(1);
  }*/

  for (let i = 1; i < 10; i++) {
    let tileBg = this.add.tileSprite(
      400,
      worldHeight + 300,
      800,
      600 * i,
      "background"
    );
  }

  /*this.backgr = this.add
    .tileSprite(0, 0, 800, 600, "background")
    .setOrigin(0, 1)
    .setScrollFactor(1);*/

  this.physics.world.checkCollision.up = false;
  this.physics.world.checkCollision.down = false;

  //this.add.image(400, 300, "background");

  //let bg = this.add.image(400, 300, "background");
  // let bg = this.add.image(this.w / 2, this.h / 2, "background");

  //this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);

  this.cameras.main.setBounds(0, 0, 800, worldHeight);
  this.physics.world.setBounds(0, 0, 800, worldHeight);

  //this.cameras.main.setBounds(0, 0, this.w, this.h *2);

  platforms = this.physics.add.group({
    defaultKey: "ground",
  });

  movingPlatforms = this.physics.add.group({
    defaultKey: "platform",
  });

  /* platforms = this.physics.add.group({
    key: "ground",
    frameQuantity: 20,
    setXY: { x: 200, y: 150, stepY: 150, stepX: 150 },
    velocityX: 100,
    immovable: true,
    moves: false,
  });*/

  //platforms = this.physics.add.staticGroup({
  // key: "platforms",
  //repeat: 5,
  //setXY: { x: 5, y: 200, stepX: 100 },
  //});

  /*for (let i = 0; i < 10; i++) {
    platforms.create(
      Phaser.Math.RND.between(0, 800),
      Phaser.Math.RND.between(0, 600)
    );
  }*/

  let center = this.w / 2;
  console.log(center);

  for (let i = 1; i < 25; i++) {
    //platforms.create(Phaser.Math.RND.between(0, this.w - 50), this.h - 100 * i);
    platforms.create(
      Phaser.Math.RND.between(20 + 20 * i, this.w - 20),
      worldHeight - 90 * i
    );
    //platforms.create(i * 100 + 100, i * 100 + 200);
  }

  for (let i = 1; i < 10; i++) {
    //platforms.create(Phaser.Math.RND.between(0, this.w - 50), this.h - 100 * i);
    movingPlatforms.create(
      Phaser.Math.RND.between(20, this.w - 100),
      worldHeight - 150 * i
    );
    //platforms.create(i * 100 + 100, i * 100 + 200);
  }

  // platforms.createMultiple();

  /*platforms.create(600, 550);
  platforms.create(200, 500);
  platforms.create(700, 480);
  platforms.create(750, 400);
  platforms.create(800, 320);
  platforms.create(600, 150);
  platforms.create(550, 250);*/

  for (const platform of platforms.getChildren()) {
    platform.body.immovable = true;
    platform.body.moves = false;
    platform.body.velocity.x = 100;
  }

  for (const platform of movingPlatforms.getChildren()) {
    platform.body.immovable = true;
    //platform.body.moves = false;

    platform.setVelocity(-100, 0);
    platform.body.allowGravity = false;
    platform.setFriction(0, 1);

    platform.maxDistance = 200;
    platform.previousX = platform.x;
    platform.setOrigin(0.5, 0.5);
    // platform.setCollideWorldBounds(true);

    // platform.setScale(0.25);

    /*if (Math.abs(platform.x - platform.previousX) >= platform.maxDistance) {
      switchDirection(platform);
    }*/
  }

  /* movingPlatforms.children.iterate((child) => {
    this.tweens.add({
      targets: child,
      //value: { from: 0, to: 100 },
      //value2: { from: 10, to: 200 },
      x: 200,
      ease: "sine.inOut",
      duration: 2000,
      delay: 2000,
      repeat: -1,
      yoyo: true,
    });
  });*/
  //const block = this.physics.add.staticImage(400, 568, "block");

  const block = this.physics.add
    //.staticImage(this.w / 2, this.h + 100, "block")
    .staticImage(this.w / 2, worldHeight - 30, "block")
    .setScale(1.2);

  //player = this.physics.add.sprite(400, 450, "doggo");
  //player = this.physics.add.sprite(this.w / 2, this.h - 50, "doggo");
  player = this.physics.add.sprite(this.w / 2, worldHeight - 100, "doggo");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  player.body.setGravityY(300);

  //this.cameras.main.startFollow(player, true, 0, 0.05, -200, 120);
  this.cameras.main.startFollow(player, true, 0, 0.05, 0, 0);

  //this.cameras.main.startFollow(player);

  cursors = this.input.keyboard.createCursorKeys();

  //this.backgr.tilePositionY += 100;

  //this.physics.add.collider(player, platforms);

  scoreText = this.add.text(this.w / 2 + 250, 20, "Score: 0", {
    fontSize: "26px",
    fill: "#eee", //#000
  });

  hud = this.add.container(0, 0, [scoreText]);
  //lock it to the camera
  hud.setScrollFactor(0);

  //scoreText.fixedToCamera = true;

  this.physics.add.collider(player, platforms, (player, platform) => {
    if (player.body.touching.down && platform.body.touching.up) {
      score += 1;
      scoreText.setText("Score: " + score);

      //platform.body.moves = true;
      //platform.body.checkCollision.none = true;

      //scoreText.fixedToCamera = true;
    }
    //player.body.checkWorldBounds();
  });

  this.physics.add.collider(player, movingPlatforms, (player, platform) => {
    if (player.body.touching.down && platform.body.touching.up) {
      score += 1;
      scoreText.setText("Score: " + score);
      player.setVelocity(-100, 0);
      //player.body.immovable = true;
    }

    //platform.body.moves = true;
    //platform.body.checkCollision.none = true;

    //scoreText.fixedToCamera = true;

    //player.body.checkWorldBounds();
  });

  this.physics.add.collider(player, block);

  this.physics.add.collider(platforms, movingPlatforms);

  //this.physics.add.collider(player, platforms, (player, platform) => {
  //platform.body.moves = true;
  // platform.body.checkCollision.none = true;
  //});
}

function touchPlatform() {
  //if (this.physics.arcade.collide(player, platforms)) {
  score += 10;
  scoreText.setText("Score: " + score);
  //}
}

function update() {
  // if (this.physics.collider(this.player, this.platforms)) {
  //  touchPlatform();
  //}
  //const { scrollX, scrollY } = this.cameras.main;
  const cam = this.cameras.main;

  //this.backgr.setTilePosition(scrollX, scrollY);
  //this.backgr.setTilePosition(this.cameras.main.scrollY);
  //this.backgr.tilePositionY -= 1;

  if (cursors.left.isDown) {
    player.setVelocityX(-180);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(180);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  /*if (cursors.up.isDown) {
    cam.scrollY -= 1;
  }*/

  //else if (cursors.down.isDown) {
  //  cam.scrollY += 1;
  //}

  if (cursors.up.isDown && player.body.touching.down) {
    //if (cursors.up.isDown && player.body.touching.down)
    player.setVelocityY(-500);
  }

  //this.physics.add.collider(player, platforms, touchPlatform, null, this);

  movingPlatforms.getChildren().forEach(function (platform) {
    //check if it's time for them to turn around
    if (Math.abs(platform.x - platform.previousX) >= platform.maxDistance) {
      switchDirection(platform);
    }
  }, this);
}

function switchDirection(platform) {
  //reverse velocity so baddie moves are same speed but in opposite direction
  platform.body.velocity.x *= -1;
  //reset count
  platform.previousX = platform.x;
}
