---
layout: default
title: Handling Uploads Sucks
---

<div class="jumbotron">
  <h1>{{ page.title }}</h1>
  <p class="lead">
    Making a good file uploader for your app is fucking hard. Mobile
    networks are unreliable, devices and browser APIs are all over
    the place, and there is no resumable upload protocol with client and server
    implementations.
  </p>

  <p class="lead">
    tus is an <a href="http://github.com/tus">open source project</a> for
    creating an <a href="#">open protocol</a>, as well as <a
    href="#">client</a> and <a href="#">server</a> implementations for
    resumable file uploading.
  </p>
</div>

<hr />

## Posts

<ol id="posts">
  {% for post in site.posts %}
  <li>
    <span class="timeago" title="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %e, %Y" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ol>

<hr />

## On the Githubs

<ol id="githubs"></ol>

