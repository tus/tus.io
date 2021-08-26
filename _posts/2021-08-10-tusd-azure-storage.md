---
layout: post
title: "Uploading files to Azure Storage using tusd"
author: acconut
redirect_from: /blog/2021/08/11/tusd-azure-storage/
published: false
---

Today we are excited to announce that [tusd](https://github.com/tus/tusd) is now also able to store uploaded files in the Azure Cloud Storage! Just like all tus servers, tusd's role is to accept incoming uploads from the tus clients and then relay them to the underlying storage providers. For a long time has tusd already supported storing uploads locally on disk, on AWS S3 and Google's Cloud Storage and thanks to an incredible contribution from [Ole-Martin Bratteng](https://github.com/omBratteng), this support has been expanded to also cover the Azure Cloud Storage!

## On the backend

The Azure Blob Storage implementation is only supporting the Block Blob, this was a concious choice to make the implementation easier to use, and is the most fitting blob type for tusd. The current service version supported is `2019-12-12`, which allows files up to 190.7 TiB in size (4000 MiB x 50,000 blocks).

Upon starting tusd with Azure Blob Storage as the selected storage endpoint, it will atempt to connect to a container (also known as a Bucket in S3), if it does not exist, it will be created. You can also specify the access type of the container, which defaults to private, and the default blob access tier type which defaults to the inferred tier from the storage account.

When tusd receives a chunk of data from the client, it will stage the chunk as a block in the Azure Blob Storage. When the client sends the last chunk of data, tusd will then send commit the block list to the Azure Blob Storage, which in part, creates the file in the Azure Blob Storage.

We've also implemented support for [Azurite](https://github.com/Azure/Azurite), which is a lightweight, self-hosted Azure Blob Storage emulator, this can be enabled by using the `-azure-endpoint` flag. This should also work for custom Azure Blob Storage endpoints, although it has not been tested fully.

TODO: Write a big about the internals of the azurestorage. Maybe some data structures, challenges or workarounds that were necessary. For the s3store, there were many outlined in the blogpost: https://github.com/tus/tus.io/blob/master/_posts/2016-03-07-tus-s3-backend.md
