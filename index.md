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
    <a target="_blank" href="https://github.com/tus/tus-resumable-upload-protocol/blob/master/README.md">open protocol</a>, as well as
    client and server implementations for resumable file uploading.
  </p>
</div>

<hr />

## Posts

<ol id="posts">
  {% for post in site.posts %}
  <li>
    <span class="timeago" title="{{ post.date | date: "%Y-%m-%dT%H:%M:%SZ" }}">{{ post.date | date: "%B %e, %Y" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ol>

<hr />

## On the Githubs

<ol id="githubs"></ol>

