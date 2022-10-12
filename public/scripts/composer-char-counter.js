$(document).ready(function() {
  $('#tweet-text').on('keyup', function(e) {
    const charCount = $(this).val().length;
    const remainingChas = 140 - charCount;
    const counterElem = $(this).parent().children('.tweet-underline').children('.counter');
    counterElem.text(remainingChas);// = remainingChas;
    if (remainingChas < 0) {
      counterElem.css('color', 'mediumvioletred');
    } else {
      counterElem.css('color', '#545149');
    }
  })
})