$( () => {
  loadTweets();

  const $form = $('form[name="new-tweet"]');
  $form.on('submit', (event) => {
    event.preventDefault();
    const $tweetText = $form.serialize();
    $('form[name="new_tweet"]').validate({
      //validate with name of the field
      rules: {
        text: {
          required: true,
          maxLength: 200
        }
      },
      messages: {
        text: {
          required: 'Please provide your tweet text.',
          maxLength: 'Your text must be less than 200 characters.'
        }
      },
      submitHandler: (form) => {
        form.submit();
      }
    });
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $tweetText 
    }).then( ()=> {
      loadTweets();
    });
  });
  
  const $newTweet = $('.new-tweet');
  $('.compose').on('click', () => {
    if($newTweet.is(':hidden')){
      $newTweet.slideDown(650, () => {
        $('textarea#tweetText').focus();
      });
    }
  });

  function cutStr(str, idx, end){
    var result = '';
    for(var i = 0; i < end ; i+=idx){
      result += str.substr(i, idx)+'\n';
    }
    return result;
  }

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
    $('section.tweets-container').empty();
    $('section.tweets-container').append(data.map(createTweetElement));
  }

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

  function loadTweets(){
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(renderTweets);
  }
});