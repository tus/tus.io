---
layout: protocol
title: tus resumable upload protocol
comments: true
permalink: /protocols/resumable-upload.html
---

<!-- CSS based nested ToC numbering thanks to
     https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters -->

<style type="text/css">
  .kramdown-toc ul {
    counter-reset: section;
    list-style-type: none;
  }
  .kramdown-toc li::before {
    counter-increment: section;            
    content: counters(section,".") ". ";
  }
</style>

<div markdown="1" class="kramdown-toc">
  * This bullet will be replaced with the ToC
  {:toc}
</div>

<!-- Use `make build-protocol` to fetch latest protocol version -->

{% include tus.md %}
