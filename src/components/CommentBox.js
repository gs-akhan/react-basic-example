
var CommentPost = require('./CommentPost');  
var CommentForm = require('./CommentForm');
var CommentBox = React.createClass({
        
        getInitialState : function(argument) {
          return {data : this.props.data}
        },
        componentDidMount : function (argument) {
          var self = this;
          console.log(this.state.data);
        },
        submitFormAndRefresh : function (obj) {
           
          var newData = React.addons.update(this.state.data, {
            $unshift : [obj]
          });

          this.setState({
            data : newData
          });
        },  
        
        render : function(argument) {
         
         var comments = this.state.data.map(function(item) {
            return (<CommentPost postedDate = {item.postedDate} 
                    author = {item.author}  
                    comment = {item.comment} 
                    img = {item.img}
                    replies = {item.replies} />
                  );
          });
          
          return (
            <div>
              <div className = "allCommentContainer">
              <CommentForm submitdata = {this.submitFormAndRefresh} />
               {comments}
              </div>
            </div>
            );
        }

      });
module.exports = CommentBox;