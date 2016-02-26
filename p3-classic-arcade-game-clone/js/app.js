"use strict";

/**
 * Represents an enemy that the player must avoid.
 *
 * @constructor
 */
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = randomize(200, 1010);
    this.y = y;
    this.WIDTH = 50;
    this.HEIGHT = 50;
    this.speed = randomize(300,500);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Updates the enemy's position.
 *
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 1000) {
        this.x = randomize(-200, -100);
        this.speed = randomize(300,500);
    }
};

/**
 * This function draws the enemy on the screen.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * This class represents the player character in the game.
 *
 * @constructor
 */
var Player = function() {
    this.x = 404;
    this.y = 300;
    this.WIDTH = 50;
    this.HEIGHT = 50;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    checkForCollisions();
    if (this.y < 42) {
        this.y = 300;
        stats.setNewScore(1);
        document.getElementById('score').innerHTML = stats.getScore();
        console.log(stats.getScore());

        /**
         * Checks if you won the game.
         */
        if (stats.getScore() === 5) {
            alert('Congratulations! You won!');
            location.reload();
        }
    }
};

Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Updates the player's position based on the key pressed.
 *
 * @param key - a string representation of available player moves.
 */
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        if (this.x === 0) {
            this.x = 0;
        } else {
            this.x -= 101;
        }
    }
    if (key === 'right') {
        if (this.x === 909) {
            this.x = 909;
        } else {
            this.x += 101;
        }
    }
    if (key === 'down') {
        if (this.y === 386) {
            this.y = 386;
        } else {
            this.y += 86;
        }
    }
    if (key === 'up') {
        this.y -= 86;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(50);
var enemy2 = new Enemy(120);
var enemy3 = new Enemy(200);
var enemy4 = new Enemy(50);
var enemy5 = new Enemy(120);
var enemy6 = new Enemy(200);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});

function checkForCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + allEnemies[i].WIDTH &&
            player.x + player.WIDTH > allEnemies[i].x &&
            player.y < allEnemies[i].y + allEnemies[i].HEIGHT &&
            player.y + player.HEIGHT > allEnemies[i].y) {
            collisionAudio.play();
            player.x = 202;
            player.y = 300;
            stats.setNewLives(1);
            document.getElementById('lives').innerHTML = stats.getLives();
            if (stats.getLives() === 0) {
                alert('Wanna try again?');
                location.reload();
            }
        }
    }

}

function randomize(min, max) {
    return Math.floor((Math.random() * (min - max) + min));
}

var stats = function() {
    var score = 0;
    var lives = 3;
    return {
        setNewScore: function(n) {
            score = score + n;
        },
        getScore: function() {
            return score;
        },
        setNewLives: function(n) {
            lives = lives - n;
        },
        getLives: function() {
            return lives;
        }
    };
}();

var collisionAudio = new Audio("sounds/crunch.wav");