# This is not what you think, this is not designed to be a website, this is a real pharmacy!
After reading some books about DDD, I decided to implement it in a real world project, and this is how real it is. This system it designed for a local pharmacy store.
<br />
I also gave it a little taste of EventSourcing for storing all events about patients.
<br />
It used MySQL as the primary database and EventStoreDB as the EventStore.
<br />
Notice: I used to simple `Error` class for domain errors.
<br />
There's nor unit tests nor e2e tests as of now, but I'm going to write them in the near future, I hope at leat. 