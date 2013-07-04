$(function() {
  var makeCommunityType = function (types, listed, cb) {
    // Not in parallel otherwise the listed check does not work reliably
    var type = types.shift();
    if (!type) {
      return;
    }

    var $communities = $('div.community[data-contains*="' + type + '"]');

    var template = '<a target="_blank" rel="tooltip" data-placement="bottom" title="${username}" href="${userUrl}" class="author">';
    template += '<img src="${gravatarSrc}" class="gravatar" />';
    template += '</a>';

    $.getJSON('/assets/json/combined-tus-' + type +'.json', function(data, textStatus, jqXHR) {
      var user  = {};
      var entry = {};
      var count = 0;

      for (var key in data) {
        user = data[key].user || data[key];
        if (!user.login) {
          continue;
        }
        if (listed[user.login]) {
          continue;
        }

        count++;
        listed[user.login] = true;

        entry = $.tmpl(template, {
          gravatarSrc: user.avatar_url + '&s=64',
          userUrl: user.html_url,
          username: user.login
        });

        entry.appendTo($communities.find('div'));
      }

      $communities.each(function() {
        var $span = $(this).find('h3 span');
        var newCount = parseInt($span.text(), 10) + count;
        $span.text(newCount);
      });

      if (types.length > 0) {
        makeCommunityType(types, listed, cb);
      } else {
        cb();
      }
    });
  };

  var makeCommunities = function () {
    var allTypes = [];
    $('div.community').each(function () {
      allTypes = allTypes.concat($(this).data('contains').split(', '));
    });

    makeCommunityType(allTypes, {}, function () {
      $('a[rel]').tooltip();
    });
  };

  makeCommunities();
});
