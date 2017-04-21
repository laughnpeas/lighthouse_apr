jQuery(document).ready(function(){  

  const maxLen = 140;
  var counter = $('span.counter');

  function countCharacter(item){
    var curLen = item.val().length;
    var leftLen = maxLen - curLen;
    return leftLen;
  }

  var ta = $('.new-tweet textarea');
  ta.on('keyup', function(){

    var remainingCharacters = countCharacter($(this));
    counter.text(remainingCharacters);
    
    if(remainingCharacters < 0){
      counter.css( 'color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});
