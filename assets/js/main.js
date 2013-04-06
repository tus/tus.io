$(function() {
  $.timeago.settings = {
    strings: {
      prefixAgo: null,
      prefixFromNow: null,
      suffixAgo: "ago",
      suffixFromNow: "from now",
      seconds: "~1 min",
      minute: "~1 min",
      minutes: "%d min",
      hour: "%dh",
      hours: "%dh",
      day: "a day",
      days: "%d days",
      month: "about a month",
      months: "%d months",
      year: "about a year",
      years: "%d years",
      wordSeparator: " ",
      numbers: []
    }
  };

  loadGithubs().done(function(data) {
    var $githubs = $('#githubs');
    for (var i = 0; i < data.data.length; i++) {
      var item = data.data[i];
      var $li = $('<li/>').appendTo($githubs);
      $('<img/>').addClass('gravatar').attr('src', item.actor.avatar_url+'&s=64').appendTo($li);
      $('<span/>').text(' ').appendTo($li);
      $('<a/>').attr('href', item.actor.url).text(item.actor.login).appendTo($li);

      switch (item.type) {
        case 'IssueCommentEvent':
          $('<span/>').text(' commented on ').appendTo($li);
          $('<a/>').attr('href', item.payload.comment.url).text(item.payload.issue.title).appendTo($li);
          $('<span/>').text(' in ').appendTo($li);
          $('<a/>').attr('href', item.repo.url).text(item.repo.name).appendTo($li);
          break;
        case 'PushEvent':
          $('<span/>').text(' pushed ' + item.payload.commits.length + ' commits to ').appendTo($li);
          $('<a/>').attr('href', item.repo.url).text(item.repo.name).appendTo($li);
          break;
        case 'CreateEvent':
          // @TODO: Not tested for ref_type != 'branch'
          $('<span/>').text(' created a new ' + item.payload.ref_type).appendTo($li);
          $('<span/>').text(' in ').appendTo($li);
          $('<a/>').attr('href', item.repo.url).text(item.repo.name).appendTo($li);
          $('<span/>').text(': ').appendTo($li);
          $('<span/>').text(item.payload.ref).appendTo($li);
        default:
          console.log(item.type, item);
          break;
      }
      $('<span/>').text(item.created_at).attr('title', item.created_at).addClass('timeago').appendTo($li);
    }
    $('<span/>').text(' — ').appendTo($li);
    $('span.timeago').timeago();
  });


  function loadGithubs() {
    var d = $.Deferred();

    var githubs = localStorage.getItem('githubs');
    try {
      githubs = JSON.parse(githubs);
    } catch (err) {
    }

    if (githubs) {
      d.resolve(githubs);
      return d;
    }

    $.getJSON('https://api.github.com/orgs/tus/events?per_page=100&callback=?', function(data, textStatus, jqXHR) {
      localStorage.setItem('githubs', JSON.stringify(data));
      d.resolve(data)
    });
    return d;
  }
});
