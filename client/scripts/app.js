// YOUR CODE HERE:

var app = {

  init: function() {

    $('#chats').on('click', '.username', function(event) {

    });


    setInterval(this.fetch.bind(this), 1000);


    return;
  },

  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {

    _.each($('#chats').children(), function(item) {
      item.remove();
    });

  },

  fetch: function(success) {
    $.ajax({
      url: this.server,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        app.clearMessages();

        _.each(data.results, function(item) {
          var clean = sanitizeHtml(item.text);          
          var $newMessageUser = $('<h3 class="username" onclick="app.addFriend()">' + item.username + '</h3>');
          var $newMessageText = $('<p>' + clean + '</p>');
          var $entireMessage = $('<div></div>');

          $entireMessage.append($newMessageUser, $newMessageText);
          $('#chats').append($entireMessage);

        });
        console.log('so fetching!');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      },
    });
  },  

  addMessage: function(message) {
    
    var messageObj = {
      username: 'Static Names be Static',
      text: message,
      roomname: 'TBD'
    };
    //console.log(window.newName);

    this.send(messageObj);   
    this.fetch();

  },

  addRoom: function(newRoom) {
    $('#roomSelect').prepend('<a>' + newRoom + '</div>');    
  },

  addFriend: function() {
    console.log(this);
  },

  server: 'https://api.parse.com/1/classes/messages'

};

app.init();


