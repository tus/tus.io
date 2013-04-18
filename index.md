---
layout: default
title: Resumable File Uploads
---

<div class="jumbotron">
  <h1>{{ page.title }}</h1>
  <p class="lead">
    Users want to share more and more photos and videos. But mobile networks
    are fragile. Platform APIs are a mess. Every project builds its own file
    uploader. A thousand one week projects that barely work, when all we need
    is one real project, done right.
  </p>

  <p class="lead">
    We are going to do this right. We will solve reliable file uploads for once
    and for all. A new open
    <a href="/protocols/resumable-upload.html">protocol for resumable uploads</a>
    (tus) built on HTTP. Simple, cheap, reusable stacks for clients and servers.
    Any language, any platform, any network.
  </p>

  <p class="lead">
    It's probably an impossible dream. No-one has managed yet.
    But we're going to give it our best shot.
    <a target="" href="https://github.com/tus">Join us on GitHub</a> and
    help us make the world a better place. No more lost cat videos!
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

## On the GitHubs

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
