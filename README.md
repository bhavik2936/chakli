# Chakli Ude
Chakli Ude is a classical question answer game comprising of Yes/No questions and the player has to quickly answer the questions.

## How to Play
You have to enter your name to register and you'll be redirected to game page. There you have to answer the universal facts, whether they are correct or not; In a time bounded manner!

The scores are recorded and showed on the home page. Hence, try your best to be seen on the top.

(Note: There is not time for answering first question. For the rest, timer is present)

## Play Online
The game is live [here](https://chakliude.herokuapp.com).

## Setup
To clone the project
```bash
$ git clone git@github.com:bhavik2936/chakli-ude.git
$ cd chakli-ude
```

To setup the project, have [ruby-2.7.1](https://www.ruby-lang.org/en/news/2020/03/31/ruby-2-7-1-released) installed
```bash
# this will take few minutes to install dependencies
$ bundle install

# if prompted then do run below command,
# which is used to verify already installed files in
# node_modules did not get removed
$ yarn install --check-files

# then perform the migration
$ rails db:migrate

# add pre-defined questions into the database from the seed file
$ rails db:seed
```

To start the rails server in the localhost
```bash
$ rails s
```
