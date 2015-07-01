var data = require('./data');
var CommentBox = require('./components/CommentBox');
React.render(<CommentBox data = {data} />, document.getElementById('content'));
