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

  for (let i = 1; i < 10; i++) {
    this.backgr = this.add
      .tileSprite(0, 0, this.w, this.h * i, "background")
      .setOrigin(0, 1)
      .setScrollFactor(1);
  }

  /*this.backgr = this.add
    .tileSprite(0, 0, 800, 600, "background")
    .setOrigin(0, 1)
    .setScrollFactor(1);*/

  this.physics.world.checkCollision.up = false;
  this.physics.world.checkCollision.down = false;

  //this.add.image(400, 300, "background");

  //let bg = this.add.image(400, 300, "background");
  let bg = this.add.image(this.w / 2, this.h / 2, "background");

  //this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
  this.cameras.main.setBounds(0, 0, 600, 800);
  //this.cameras.main.setBounds(0, 0, this.w, this.h * 5);

  //platforms = this.physics.add.staticGroup();
  platforms = this.physics.add.group({
    defaultKey: "ground",
  });

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
  for (let i = 1; i < 20; i++) {
    platforms.create(Phaser.Math.RND.between(0, this.w - 50), this.h - 100 * i);
    //platforms.create(i * 100 + 100, i * 100 + 200);
  }

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

  //const block = this.physics.add.staticImage(400, 568, "block");

  const block = this.physics.add
    .staticImage(this.w / 2, this.h + 100, "block")
    .setScale(1.2);

  //player = this.physics.add.sprite(400, 450, "doggo");
  player = this.physics.add.sprite(this.w / 2, this.h - 50, "doggo");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  player.body.setGravityY(300);

  this.cameras.main.startFollow(player, true, 0, 0.05, -200, 120);

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
      platform.body.moves = true;
      platform.body.checkCollision.none = true;

      score += 1;
      scoreText.setText("Score: " + score);
      //scoreText.fixedToCamera = true;
    }
    //player.body.checkWorldBounds();
  });

  this.physics.add.collider(player, block);

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
  this.backgr.setTilePosition(scrollX, scrollY);
  //this.backgr.setTilePosition(this.cameras.main.scrollY);
  //this.backgr.tilePositionY -= 100;

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

  if (cursors.up.isDown) {
    //if (cursors.up.isDown && player.body.touching.down)
    player.setVelocityY(-500);
  }

  //this.physics.arcade.collide(player, platforms, touchPlatform);
}
