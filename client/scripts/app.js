// YOUR CODE HERE:

var app = {

  init: function() {

    $('#chats').on('click', '.username', function(event) {
      event.preventDefault();
      var name = this.innerHTML;
      if (!_.contains(app.friendsList, name)) {
        app.friendsList.push(name);
      }
    });

    $('#updateusername').on('click', function(event) {
      event.preventDefault();
      window.currentusername = $('#newusername').val();
      $('#newusername').val('');
    });

    $('#updatemessage').on('click', function(event) {
      event.preventDefault();
      app.addMessage($('#newmessage').val());
      $('#newmessage').val('');
    });

    $('#updateRoom').on('click', function(event) {
      event.preventDefault();
      app.addRoom($('#newRoom').val());
      $('#newRoom').val('');
    });



    setInterval(this.fetch.bind(this), 2000);

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
          

          if (app.rooms.indexOf(item.roomname) === -1) {
            app.rooms.push(item.roomname);
          }

          var cleanText = sanitizeHtml(item.text);
          var cleanUser = sanitizeHtml(item.username);          
          var cleanRoomname = sanitizeHtml(item.roomname);          
          var $newMessageUser = $('<h3 class="username">' + cleanUser + '</h3>');
          
          if (_.contains(app.friendsList, cleanUser)) {
            var $newMessageText = $('<p><b>' + cleanText + '</b></p>');            
          } else {
            var $newMessageText = $('<p>' + cleanText + '</p>');                        
          } 

          var $newRoomName = $('<p>' + cleanRoomname + '</p>');
          var $entireMessage = $('<div></div>');

          if (item.roomname === $('#roomList').val()) {
            $entireMessage.append($newMessageUser, $newMessageText, $newRoomName);
            $('#chats').append($entireMessage);
          }

        });


        var roomListArray = _.map($('#roomList').children(), function(item) {
          return item.value;
        });

        for (var i = 0; i < app.rooms.length; i++) {
          if (!_.contains(roomListArray, app.rooms[i]) && app.rooms[i] !== null && app.rooms[i] !== undefined) {
            $('#roomList').append($('<option value="' + app.rooms[i] + '">' + app.rooms[i] + '</option>'));
          }
        }
      },

      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      },
    });
  },  

  addMessage: function(message) {
    
    var messageObj = {
      username: window.currentusername || 'Anon Panda',
      text: message,
      roomname: 'TBD'
    };

    this.send(messageObj);   
    this.fetch();

  },

  addRoom: function(newRoom) {
      
    var newRoomObj = {
      roomname: newRoom
    };


    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(newRoomObj),
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



  addFriend: function() {
    console.log(this);
  },

  server: 'https://api.parse.com/1/classes/messages',
  rooms: [],
  friendsList: []

};

$(document).ready(function() {
  app.init();
});



