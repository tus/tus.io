---
layout: default
title: Blog
permalink: /blog.html
---

# {{page.title}}

<div class="blog-posts">
 {% for post in site.posts %}
 {% assign author = site.data.authors[post.author] %}
 <div class="post" markdown="1">

## [{{ post.title }}]({{ post.url }})

<div class="post-info">
  Published on <span class="date">{{ post.date | date: "%B %e, %Y" }}</span> by
  <a class="author" href="http://twitter.com/{{author.twitter}}">
    {{ author.name }}
  </a>
</div>

<div class="post-content">
  {{ post.excerpt | strip_html | normalize_whitespace | truncate: 280 | escape }}
  
  <a href="{{ post.url }}">Read On &raquo;</a>
</div>

 </div>
 {% endfor %}
</div>

<hr />

<div class="post-subscribe">
  <p>
    Subscribe to, or say hello to our community: <br />
    {% include social.html rss=true %}
  </p>
</div>
