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
    tus is an open source project for
    creating an <strong>open protocol</strong>, as well as <strong>client</strong> and <strong>server</strong> implementations for
    resumable file uploading.
  </p>
</div>

<hr />

## Source

The tus project is split into several repositories:

* [tusd](https://github.com/tus/tusd) - A dedicated upload server written in Go.
* [tus-html5-client](https://github.com/tus/tus-html5-client) - The client for HTML apps.
* [tus-ios-client](https://github.com/tus/tus-ios-client) - The client for iOS apps.
* [tus-android-client](https://github.com/tus/tus-android-client) - The client for Android apps.
* [tus.io](https://github.com/tus/tus.io) - The tus.io website itself.

At first, we will focus on the tusd server and the HTML5 client in order to nail
the protocol and basic feature set. However, the iOS and Android clients will
follow quickly and be treated as first class citizens.


<hr />

## Posts

<ol id="posts">
  {% for post in site.posts %}
  <li>
    <span class="timeago" title="{{ post.date | date "%Y-%m-%dT%H:%M:%SZ" }}">{{ post.date | date: "%B %e, %Y" }}</span>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ol>

<hr />

## On the Githubs

<ol id="githubs"></ol>

