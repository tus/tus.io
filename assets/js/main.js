$(function() {
  var $githubs = $('#githubs');
  $.getJSON('https://api.github.com/orgs/tus/events?callback=?', function(data, textStatus, jqXHR) {
    for (var i = 0; i < data.data.length; i++) {
      var item = data.data[i];
      var $li = $('<li/>').appendTo($githubs);
      $('<img width="32"/>').attr('src', item.actor.avatar_url+'&s=64').appendTo($li);
      $('<a/>').attr('href', item.actor.url).text(item.actor.login).appendTo($li);
      
      switch (item.type) {
        case 'IssueCommentEvent':
          console.log(item);
          $('<span/>').text('commented on ').appendTo($li);
          $('<a/>').attr('href', item.payload.comment.url).text(item.payload.issue.title).appendTo($li);
          $('<span/>').text('in').appendTo($li);
          console.log(item);
          $('<a/>').attr('href', item.repo.url).text(item.repo.name).appendTo($li);
          break;
      }
    }
  })
});
