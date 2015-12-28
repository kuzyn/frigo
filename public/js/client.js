// Scripts for the client page
(function() {
  $(document).on('ready', function() {
    var   API_URL = 'http://localhost:4000/api/',
          API_PORT = null;

    getItemsList();


    // Handlers
    $('#new-message').submit(function(event){
      event.preventDefault();
      var $form = $(this);
      var url = $form.attr('action');
      var payload = {
        message: $form.find('input[name="form-message"]').val(),
        meta: {
          keyword: $form.find('input[name="form-keyword"]').val(),
          location: 'unknown'
        }
      };

       $.get('http://freegeoip.net/json/', function(){})
      .done(function(data) {
        payload.meta.location = data.country_name.toLowerCase();
      })
      .fail(function(error) {
        console.log(error);
      })
      .always(function(){
        postMessage(url, payload);
      });


    });

    // Helpers

    function postMessage(_url, _payload) {
      $.post(_url, _payload)
      .done(function(data) {
        console.log("done :)");
        getItemsList();
      })
      .fail(function(data) {
        console.log('fail!', data);
      });
    }

    function getItemsList() {
      var $messageListContainer = $('#message-list').find('.container ul');
      var $loaderContainer = $('#message-list').find('.container .loader');
      var messagesXhr = $.get( API_URL + 'messages', function() {
        $messageListContainer.html('');
      })
      .done(function(data) {
        data = data.reverse();
        $loaderContainer.fadeOut();
        $.each(data, function(index, item) {
          var messageObject = item;
          $messageListContainer.append('<li><span>' + item.message + '</span><span>' + item.meta.keyword + '</span><span>' + item.meta.location + '</span>' + '</li>');
        });
      })
      .fail(function(data) {
        $loaderContainer.fadeOut();
        $messageListContainer.append('<li><span>' + JSON.stringify(data) + '</span></li>');
      })
      .always(function() {
      });
    }
  });
})();
