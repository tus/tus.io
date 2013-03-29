---
layout: default
title: FAQ
---

## {{ page.title }}

Got a question that is not answered here? Ask it
[on Github](https://github.com/tus/tus.io/issues/new?labels=question).

### Why not upload to Amazon S3 directly?

Amazon S3 has several limitations that we consider problematic:

* Under poor network conditions (e.g. mobile), the minimum chunk size for 
  multipart uploads is too large (5 MB). Cellphones switching mobile towers keep getting cut off.
* Under high bandwidth conditions, the throughput to S3 is low, resulting in unnecessary long wait times. 
* S3 is a proprietary service. Having an open, vendor agnostic API allows
  you to treat storage as an implementation detail.
* There is a lack of uniform HTML5, iOS and Android clients that can be easily used
  to add reliable file uploading to any application.
* While there is some support, S3 was not designed to be used in a browser
  environment.

S3 is an incredible offering, but we feel that it leaves much to be desired
when it comes to offering the best file uploading experience to your users. We
can build something much better.

### When will this be ready?

For now we are aiming to create a minimal viable solution for resumable file
uploading.  This, together with an HTML5 client should be ready in a few weeks,
and useful enough for small production deployments.

However, we have big plans, so we will continue to push out more features. Our
next big mile stone will be good native clients for iOS / Android.

### Why are you doing this?

We hate unreliable, slow and confusing upload experiences, so we want to make
them a thing of the past.

If things go well, we also hope to make some money with this in a few years
by offering hosting and support contracts.

### What license will you use?

Good question! We are currently making this decision, and will clarify this very soon.
