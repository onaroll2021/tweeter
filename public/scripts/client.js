$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const markup = `
      <div class="tweet-box">
        <header>
          <div id="usericon">
            <img src=${tweetData.user.avatars} alt="Avatar" class="avatar">
            <br>
          <h3 id="usernameatleft">
            ${tweetData.user.name}
          </h3>
          </div>
        <div id="tweetername">
          <h3>
            ${tweetData.user.handle}
          </h3>
        </div>
        </header>
          <p id="tweetcontent">
            ${escape(tweetData.content.text)}
          </p>
        <footer class="tweetfooter">
          <div class="timeago">
            ${timeago.format(tweetData.created_at)}
          </div>
          <div id="functionsplacedhere">
            <i class="fa-solid fa-flag icon"></i>
            <i class="fa-solid fa-retweet icon"></i>
            <i class="fa-solid fa-heart icon"></i>
          </div>
        </footer>
      </div>
      `;
  return markup;
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweettoinsert = createTweetElement(tweet);
      $('#tweets-container').prepend(tweettoinsert);
    };
    return "mission complete";
  }

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: "GET",
    })
    .then((tweets) => {
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  loadTweets();

  const $form = $("#tweet-submission");
  $form.on('submit', (e) => {
    e.preventDefault();
    if ($('#tweet-text').val() === '' || null) {
      $(".error").text("Oops!, you have to write something!!");
      $(".error").slideDown("slow").delay(1500).slideUp("slow");
    } else if ($('#tweet-text').val().length > 140) {
      $(".error").text("Oops! your tweet must be 140 characters maximum");
      $(".error").slideDown("slow").delay(1500).slideUp("slow");
    } else {
      const dataSentToServer = $form.serialize();
      $.ajax({
        method: "POST",
        url: '/tweets',
        data: dataSentToServer,
      })
      .then(() => {
        loadTweets();
      });
    };
  });
})
