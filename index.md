---
layout: default
title: Handling Uploads Sucks
---

<div class="jumbotron">
  <h1>{{ page.title }}</h1>
  <p class="lead">
    Adding reliable file uploading to your app is fucking hard. Mobile
    networks are unstable, devices and browser APIs are all over
    the place, and there is no resumable upload protocol with client and server
    implementations.
  </p>

  <p class="lead">
    tus is an open source project for
    creating an
    <a href="/protocols/resumable-upload.html">open protocol</a>, as well as
    client and server implementations for resumable file uploading.
  </p>
</div>

<hr />

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
      <input name="email" class="input-xlarge" type="email" placeholder="your email"/>
      <input name="source" type="hidden" value="tus.io"/>
      <button class="btn btn-success">keep me posted</button>
    </form>
  </div>

  <p>
  Leave your e-mail to receive infrequent e-mails about major releases and
  announcements.
  </p>
</div>
