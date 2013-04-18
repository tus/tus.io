---
layout: default
title: Resumable File Uploads
---

<div class="jumbotron">
  <h1>{{ page.title }}</h1>
  <p class="lead">
    Mobile networks are unstable, file sizes are getting bigger, and platform
    APIs are a mess. As a result millions of cat videos are lost in the <a
    href="http://www.youtube.com/watch?v=_cZC67wXUTs">tubes</a>
    every year.  This needs to be made much simpler.
  </p>

  <p class="lead">
    tus is an open source project for creating the first <a
    href="/protocols/resumable-upload.html">open protocol for resumable file
    uploading</a>, as well as client and server implementations. We won't stop
    until every web site and mobile app has reliable uploading.
  </p>
</div>

<hr />

<iframe
  allowtransparency="true"
  frameborder="0"
  scrolling="no"
  class="twitter-follow-btn"
  src="//platform.twitter.com/widgets/follow_button.html?screen_name=tus_io"
  style="width:300px; height:20px;"></iframe>

## Blog

<ol id="posts">
  {% for post in site.posts %}
  {% assign author = site.authors[post.author] %}
  <li>
    <img src="https://secure.gravatar.com/avatar/{{author.gravatar}}&s=64" class="gravatar">
    <span class="timeago" title="{{ post.date | date: "%Y-%m-%dT%H:%M:%SZ" }}">{{ post.date | date: "%B %e, %Y" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
    by

    <a target="_blank" href="http://twitter.com/{{author.twitter}}">{{ author.name }}</a>
  </li>
  {% endfor %}
</ol>

<hr />

## On the Githubs

<ol id="githubs"><li>Loading...</li></ol>

<hr />

<div class="jumbotron">
  <div class="input-append control-group">
    <form action="http://transloadit.us1.list-manage1.com/subscribe/post?u=98e560c614f2baaf47237f500&amp;id=37aafbe5c1" method="post">
      <input name="EMAIL" class="input-xlarge" type="email" placeholder="Your e-mail address"/>
      <input name="SOURCE" type="hidden" value="tus.io"/>
      <button class="btn btn-success">Keep me posted</button>
    </form>
  </div>
  <p>
  Leave your e-mail to receive infrequent e-mails about major releases and
  announcements.
  </p>
</div>
