---
layout: default
title: Resumable File Uploads
container: "none"
---

<div class="intro">
  <div class="container">
    <img class="banner" src="/assets/img/tus1.png" alt="Tus - Resumable File Uploads" />
  </div>

  <div class="mission">
    <div class="container">
      <p>
        Users want to share more and more photos and videos. But mobile networks
        are fragile. Platform APIs are a mess. Every project builds its own file
        uploader. A thousand one week projects that barely work, when all we need
        is one real project, done right.
      </p>

      <p>
        We are going to do this right. We will solve reliable file uploads for once
        and for all. A new open
        <a href="/protocols/resumable-upload.html">protocol for resumable uploads</a>
        built on HTTP. Simple, cheap, reusable stacks for clients and servers.
        Any language, any platform, any network.
      </p>

      <p>
        It's probably an impossible dream. No-one has managed yet.
        But we're going to give it our best shot.
        <a target="" href="https://github.com/tus">Join us on GitHub</a> and
        help us make the world a better place. No more lost cat videos!
      </p>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    {% for feat in site.features %}
    {% if forloop.index0 == 3 %}
  </div>
  <div class="row">
    {% endif %}
    <section class="four columns feature">
      <h5>{{feat.title}}</h5>
      <div>{{feat.content | markdownify }}</div>
    </section>
    {% endfor %}
  </div>
</div>

<div class="container">
  <h2>Official implementations</h2>

  <div class="row">
    <div class="one column"></div>

    {% for impl in site.implementations %}
    <div class="two columns implementation">
      <a href="https://github.com/tus/{{impl.name}}">
        <img src="/assets/img/{{impl.icon}}.svg" alt="Icon" />

        {{impl.name}}
      </a>
    </div>
    {% endfor %}
  </div>

  <p class="implementations-link">
    Additionally, there are many <a href="/implementations.html">projects</a> built
    and maintained by our community.
  </p>
</div>

<div class="container">
  <h2>Recent blog posts</h2>

  <ol class="posts">
    {% for post in site.posts %}
    {% assign author = site.authors[post.author] %}
    <li>
      <div class="author">
        <a href="http://twitter.com/{{author.twitter}}" title="{{ author.name }}">
          <img
            src="https://secure.gravatar.com/avatar/{{author.gravatar}}&s=64"
            class="gravatar"
            alt="{{ author.name }}">
        </a>
      </div>

      <div class="post-title">
        <div class="date">
          {{ post.date | date: "%b %e, %Y" }}
        </div>

        <h3>
          <a href="{{ post.url }}">{{ post.title }}</a>
        </h3>
      </div>
    </li>
    {% endfor %}
  </ol>

  <div class="on-the-githubs-container">
    <h2>On the GitHubs</h2>

    <div class="on-the-githubs" data-event-source="orgs/tus">
      Loading...
    </div>
  </div>
</div>

<div class="subscription-form">
  <div class="container">
    <div class="row">
      <div class="twelve columns">
        <h3>Get latest news and updates!</h3>
      </div>
    </div>

    <div class="row">
      <div class="six columns">
        <p>
          Leave your e-mail to receive infrequent e-mails about
          major releases and announcements.
        </p>
      </div>

      <div class="six columns">
        <form action="http://transloadit.us1.list-manage1.com/subscribe/post?u=98e560c614f2baaf47237f500&amp;id=37aafbe5c1" method="post">
          <input name="EMAIL" type="email" placeholder="Your e-mail address..."/>
          <input name="SOURCE" type="hidden" value="tus.io"/>
          <button class="button-primary">Subscribe!</button>
        </form>
      </div>
    </div>
  </div>
</div>
