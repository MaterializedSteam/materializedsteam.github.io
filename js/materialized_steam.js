$(function() {
        
      $( "#gameLookup" ).autocomplete({
        source: autocompleteNames,
        minLength: 3,
        select: function(event, ui) {
          $("#appID").val(ui.item.value);
        }
      });

      $("#appIDSearch").click(function(){
        $("#searchArea").slideToggle();
      });

      var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 300,
        height : 300
      });

      function checkFields()
      {
        var url = $('#giftURL').val();
        var appID = $("#appID").val();
        var gifteeEmail = $("#gifteeEmail").val();
      }

      $( "#submitbtn" ).click(function() {
        var url = $('#giftURL').val();
        var appID = $("#appID").val();
        var giftID = url.substring(47,63);
        var gifteeEmail = $("#gifteeEmail").val();
        var toQRify = "giftID="+giftID+"&appID="+appID+"&email="+gifteeEmail;

        console.log(toQRify);
        if(toQRify != "giftID=&appID=&email=")
        {
          console.log(toQRify);
          qrcode.makeCode(toQRify);

          $("#generating").fadeIn();

          $("#gameBannerContainer").empty().append('<img id="gameBanner" src="http://cdn.akamai.steamstatic.com/steam/apps/'+appID+'/header.jpg" >')

          $("#gameBanner").load(function(){
            $("#generating").hide();
            $("#giftcard").show();
            var w = window.open();
            var copyOfDiv = $("#giftcard").clone();
            $(w.document.body).html(copyOfDiv);
            w.print();
          });
        }
        else
        {
          toast("Uh oh seems like something is blank", 3000);
        }
      });



      $("#clearbtn").click(function(){
        $('#giftURL').val("");
        $("#appID").val("");
        $("#gifteeEmail").val("");
        $("#giftcard").hide();
        qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 300,
        height : 300
      });
      });

}); //end