
var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Who is the only person to receive both an Oscar and the Nobel Prize?",
  answers: ["Al Gore", "Jane Fonda", "John Steinbeck", "George Bernard Shaw"],
  correctAnswer: "George Bernard Shaw",
  image:"assets/images/George Bernard Shaw Silly Eyes.gif"
}, {
  question: "Who is the oldest woman to win an Academy Award for acting?",
  answers: ["Jessica Tandy", "Katharine Hepburn", "Helen Mirren", "Geraldine Page"],
  correctAnswer: "Jessica Tandy",
  image:"assets/images/JessicaTandy.gif"
}, {
  question: "Who is the youngest winner of an acting Academy Award?",
  answers: ["Tatum Oneal", "Mary Badham", "Anna Paquin", "Abigail Breslin"],
  correctAnswer: "Tatum Oneal",
  image:"assets/images/TatumOneal1.gif"
}, {
  question: "Which film series has won more than one Academy Award for Best Picture?",
  answers: ["The Lord of the Rings", "Rocky", "James Bond", "The Godfather"],
  correctAnswer: "The Godfather",
  image:"assets/images/Godfather1.gif"
}, {
  question: "Who is the only African American woman to win a Best Actress Oscar?",
  answers: ["Hattie McDaniel", "Whoopi Goldberg", "Halle Berry", "Jennifer Hudson"],
  correctAnswer: "Hattie McDaniel",
  image:"assets/images/Hattie.gif"
}, {
  question: "Who is the only person to win an Oscar for playing a real-life Academy Award winner?",
  answers: ["Elizabeth Taylor", "Meryl Streep", "Cate Blanchett", "Paul Newman"],
  correctAnswer: "Cate Blanchett",
  image:"assets/images/KateBlanchett.gif"
}, {
  question: "Who was the first woman to win an Academy Award for Best Director?",
  answers: ["Jane Campion", "Kathryn Bigelow", "Lina Wertmuller", "Sofia Coppola"],
  correctAnswer: "Kathryn Bigelow",
  image:"assets/images/KathrynBigelow.gif"
}, {
  question: "What is the only X-rated film to win an Oscar for Best Picture?",
  answers: ["Midnight Cowboy", "Basic Instinct", "Last Tango in Paris", "A Clockwork Orange"],
  correctAnswer: "Midnight Cowboy",
  image:"assets/images/MidnightCowboy1.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>The results are ...</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Incorrect!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 5 * 1000);
    } else {
      setTimeout(game.nextQuestion, 5 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
