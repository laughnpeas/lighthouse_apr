Character encodings for beginners

2015-04-16 16:47
     
Question
Answer
First, why should I care?
So what's a character encoding?
How do fonts fit into this?
How does this affect me?
Additional information
Further reading
About this article

This article has been reviewed by the W3C Internationalization Working Group and has gone through public review to make it as accurate as possible. If you have comments, please send them using the link near the bottom of this page.
Intended audience: content authors, users, and anyone who is unsure about what a character encoding is, and wants a brief summary of how it affects them.

What is a character encoding, and why should I care?

If you use anything other than the most basic English text, people may not be able to read the content you create unless you say what character encoding you used.

For example, you may intend the text to look like this:

mojibake1.gif
but it may actually display like this:

mojibake2.gif
Not only does lack of character encoding information spoil the readability of displayed text, but it may mean that your data cannot be found by a search engine, or reliably processed by machines in a number of other ways.

Words and sentences in text are created from characters. Examples of characters include the Latin letter á or the Chinese ideograph 請 or the Devanagari character ह.

You may not be able to see some of the characters in this page because you don't have the necessary fonts. If you click on the place where you expected to see a character you will link to a graphic version. This page is encoded in UTF-8.

Characters that are needed for a specific purpose are grouped into a character set (also called a repertoire). (To refer to characters in an unambiguous way, each character is associated with a number, called a code point.)

The characters are stored in the computer as one or more bytes.

Basically, you can visualise this by assuming that all characters are stored in computers using a special code, like the ciphers used in espionage. A character encoding provides a key to unlock (ie. crack) the code. It is a set of mappings between the bytes in the computer and the characters in the character set. Without the key, the data looks like garbage.

The misleading term charset is often used to refer to what are in reality character encodings. You should be aware of this usage, but stick to using the term character encodings whenever you can.

So, when you input text using a keyboard or in some other way, the character encoding maps characters you choose to specific bytes in computer memory, and then to display the text it reads the bytes back into characters.

Unfortunately, there are many different character sets and character encodings, ie. many different ways of mapping between bytes, code points and characters. The section Additional information provides a little more detail for those who are interested.

Most of the time, however, you will not need to know the details. You will just need to be sure that you consider the advice in the section How does this affect me? below.

A font is a collection of glyph definitions, ie. definitions of the shapes used to display characters.

Once your browser or app has worked out what characters it is dealing with, it will then look in the font for glyphs it can use to display or print those characters. (Of course, if the encoding information was wrong, it will be looking up glyphs for the wrong characters.)

A given font will usually cover a single character set, or in the case of a large character set like Unicode, just a subset of all the characters in the set. If your font doesn't have a glyph for a particular character, some browsers or software applications will look for the missing glyphs in other fonts on your system (which will mean that the glyph will look different from the surrounding text, like a ransom note). Otherwise you will typically see a square box, a question mark or some other character instead. For example:

mojibake3.gif
As a content author or developer, you should nowadays always choose the UTF-8 character encoding for your content or data. This Unicode encoding is a good choice because you can use a single character encoding to handle any character you are likely to need. This greatly simplifies things. Using Unicode throughout your system also removes the need to track and convert between various character encodings.

Content authors need to find out how to declare the character encoding used for the document format they are working with.

Note that just declaring a different encoding in your page won't change the bytes; you need to save the text in that encoding too.

As a content author, you need to check what encoding your editor or scripts are saving text in, and how to save text in UTF-8. (It's usually the default these days.) You may also need to check that your server is serving documents with the right HTTP declarations.

Developers need to ensure that the various parts of the system can communicate with each other, understand which character encodings are being used, and support all the necessary encodings and characters. (Ideally, you would use UTF-8 throughout, and be spared this trouble.)

The links below provide some further reading on these topics.

This section provides a little additional information on mapping between bytes, code points and characters for those who are interested. Feel free to just skip to the section Further reading.

Note that code point numbers are commonly expressed in hexadecimal notation - ie. base 16. For example, 233 in hexadecimal form is E9. Unicode code point values are typically written in the form U+00E9.

In the coded character set called ISO 8859-1 (also known as Latin1) the decimal code point value for the letter é is 233. However, in ISO 8859-5, the same code point represents the Cyrillic character щ.

These character sets contain fewer than 256 characters and map code points to byte values directly, so a code point with the value 233 is represented by a single byte with a value of 233. Note that it is only the context that determines whether that byte represents either é or щ.

There are other ways of handling characters from a range of scripts. For example, with the Unicode character set, you can represent both characters in the same set. In fact, Unicode contains, in a single set, probably all the characters you are likely to ever need. While the letter é is still represented by the code point value 233, the Cyrillic character щ now has a code point value of 1097.

Bytes these days are usually made up of 8 bits. There are only 28 (ie. 256) unique ways of combining 8 bits.

On the other hand, 1097 is too large a number to be represented by a single byte*. So, if you use the character encoding for Unicode text called UTF-8, щ will be represented by two bytes. However, the code point value is not simply derived from the value of the two bytes spliced together – some more complicated decoding is needed.

Other Unicode characters map to one, three or four bytes in the UTF-8 encoding.

Furthermore, note that the letter é is also represented by two bytes in UTF-8, not the single byte used in ISO 8859-1. (Only ASCII characters are encoded with a single byte in UTF-8.)

UTF-8 is the most widely used way to represent Unicode text in web pages, and you should always use UTF-8 when creating your web pages and databases. But, in principle, UTF-8 is only one of the possible ways of encoding Unicode characters. In other words, a single code point in the Unicode character set can actually be mapped to different byte sequences, depending on which encoding was used for the document. Unicode code points could be mapped to bytes using any one of the encodings called UTF-8, UTF-16 or UTF-32. The Devanagari character क, with code point 2325 (which is 915 in hexadecimal notation), will be represented by two bytes when using the UTF-16 encoding (09 15), three bytes with UTF-8 (E0 A4 95), or four bytes with UTF-32 (00 00 09 15).

There can be further complications beyond those described in this section (such as byte order and escape sequences), but the detail described here shows why it is important that the application you are working with knows which character encoding is appropriate for your data, and knows how to handle that encoding.

The article Character encodings: Essential concepts provides some gentle introductions to related topics, such as Unicode, UTF-8, Character sets, coded character sets, and encodings, the document character set, character escapes and the HTTP header.