---
layout: default
title: Blog
---

{% for post in site.posts %}

{% assign author = site.authors[post.author] %}

## [{{ post.title }}]({{ post.url }})

<span>Published: {{ post.date | date: "%B %e, %Y" }}</span>.
<span>Author: [{{ author.name }}](https://twitter.com/{{ author.twitter }})</span>

{{ post.content }}

{% endfor %}

---------------------------------------

Subscribe to this blog via [RSS]({{ site.rss_feed }}).
