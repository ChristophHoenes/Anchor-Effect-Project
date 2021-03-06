var intro = {
    name: 'intro',
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. In this study, we are going to ask you some general knowledge questions.",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
    // render function renders the view
    render: function() {

        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: 'instructions',
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "On each trial, first you will see a question and two response options. Keep in mind that the numbers in the questions are randomly selected. Afterwards you have to give an exact estimation. Please answer the questions without looking them up anywhere. We are going to start with two practice trials.",
    // instuction's slide proceeding button text
    "buttonText": "Go to practice trial",
    render: function() {

        viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

{
  var practice = {
      name: 'practice',
      "title": "Practice trial",
      // render function renders the view
      render: function (CT) {
          if (exp.anchor_practice[CT] == "high") {
            var question_ending = exp.trial_info.practice_trials[CT].anchor_high
          }
          else {
            var question_ending = exp.trial_info.practice_trials[CT].anchor_low
          }
          viewTemplate = $("#practice-view").html();
          $('#main').html(Mustache.render(viewTemplate, {
          title: this.title,
          question: exp.trial_info.practice_trials[CT].anchor_question + question_ending,
          option1: exp.trial_info.practice_trials[CT].anchor_option1,
          option2: exp.trial_info.practice_trials[CT].anchor_option2,
          }));
          startingTime = Date.now();
          // attaches an event listener to the yes / no radio inputs
          // when an input is selected a response property with a value equal to the answer is added to the trial object
          // as well as a readingTimes property with value - a list containing the reading times of each word
          $('input[name=answer]').on('change', function() {
              RT = Date.now() - startingTime; // measure RT before anything else
              trial_data = {
                  trial_type: "practice",
                  trial_number: CT+1,
                  question: exp.trial_info.practice_trials[CT].anchor_question,
                  option1: exp.trial_info.practice_trials[CT].anchor_option1,
                  option2: exp.trial_info.practice_trials[CT].anchor_option2,
                  anchor: exp.anchor_practice[CT],
                  typed_response: $('input[name=answer]:checked').val(),
                  RT: RT
              };

              //exp.trial_data.push(trial_data)
              exp.findNextView();
          });

      },
  }

  var practice2 = {
      render: function(CT) {

        viewTemplate = $("#practice-view-2").html();
        $('#main').html(Mustache.render(viewTemplate, {
        title: this.title,
        question: exp.trial_info.practice_trials[CT].question,
        option1: exp.trial_info.practice_trials[CT].option1,
        option2: exp.trial_info.practice_trials[CT].option2,
        }));
        startingTime = Date.now();
        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        $('#next').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practice",
                trial_number: CT+1,
                question: exp.trial_info.practice_trials[CT].question,
                option1: exp.trial_info.practice_trials[CT].option1,
                option2: exp.trial_info.practice_trials[CT].option2,
                typed_response: $('#answer').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data)
            exp.findNextView();
        });

      },

  }
trials: 1
};

var beginMainExp = {
    name: 'beginMainExp',
    "text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin.",
    // render function renders the view
    render: function() {

        viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

{
  var main = {
      name: 'main',
      // render function renders the view
      render : function(CT) {
          if (exp.anchor_main[CT] == "high") {
            var question_ending = exp.trial_info.main_trials[CT].anchor_high
          }
          else {
            var question_ending = exp.trial_info.main_trials[CT].anchor_low
          }
          // fill variables in view-template
          var viewTemplate = $('#main-view').html();
          $('#main').html(Mustache.render(viewTemplate, {
              question: exp.trial_info.main_trials[CT].anchor_question + question_ending,
              option1:  exp.trial_info.main_trials[CT].anchor_option1,
              option2:  exp.trial_info.main_trials[CT].anchor_option2,
          }));

          // update the progress bar based on how many trials there are in this round
          //var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
          //$('#filled').css('width', filled);

          // event listener for buttons; when an input is selected, the response
          // and additional information are stored in exp.trial_info
          $('input[name=answer]').on('change', function() {
              RT = Date.now() - startingTime; // measure RT before anything else
              trial_data = {
                  //trial_type: "mainForcedChoice",
                  trial_number: CT + 1,
                  question: exp.trial_info.main_trials[CT].anchor_question + question_ending,
                  //option1:  exp.trial_info.main_trials[CT].anchor_option1,
                  //option2:  exp.trial_info.main_trials[CT].anchor_option2,
                  //anchor: exp.anchor[CT],
                  //option_chosen: $('#answer').val(),
                  RT: RT
              };
              //exp.trial_data.push(trial_data);
              exp.findNextView();
          });

          // record trial starting time
          startingTime = Date.now();

      },
    }

    var main2 = {
        name: 'main',
        // render function renders the view
        render : function(CT) {

            // fill variables in view-template
            var viewTemplate = $('#main-view-2').html();
            $('#main').html(Mustache.render(viewTemplate, {
                question: exp.trial_info.main_trials[CT].question,
            }));

            // update the progress bar based on how many trials there are in this round
            //var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
            //$('#filled').css('width', filled);

            // event listener for buttons; when an input is selected, the response
            // and additional information are stored in exp.trial_info
            $('#next').on('click', function() {
                RT = Date.now() - startingTime; // measure RT before anything else
                trial_data = {
                    //trial_type: "mainForcedChoice",
                    trial_number: CT + 1,
                    anchor: exp.anchor_main[CT],
                    question: exp.trial_info.main_trials[CT].question_id,
                    //question: exp.trial_info.main_trials[CT].question,
                    answer: $('#answer').val(),
                    RT: RT
                };
                exp.trial_data.push(trial_data);
                exp.findNextView();
            });

            // record trial starting time
            startingTime = Date.now();

        },
    };
  trials : 1
};

var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.anchor_knowledge = $('#anchor-knowledge').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    "message": "That was quick! You scored 13920 points. Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};
