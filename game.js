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

  this.load.image("background", "assets/background.png");
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
  this.physics.world.checkCollision.up = false;
  this.physics.world.checkCollision.down = false;

  this.add.image(400, 300, "background");

  //platforms = this.physics.add.staticGroup();
  platforms = this.physics.add.group({
    defaultKey: "ground",
  });

  //platforms = this.physics.add.staticGroup({
  // key: "platforms",
  //repeat: 5,
  //setXY: { x: 5, y: 200, stepX: 100 },
  //});

  //platforms.create(400, 568);
  platforms.create(600, 550);
  platforms.create(200, 500);
  //platforms.create(450, 440);
  platforms.create(700, 480);
  platforms.create(750, 400);
  platforms.create(800, 320);
  platforms.create(600, 150);

  for (const platform of platforms.getChildren()) {
    platform.body.immovable = true;
    platform.body.moves = false;
  }

  const block = this.physics.add.staticImage(400, 568, "block");

  player = this.physics.add.sprite(400, 450, "doggo");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(500);

  cursors = this.input.keyboard.createCursorKeys();

  //this.physics.add.collider(player, platforms);

  scoreText = this.add.text(20, 20, "Score: 0", {
    fontSize: "26px",
    fill: "#000",
  });

  this.physics.add.collider(player, platforms, (player, platform) => {
    platform.body.moves = true;
    platform.body.checkCollision.none = true;

    score += 1;
    scoreText.setText("Score: " + score);
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
  const { scrollX, scrollY } = this.cameras.main;

  if (cursors.left.isDown) {
    player.setVelocityX(-150);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(150);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-350);
  }

  //this.physics.arcade.collide(player, platforms, touchPlatform);
}
