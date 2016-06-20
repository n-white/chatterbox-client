// YOUR CODE HERE:

var app = {

  init: function() {
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

  fetch: function(success) {
    $.ajax({
      url: this.server,
      type: 'GET',
      dataType: 'json',
      success: success,
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      },
    });
  },

  clearMessages: function() {

    _.each($('#chats').children(), function(item) {
      item.remove();
    });

  },

  addMessage: function(message) {
    
    var messageObj = {
      username: window.newName,
      text: message,
      roomname: 'TBD'
    };

    this.send(messageObj);
    this.clearMessages();
    
    this.fetch(function(data) {
      _.each(data.results, function(item) {
        var clean = sanitizeHtml(item.text);
        $('#chats').prepend(clean);
      });
    });
  },

  server: 'https://api.parse.com/1/classes/messages'

};


