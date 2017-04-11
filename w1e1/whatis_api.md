What APIs Are And Why They’re Important3

brian proffitt Contributing WriterSeptember 19, 2013
in Hack


It’s getting harder to turn around in tech without bumping into some reference to APIs, or application programming interfaces. Here at ReadWrite, for instance, we’ve recently discussed Google’s flip-flops on the open Calendar API and why Pinterest hasn’t made its APIs public yet. I’ve even put forth the notion of getting my own API.

If you work with APIs, you already know why they’re important. But the rest of you may well be wondering: What are APIs, and why do we care so much about them?

This is your story.

APIs: Windows To The Code

In the simplest terms, APIs are sets of requirements that govern how one application can talk to another. APIs aren’t at all new; whenever you use a desktop or laptop, APIs are what make it possible to move information between programs—for instance, by cutting and pasting a snippet of a LibreOffice document into an Excel spreadsheet. System-level APIs makes it possible for applications like LibreOffice to run on top of an OS like Windows in the first place.

On the Web, APIs make it possible for big services like Google Maps or Facebook to let other apps “piggyback” on their offerings. Think about the way Yelp, for instance, displays nearby restaurants on a Google Map in its app, or the way some video games n6ow let players chat, post high scores and invite friends to play via Facebook, right there in the middle of a game.

See also: The New API Gold Rush

APIs do all this by “exposing” some of a program’s internal functions to the outside world in a limited fashion. That makes it possible for applications to share data and take actions on one another’s behalf without requiring developers to share all of their software’s code. Code-sharing on that scale wouldn’t just ruffle the feathers of programmers who’d rather keep it secret; it would also be grossly inefficient.

That’s true even for open-source programs. Who has the time to comb through all the code for somebody else’s application—which, trust me, can be awfully messy—just to use one function? (It’s also possible to run into tricky licensing issues if you’re not careful.)

APIs simplify all that by limiting outside program access to a specific set of features—often enough, requests for data of one sort or another. Feel free to think of them as doors, windows or levers if you like. Whatever the metaphor, APIs clearly define exactly how a program will interact with the rest of the software world—saving time, resources and potentially nasty legal entanglements along the way.

How APIs Work

These days, APIs are especially important because they dictate how developers can create new apps that tap into big Web services—social networks like Facebook or Pinterest, for instance, or utilities like Google Maps or Dropbox.5 The developer of a game app, for instance, can use the Dropbox API to let users store their saved games in the Dropbox cloud instead of working out some other cloud-storage option from scratch.

In one sense, then, APIs are great time savers. They also offer user convenience in many cases; Facebook users undoubtedly appreciate the ability to sign into many apps and Web sites using their Facebook ID—a feature that relies upon Facebook APIs to work.

Viewed more broa5dly, though, APIs make possible a sprawling array of Web-service “mashups,” in which developers use mix and match APIs from the likes of Google or Facebook or Twitter to create entirely new apps and services. In many ways, the widespread availability of APIs for major services is what’s made the modern Web experience possible.

When you search for nearby restaurants in the Yelp app for Android, for instance, it will plot their locations on Google Maps instead of creating its own maps. Via the Google Maps API, the Yelp app passes the information it wants plotted—restaurant addresses, say, along with the Yelp star rating and more—to an internal Google Maps function that then returns a Map object with restaurant pins in it at the proper locations. Which Yelp can then display inside its app. (On iOS, Yelp taps Apple’s Maps API for the same purpose.)

We see APIs like this all the time. Elsewhere on this page you should see the icons to share this article on Facebook, Google+, Twitter, LinkedIn or Reddit. These are just links that call on the APIs associated with each of those services to allow users to Tweet or post about an article without leaving the site itself. APIs also allow our comment system, run by a service called Disqus, to accept user comments and then display them right here on ReadWrite without our intervention.

When APIs Go Bad

Of course, just because an API is available now, that doesn’t mean it always will be. Twitter, for instance, notoriously limited third-party applications’ use of its APIs just over a year ago—a move that had the practical effect of killing off alternative Twitter clients and driving users to Twitter’s own site and apps, where Twitter can “monetize” them by displaying ads … er, promoted tweets. Twitter insisted the move was necessary to deliver a “unified” Twitter experience.

Other examples abound. Companies can shut down services and APIs that your applications depend on—or they can go out of business entirely, as Memolane and Everyblock did last February. And let’s not get started on all of the services that Google regularly shuts down when it doesn’t see any profit in them—like Google Health or more recently, Google Reader. These kinds of service shutdowns can leave you in a lurch if your application depends on those APIs to function.

There’s still more than a hint of the Wild West in today’s API landscape. But none of these complications seem likely to dampen developer enthusiasm for APIs, nor that of users for the incredible variety of apps and services they make possible.

The API Landscape

This article is part of our API series. You can download a high-resolution version of the landscape featuring 270 companies here.