(function () {
    var questions = [{
    
      question: "url_img",
      choices: ["door", "window", "wall"],
      correctAnswer: 0 ,
      group: 1},
    {
      question: "What greetings is?",
      choices: ["Good days!","Good morn!","Good morning"],
      correctAnswer: 2,
      group:2},
     
    {
      question: "What question is in this case?",
      choices: ["How much old are you", "How many years do you have?", "How old are you?"],
      correctAnswer: 2 ,
      group: 3,}];
    
  
 
    console.log(questions);   


    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    console.log(selections);
  
    // Display initial question
    displayNext();
  
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
  
      // Suspend click listener during fade animation
      if (quiz.is(':animated')) {
        return false;
      }
      choose();
  
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
  
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
  
      if (quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
  


  
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
  
      if (quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });

  


    function createQuestionElement(index) {
    var group = questions[index].group;

 
   


      var qElement = $('<div>', {
        id: 'question' });
         var containerImg  = $('#img');
        if(group == 1){
          var img = $('<img  id="group"  class="img-exam" src="img/1.jpg" alt="">');
        }else if(group == 2){
          var img = $('<img  id="group" class="img-exam" src="img/2.jpg" alt="">');
        } else if(group == 3){
          var img = $('<img  id="group" class="img-exam" src="img/3.jpg" alt="">');
        }
        containerImg.append(img);
      //  var img = $('<img class="img-exam" src="img/1.jpg" alt="">');
      //  qElement.append(img);
    
      //  var arrows = $('<div class="flechas"><a  class="button" id="prev">PREV </a><a class="button" id="next">NEXT</a></div>');           
      //  qElement.append(arrows);
     

      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
  
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
  
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
  
      return qElement;
    }
  

    function createRadios(index) {
      var radioList = $('<div id="question" class="options">');
      var item;
      var input = '';

      for (var i = 0; i < questions[index].choices.length; i++) {if (window.CP.shouldStopExecution(0)) break;
        item = $('<li class="option">');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
  
      }window.CP.exitedLoop(0);
      return radioList;
    }
  
  
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
  
    // DISPLAYS  NEXT REQUESTED ELEMENT
    function displayNext() {
      quiz.fadeOut(function () {

        $('#group').remove();
        $('#question').remove();

           // APPEND IN SELECTIONS QUESTIONS

     var listaPreguntas = $('#listaPreguntas');



     listaPreguntas.append('<p>'+selections+'</p>');

  

  
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!isNaN(selections[questionCounter])) {
            $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
          }
  
     
          if (questionCounter === 1) {
            $('#prev').show();
          } else if (questionCounter === 0) {
  
            $('#prev').hide();
            $('#next').show();
          }
        } else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
  

    function displayScore() {
      var score = $('<p>', { id: 'question' });
  
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {if (window.CP.shouldStopExecution(1)) break;
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }window.CP.exitedLoop(1);
  
      score.append('You got ' + numCorrect + ' questions out of ' +
      questions.length + ' right!!!');
      return score;
    }






 })();







