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

    var template = '<span class="timeago" title="${created}">${created}</span>';
    template += '<img src="${gravatarSrc}" class="gravatar" />';
    template += '<p><a href="${userUrl}" class="author">${username}</a> ';
    template += '<span>{{html action}}</span>';
    template += ' <a href="${repoUrl}">${repoName}</a>${branch}{{html commits}}</p>';
    template += '<div class="clearfix"></div>';

    for (var i = 0; i < data.data.length; i++) {
      var item = data.data[i];

      var userUrl     = item.actor.url.replace('//api.', '//').replace('/users/', '/');
      var repoUrl     = item.repo.url.replace('//api.', '//').replace('/repos/', '/');
      var gravatarSrc = item.actor.avatar_url + '&s=64';
      var username    = item.actor.login;
      var action      = '';
      var branch      = '';
      var commits     = '';

      // http://developer.github.com/v3/activity/events/types/
      switch (item.type) {
        case 'IssuesEvent':
          // console.log(item);
          var closed = item.payload.issue.state === 'closed';
          action  = item.payload.action + ' ';
          action += 'issue <a href="' + item.payload.issue.html_url + '">';

          if (closed) {
            action += '<s>';
          }
          action += item.payload.issue.title;
          if (closed) {
            action += '</s>';
          }

          action += '</a> on';
          break;
        case 'CommitCommentEvent':
          action  = 'commented "' + item.payload.comment.body + '" ';
          action += 'on a commit to <a href="' + item.payload.comment.html_url + '">';
          action += item.payload.comment.path + '</a> in';
          break;
        case 'IssueCommentEvent':
          action  = 'commented on <a href="' + item.payload.comment.html_url + '">';
          action += item.payload.issue.title + '</a> in';
          break;
        case 'PushEvent':
          var commitString = item.payload.commits.length === 1 ? 'commit' : 'commits';
          action = 'pushed ' + item.payload.commits.length + ' ' + commitString + ' to';

          // commits = '<ul class="commits">';
          // for (var j in item.payload.commits) {
          //   var commit = item.payload.commits[j];

          //   var sha = commit.sha.substr(0, 7);
          //   var msg = commit.message.substr(0, 50);
          //   if (msg.length !== commit.message.length) {
          //     msg += ' ...';
          //   }

          //   commits += '<li>';
          //   commits += '<a href="' + makeCommitUrl(commit.url) + '">' + sha + '</a>';
          //   commits += ' ' + msg;
          //   commits += '</li>';
          // }

          commits += '</ul>';
          break;
        case 'WatchEvent':
          action = 'is now watching';
          break;
        case 'CreateEvent':
          // @TODO: Not tested for ref_type != 'branch'
          action = 'created a new ' + item.payload.ref_type + ' in';
          branch = ': ' + item.payload.ref;
          break;
        default:
          console.log(item.type, item);
          break;
      }

      var entry = $.tmpl(template,
        {
          gravatarSrc: gravatarSrc,
          userUrl: userUrl,
          username: username,
          repoUrl: repoUrl,
          repoName: item.repo.name,
          branch: branch,
          created: item.created_at,
          action: action,
          commits: commits
        }
      );
      $('<li/>').append(entry).appendTo($githubs);
    }

    $('span.timeago').timeago();
  });


  function loadGithubs() {
    var d = $.Deferred();

    var githubs = localStorage.getItem('githubs');
    var time = localStorage.getItem('githubs_date');
    try {
      githubs = JSON.parse(githubs);
    } catch (err) {
    }

    var now = +new Date() / 1000;
    if (githubs && time && now - time < 3 * 60) {
      d.resolve(githubs);
      return d;
    }

    var url = 'https://api.github.com/orgs/tus/events?per_page=20&callback=?';
    $.getJSON(url, function(data, textStatus, jqXHR) {
      // github does not support the per_page parameter for events
      data.data = data.data.slice(0, 20);

      localStorage.setItem('githubs', JSON.stringify(data));
      localStorage.setItem('githubs_date', now);
      d.resolve(data);
    });
    return d;
  }

  function makeCommitUrl(url) {
    var result = url;
    result = result.replace(/repos\//, '');
    result = result.replace(/api\./, '');
    result = result.replace(/commits\//, 'commit/');
    return result;
  }
});
