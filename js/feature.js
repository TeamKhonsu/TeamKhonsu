///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
$(document).ready(function() {
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
  var twitchUserName = ['MewtwoRaves','DarkAcreJack','sideshowmatt','blackdynamitetv','johanmoney','sblindside','vvarrentv',"thenutzxd",'michiganspartan','ritterriffic'];

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

  //Iterate through the array of usernames and call getTwitch
  twitchUserName.forEach(function(name) {
    getTwitch(name)
  });
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
});

//GET TWITCH API INFO
  function getTwitch(twitchUserName){
    $.ajax({
      type:"GET",
      url:"https://api.twitch.tv/kraken/streams/" + twitchUserName,
      headers:{
        'Client-ID': 'dhtxhmg8vey6qz5y964c3u15vmcssa'
      },
      success: function twitchData(data) {
        // Call 'streams' and if the channel is active, get stream data
        if(data.stream !== null){

          var streamImage = data.stream.preview.large;
          var streamGame = data.stream.game;
          var streamInfo = data.stream.channel.status;
          var streamLogo = data.stream.channel.logo;
          var streamURL = 'http://www.twitch.tv/'+ twitchUserName;
          var defaultImage = 'https://media.giphy.com/media/26FKZH3iV19wR7uYE/source.gif';
          var streamCard=" ";

          //IF EVERYTHING IS A SUCCESS IT BUILDS A STREAMCARD//
            if (streamLogo !== null){
              streamCard = "<div class='online overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-success status-bar'>ONLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + streamLogo + "' alt='" + twitchUserName + "logo'>" + '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'><strong>" + streamGame.toUpperCase() + ": </strong>" + streamInfo.toUpperCase() + "</p></a></div></div></div></div>";
              $(".card-container").append(streamCard);
            }else{
              streamCard = "<div class='online overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-success status-bar'>ONLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultImage + "' alt='" + twitchUserName + "logo'>" + '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'><strong>" + streamGame.toUpperCase() + ": </strong>" + streamInfo.toUpperCase() + "</p></a></div></div></div></div>";
              $(".card-container").append(streamCard);
            }
       } else {
          // If the channel is offline, get channel data
          $.ajax({
            type:"GET",
            url:"https://api.twitch.tv/kraken/channels/" + twitchUserName,
            headers:{
              'Client-ID': 'dhtxhmg8vey6qz5y964c3u15vmcssa'
            },
            success: function(data){
              var streamBanner = data.video_banner;
              var streamLogo = data.logo;
              var streamError = data.status;
              var streamURL = 'http://www.twitch.tv/'+ twitchUserName;
              var streamCard = " ";

              //IF THERE IS NO CHANNEL INFO
              if (streamError == 404 || streamBanner == null || streamLogo == null){
                $.ajax({
                  type:"GET",
                  url:"https://api.twitch.tv/kraken/users/" + twitchUserName,
                  headers:{
                    'Client-ID': 'dhtxhmg8vey6qz5y964c3u15vmcssa'
                  },
                  success: function(data){
                    var streamMessage = data.error;
                    // var streamBanner = data.video_banner;
                    var defaultImage = "https://media.giphy.com/media/EZJIg5PUjdDKU/giphy.gif";
                    var defaultThumb = "https://media.giphy.com/media/l3q31122uBsO7hpmw/source.gif";
                    //IF ACCOUNT HAS BEEN CLOSED BUILD STREAMCARD
                    if(streamMessage == "Unprocessable Entity"){
                      streamCard = "<div class='offline overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>" + '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'>This Twitch account has been closed.</p></div></div></div></a></div>";
                      $(".card-container").append(streamCard);
		                } else if (streamMessage == "Not Found"){
                        //IF IT NEVER EXISTED
                        streamCard = "<div class='offline overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'>This Twitch account never existed.</p></div></div></div></a></div>";
                        $(".card-container").append(streamCard);
                    }else if (streamBanner == null && streamLogo == null){
                        //IF Banner AND  Logo don't Work
                        streamCard = "<div class=' offline overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'>Not currently streaming.</p></div></div></div></a></div>";
                        $(".card-container").append(streamCard);
                    }
                    else if (streamBanner == null){
                        //IF Banner Doesn't Exist
                        streamCard = "<div class='offline overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + defaultThumb + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'>Not currently streaming.</p></div></div></div></a></div>";
                        $(".card-container").append(streamCard);
                    }
                  }
                })
              } else { // If account exists, but user is not currently streaming, build streamCard

                streamCard = "<div class='offline overlay'>" + "<a target='myiframe' href='https://player.twitch.tv/?channel="+twitchUserName+"'><div class='card cardList cardFeature'><span class='tag tag-default status-bar'>OFFLINE</span>" + "<div class='card-block'>" + "<img class='round-logo img-responsive logo' src='" + streamLogo + "' alt='" + twitchUserName + "logo'>"+ '<br>' + "<div class='text-padding'>" + "<p class='card-title'>" + twitchUserName.toUpperCase() + "</p><p class='card-text'>Not currently streaming.</p></div></div></div></a></div>";
                $(".card-container").append(streamCard);
              }
            }
          })
        }
      }
    })
  }
