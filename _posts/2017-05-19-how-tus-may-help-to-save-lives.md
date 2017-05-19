---
layout: post
title: 'How firefighters in Poland are using tus, our open protocol for resumable uploads'
meta_description: >-
  How reliable is uploading with tus? Don’t let us tell you, ask the Polish fire brigades who are using tus to relay information between   the command center and units in the field!
visible_title: 'How tus may help to save lives'
author: aj
published: true
---

Yes, oddly enough, this seems to be the case! A while ago, we noticed something really interesting on tus.io, our open protocol for resumable uploads: a [comment](http://tus.io/implementations.html#comment-2903776646) from [Jaroslaw Wasilewski](https://twitter.com/Orajo) mentioned that tus was being used to support firefighting rescue operations. Now that is exciting news!

While we did set out to make the world a slightly better place by making uploading more reliable for everyone, this is certainly not what we had in mind. We were very interested to learn more about this, so we invited Jaroslaw to sit down with us for a virtual cup of coffee and asked him to tell us a little more about the system they have developed – and how they are using tus for it.


<div class="kodak-container kodak-dropshadow">
<img src="/img/blog/2017-05-firefighters" alt="Firefighters">
</div>


**Could you tell us something about the work you do and the kind of service your company provides to fire fighters?** 

>Certainly! My name is Jaroslaw Wasilewski and I work as a developer for an IT company called [BIT S.A.](http://Bit-sa.pl), which is located in Bialystok, Poland. We primarily write dedicated software for government and local administration. Our fire brigades were already using a system for handling requests and directing them to the appropriate, nearest units. There was, however, nothing in place that could support communication during rescue operations, either between units or between the command center and the firefighters in the field, beyond the typical radio communication. So, we developed a set of mobile and web-based applications that allows for messages, documents, data mapping, pictures and videos from the area of action to be sent to the command post and vice versa. It also makes it possible to closely monitor both the location and status of vehicles and firefighters, and it can be used to report the state of the victims. Lastly, it even provides logistic services for long-term rescue operations, such as forest fires or other natural disasters.  The system is currently being tested by firefighters in the [province of Podlasie](https://en.wikipedia.org/wiki/Podlaskie_Voivodeship).


**How exactly are you using tus? Could you tell me something about the way it is used in firefighting operations?**

>Tus is being used to send photos, videos and  other documents from mobile application to the back-end as attachments to the exchanged messages. This allows units in the field to immediately give the command center of any rescue operation a full and clear picture of the situation at hand. Fast and reliable file uploading is something that might help to save lives in such cases and, with the help of tus, our system can provide that. A more reliable means of transferring information, even under very poor networking circumstances, means that those in charge of rescue operations are better equipped to make decisions at times when lives are at stake.
 
**How did you find out about tus and what led you to implement the protocol in your system?**

>We needed an effective solution for transferring large types of data, such as high-resolution photos and long videos. Our system was intended to operate on a GSM network, often outside the cities, in areas where coverage tends to be weak and intermittent. With that in mind, the solution should be able to upload files piece by piece and save the current upload state. We didn't want to use FTP because it would be quite difficult to integrate with the REST API and also because partial transfer can be very unreliable. Our [subcontractor](https://netbulls.io/), who develops the mobile parts of the system, told us about tus.  While they themselves had not used it before, it quickly appeared after some more searching for possible solutions and various tests that tus met all of our expectations. The availability of libraries for the Android and .NET platforms was also crucially important for us. Furthermore, thanks to the tusd server and JavaScript client we had a great reference solution for the analysis of the protocol. As a result, we were able to prepare a new implementation of the tus server for PHP, and in parallel, work on the mobile application.

**Did you encounter any challenges in implementing tus? If so, how did you overcome them?**

>At that time, the biggest problem was the lack of documentation for version 1.0 of tus. The only available documentation concerned, from what I remember, version 0.2. Therefore, much of our work had to be based on tests and analysis of HTTP messages from the [demo version](http://tus.io/demo.html). That said, thanks to the availability of the tusd server, our subcontractor managed to complete all of their preparations before I'd finished my work. That was a great help. And when the [tus protocol 1.0](https://tus.io/protocols/resumable-upload.html) was released, I was able to fix some remaining issues.

**What benefits have the fire departments you work with experienced after tus was implemented?**

>After several months of intensive testing of the system, we can say that the transfer of files has been very reliable - not a single damaged file has been reported! For that part, we owe a big thanks to tus. As a result, the fire departments that are currently testing this system have had a much more robust and reliable system of communication to their disposal – and something like that can certainly save lives in emergency situations.

Thanks a lot to Jaroslaw for taking the time to answer our questions about this fascinating use case for tus! Our primary motivation behind the development of tus has been a desire to change the way the world does file uploading. So, with that in mind, you can imagine our excitement when we learned that the protocol was already being trusted with the communications of emergency services. To us, this really stands as a testament to its reliability. 

We hope that by sharing this story, more companies and developers might be tempted to give tus a try. After all, the more people that start using this protocol, the sooner truly reliable, resumable uploads can become a reality for all of us. If you’d like to know more about this specific use for tus, or about the protocol in general, feel free to [reach out](https://twitter.com/tus_io)! And if you are also using tus for something interesting, we’d love to hear about that as well!
