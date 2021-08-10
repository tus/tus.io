---
layout: post
title: "Uploading files to Azure Storage using tusd"
author: acconut
redirect_from: /blog/2021/08/11/tusd-azure-storage/
published: false
---

Today we are excited to announce that [tusd](https://github.com/tus/tusd) is now also able to store uploaded files in the Azure Cloud Storage! Just like all tus servers, tusd's role is to accept incoming uploads from the tus clients and then relay them to the underlying storage providers. For a long time has tusd already supported storing uploads locally on disk, on AWS S3 and Google's Cloud Storage and thanks to an incredible contribution from [Ole-Martin Bratteng](https://github.com/omBratteng), this support has been expanded to also cover the Azure Cloud Storage!

TODO: Write a big about the internals of the azurestorage. Maybe some data structures, challenges or workarounds that were necessary. For the s3store, there were many outlined in the blogpost: https://github.com/tus/tus.io/blob/master/_posts/2016-03-07-tus-s3-backend.md
