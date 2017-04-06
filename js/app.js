// Game setup

var game = {
  playerOne: {
    time:0,
    timeDisplay: $('#pOneTime')
  },
  playerTwo: {
    time:0,
    timeDisplay: $('#pTwoTime')
  },

  bubbles: [
    {image: 'images/ice-cream_01.png'},
    {image: 'images/ice-cream_02.png'},
    {image: 'images/ice-cream_03.png'},
    {image: 'images/ice-cream_04.png'},
    {image: 'images/ice-cream_05.png'},
    {image: 'images/ice-cream_06.png'},
    {image: 'images/ice-cream_07.png'},
    {image: 'images/ice-cream_08.png'},
    {image: 'images/fruit_01.png'},
    {image: 'images/fruit_02.png'},
    {image: 'images/ice-cream_01.png'},
    {image: 'images/ice-cream_02.png'},
    {image: 'images/ice-cream_03.png'},
    {image: 'images/ice-cream_04.png'},
    {image: 'images/ice-cream_05.png'},
    {image: 'images/ice-cream_06.png'},
    {image: 'images/ice-cream_07.png'},
    {image: 'images/ice-cream_08.png'},
    {image: 'images/fruit_01.png'},
    {image: 'images/fruit_02.png'},
  ]
  }


// Variables

var $pOneTime = $('#pOneTime')
var $pTwoTime =$('#pTwoTime')
var clicks = 0
var currentPic = null
var start = $('#start')
var timer = $('#timer')
var time = 0
var gameClock = null;


//Sound effects

var fx = {
  pop: new Audio('audio/pop.mp3'),
  intro: new Audio('audio/intro.mov')
  }

$('h1').on('click', function() {
  fx.intro.play()
  console.log('play')
  })


// Game reset button

$('#replay').click(function() {
  location.reload();
  });


// Populates the HTML

game.bubbles.forEach(function(b) {
  $('.container').append('<div class="bubbles"><img src="' + b.image + '"></div>')
  })

  $('#start').on('click', startRound)

function startRound () {

  $('.bubbles').on('click', bubbleHandler)
  console.log('started')
  gameClock = setInterval(function() {
  time ++
  $('#seconds').text(time)}, 1000)
  }

function bubbleHandler () {

  fx.pop.play()
  console.log('clicked a bubble')
  $(this).addClass('faceUp')
  console.log(this.firstChild.src)

  if (currentPic == null) {
      currentPic = this.firstChild.src
      } else {

//      console.log(this.firstChild.src == currentPic)

  if(this.firstChild.src == currentPic){

      console.log('You found a pair!')
      $('.faceUp').addClass('matched')

      } else {
        console.log('No match')
        setTimeout(function() {
        $('.faceUp').not('.matched').removeClass('faceUp')
        }, 3000)
      }
      currentPic = null

      // If all bubbles have .matched class:
      if($('.matched').length == $('.bubbles').length) {
        console.log('Round should end here..')
        clearInterval(gameClock)
        currentPlayer.time = time
        // Time display
        currentPlayer.timeDisplay.text("Time: " + time)
        console.log (currentPlayer.time)
        time = 0
        $('#seconds').text(time)
        $('.bubbles').removeClass('matched faceUp')
        switchTurns()

      } else {
        console.log('Round is not over yet..')
      }
    }
    }


// Switching players

var currentPlayer = game.playerOne

function switchTurns() {

  if (currentPlayer == game.playerOne) {
    currentPlayer = game.playerTwo
  } else {
    checkWinner()
  }
  }


// Checking winner

function checkWinner(){

  if (game.playerOne.time < game.playerTwo.time){
    $('#winner').text('WON!')
  } else if (game.playerOne.time > game.playerTwo.time){
    $('#winner2').text('WON!')
  } else {
    $('#winner').text('TIE')
    $('#winner2').text('TIE')
  }
  }
