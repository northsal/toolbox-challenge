//app.js: our main javascript file
"use strict";

// metric
//track 1st image with a variable
//delay after flipping two tiles over window.setTimeout /boolean variable 
var tiles = [];
var idx;
var tile;
var matches;
var remaining;
var attempts;
for(idx = 1; idx <= 32; ++idx) {
    tiles.push({
        tileNum: idx,
        src: 'img/tile' + idx + '.jpg',
        flipped: false,
        matched: false
    });
}//for each tile
matches = 0;
remaining = 8;
attempts = 0;

var remainStat = document.getElementById('remain');
remainStat.innerHTML = remaining;

var matchStat = document.getElementById('matches');
matchStat.innerHTML = matches;

var attemptStat = document.getElementById('attempt');
attemptStat.innerHTML = attempts;

var running = false;
//when document is ready....
$(document).ready(function() {
    $('#start-game').click(function() {
        console.log('start game button clicked!');
        tiles = _.shuffle(tiles);
        var selectedTiles = tiles.slice(0, 8);
        var tilePairs = [];
        _.forEach(selectedTiles, function (tile) {
            tilePairs.push(tile);
            tilePairs.push(_.clone(tile));
        });
        tilePairs = _.shuffle(tilePairs);

        var gameBoard = $('#game-board');
        var row = $(document.createElement('div'));
        var img;
        _.forEach(tilePairs, function (tile, elemIndex) {
            if (elemIndex > 0 && 0 === (elemIndex % 4)) {
                gameBoard.append(row);
                row = $(document.createElement('div'));
            }

            img = $(document.createElement('img'));
            img.attr({
                src: 'img/tile-back.png',
                alt: 'tile ' + tile.tileNum
            });

            img.data('tile', tile);
            row.append(img);

        });
        gameBoard.append(row);
        //Get starting milliseconds
        var startTime = Date.now();
        window.setInterval(function () {
            var elapsedSeconds = (Date.now() - startTime) / 1000;
            elapsedSeconds = Math.floor(elapsedSeconds);
            $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
        }, 1000);
           var turn = [];
            $('#game-board img').click(function () {
                if(running == false) {
                    var clickedImg = $(this);
                    var tile = clickedImg.data('tile');
                    if (tile.flipped == false && turn.length <= 1) {
                        if (turn.length == 0) {
                            console.log(tile);
                            flipTile(tile, clickedImg);
                            turn.push(clickedImg);
                        } else {//End of turn
                            flipTile(tile, clickedImg);
                            var image2 = turn[0];
                            var tile2 = image2.data('tile');
                            if (tile.tileNum == tile2.tileNum) {
                                ++matches;
                                --remaining;
                                matchStat.innerHTML = matches;
                                remainStat.innerHTML = remaining;
                                tile.matched = true;
                                tile2.matched = true;
                            } else {
                                ++attempts;
                                attemptStat.innerHTML = attempts;
                                running = true;
                                    window.setTimeout(function () {
                                        flipTile(tile2, image2);                                        flipTile(tile, clickedImg);
                                       running = false;
                                    }, 1000);

                            }
                            turn = [];
                            if(matches == 8) {
                                alert("You won!");
                            }
                        }
                    }
                }
            });
    });//start game button click
});//doc ready function

function flipTile(tile, img) {
    img.fadeOut(100, function() {
        if(tile.flipped) {
            img.attr('src', 'img/tile-back.png');
        } else {
            img.attr('src', tile.src);
        }
        tile.flipped = ! tile.flipped;
        img.fadeIn(100);
    });
}

function setGame() {
    console.log('start game button clicked!');
    tiles = _.shuffle(tiles);
    var selectedTiles = tiles.slice(0, 8);
    var tilePairs = [];
    _.forEach(selectedTiles, function (tile) {
        tilePairs.push(tile);
        tilePairs.push(_.clone(tile));
    });
    tilePairs = _.shuffle(tilePairs);

    var gameBoard = $('#game-board');
    var row = $(document.createElement('div'));
    var img;
    _.forEach(tilePairs, function (tile, elemIndex) {
        if (elemIndex > 0 && 0 === (elemIndex % 4)) {
            gameBoard.append(row);
            row = $(document.createElement('div'));
        }

        img = $(document.createElement('img'));
        img.attr({
            src: 'img/tile-back.png',
            alt: 'tile ' + tile.tileNum
        });

        img.data('tile', tile);
        row.append(img);

    });
    gameBoard.append(row);
    //Get starting milliseconds
    var startTime = Date.now();
    window.setInterval(function () {
        var elapsedSeconds = (Date.now() - startTime) / 1000;
        elapsedSeconds = Math.floor(elapsedSeconds);
        $('#elapsed-seconds').text(elapsedSeconds + ' seconds');
    }, 1000);
}