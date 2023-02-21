# Apps and Libs

[Back to Docs Home](README.md)

Project source files are broken up into smaller libraries ("libs") and applications ("apps").

Libraries house any code which is meant to be used by one or more libraries or applications. They are not independently useful to an end-user.

Applications are deployed for end-users. They may be command line tools, web pages, mobile apps, or anything else a person might use outside of a code editor. An automated tool outside this project may use them as well, such as a GitHub Action.

Apps should **not** be dependencies for other apps or libs. Instead, one should move such code into a new or existing lib.

[Back to Docs Home](README.md)
