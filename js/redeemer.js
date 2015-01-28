   $(document).ready(function(){

      function hasGetUserMedia() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia);
      }
      
      $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});

      $('.modal-trigger').leanModal({
        dismissable: false
      });

      $("#clear_cam_denied").click(function() {
        $("#cam_denied").fadeOut();
      });

      var bool = 0;
      $('#reader').html5_qrcode(
        function(data)
        {
          if(bool == 0)
          {
            console.log("Data:");
            console.log(data);
            var tmp = data;
            var array = tmp.split('&');
            var appid = array[1].split('=')[1];
            var email = array[2].split('=')[1];
            console.log("array");
            console.log(array);
            var steamurl = "https://store.steampowered.com/account/ackgift/"+array[0].split('=')[1]+"?client=1&redeemer="+email;
            var imgUrl = "http://cdn.steampowered.com/v/gfx/apps/"+appid+"/header.jpg";


            $('#redeemBtn').click(function(){
              if($("#verifiedAcc").is(':checked'))
              {
                // window.location.href = steamurl;
              }
              else
              {
                toast("Whoops! Please verify you're logged into the right Steam account", 4000);
              }
            })

            $("#success_modal").openModal();
            $('#giftImg').html("<img src='"+imgUrl+"'></img>")
            bool = 1;
          }
        },

        function(error){
          console.log("ERROR:");
          console.log(error);
        }, 

        function(videoError){
          console.log("VIDEO ERROR:");
          console.log(videoError);
          $("#cam_denied").fadeIn();
        }
      );
    });