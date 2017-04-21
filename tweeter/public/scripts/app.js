$( () => {
  const maxLen = 140;
  const $form = $('form[name="new-tweet"]');
  $form.on('submit', (event) => {
    $(this).trigger('reset');
    event.preventDefault();
    //form validatation with name of the field
    $form.validate({
      rules: {
        text: {
          required: true,
          // limitation of the length of text message  
          maxlength: maxLen
        }
      },
      messages: {
        text: {
          required: 'Please provide your tweet text.',
          maxlength: `Your text must be less than ${maxLen} characters.`
        }
      },
      submitHandler: (form) => {
        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: $(form).serialize(),
          // after submit, show comfirm notification to user
          success: function () {
            var $notification = $('span.message');
            $notification.html('<div id="message"></div>');
            $('#message').html('<label>Your request is on the way!</label>')
                .hide()
                .fadeIn(500, function () {
                  $('#message').append('<img id="checkmark" src="/images/ok.png" />');
                });
            $('section.new-tweet').fadeOut(800);
            loadTweets();
            $notification.trigger('reset');
          } 
        });
      }
    });
  });

  loadTweets();
  
  //when compose button has clicked, new tweet input form slides down
  const $newTweet = $('.new-tweet');
  $('.compose').on('click', () => {
    if($newTweet.is(':hidden')){
      $newTweet.slideDown(650, () => {
        $('textarea#tweetText').focus();
      });
    }
  });

  // in case of message has no return, cut string into certain amount of character
  function cutStr(str, idx, end){
    var result = '';
    for(var i = 0; i < end ; i+=idx){
      result += str.substr(i, idx)+'\n';
    }
    return result;
  }

  //create tweet format from data
  function createTweetElement(data){
    var $datePassed = calculateDate( data.created_at, Date.now());
    var $tweetText = cutStr(data.content.text, 30, 60) || '';
    var $tweet = $('<article>').addClass('tweet');
    var $header = $('<header>');
    var $avatar = $('<img>').addClass('avatar').attr('src', data.user.avatars.small);
    var $username = $('<h2>').addClass('username').text(data.user.name);
    var $handle = $('<p>').addClass('handle').text(data.user.handle);
    var $content = $('<div>').addClass('content');
    var $contentText = $('<span>').text($tweetText);
    var $footer = $('<footer>');
    var $createdDate = $('<p>').addClass('date').text($datePassed);
    var $icons = $('<span>').addClass('icons');
    var $flag = $('<i>').addClass('glyphicon glyphicon-flag');
    var $retweet = $('<i>').addClass('glyphicon glyphicon-retweet');
    var $like = $('<i>').addClass('glyphicon glyphicon-heart');

    $content.append($contentText);
    $header.append($avatar, $username, $handle);
    $icons.append($flag, $retweet, $like);
    $footer.append($createdDate, $icons);
    $tweet.append($header, $content, $footer);

    return $tweet;
  }

  function renderTweets(data){
    // $('section.tweets-container').empty();
    // $('section.tweets-container').append(data.map(createTweetElement));
    $('section.tweets-container').empty().append(data.map(createTweetElement));
  }

  //calcualte number of days from created date and now
  function calculateDate(first, second){
    var dt = new Date(first);
    var result = Math.round((new Date(second) - new Date(first))/(1000*60*60*24));
    if(result > 0){
      if(result == 1){
        return result + ' day ago';
      }
      return (result + ' days ago');
    }else{
      return ('created at ' + (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear());
    }
  }

  //get data from database and render tweets
  function loadTweets(){
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(renderTweets);
  }
});