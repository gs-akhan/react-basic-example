var data = [{
  "id" : Math.random() * 1000000,
  "author" : "Azhar",
  "comment" : "This is azhar, He writes lots of code every day",
  "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Azhar",

  "replies" : [{
    author : "jenny",
    comment : "Azhar says he is cool"
  }],


  "postedDate" : moment().format('MMMM Do YYYY, h:mm:ss a')
}, {
  "id" : Math.random() * 1000000,
  "author" : "Jenny",
  "comment" : "This is Jenny, She is amaizing developer. And she also does testing. She plays violen too. Also a great TT player, some say ",
  "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny",
  "replies" : [],
  "postedDate" : moment().format('MMMM Do YYYY, h:mm:ss a')
}];

module.exports = data;