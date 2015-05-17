// This is the CommentPOST (When User posts new status)

var CommentReplyBox = require('./CommentReplyBox');
var ReplyPost = require('./ReplyPost');
var CommentActions = require('./CommentActions');

var CommentPost = React.createClass({
        /*
          Setting Default props, for posts that does not have replies, we need empty array for that.
          */
          getDefaultProps : function() {
            return  {
              replies : []
            }
          },

          getInitialState : function (argument) {
            return {showRBox : false, replies : this.props.replies};
          },

          showReplyBox : function() {
            var _showState = this.state.showRBox;

            _showState ^= 1;

            this.setState({
              showRBox : _showState
            });
          },
          replyPosted : function (evt) {
            if(evt.which === 13) {
              var replies = this.state.replies;

              replies.push({
                author : "Azhar",
                comment : evt.currentTarget.value
              });

              this.setState({
                replies : replies
              })

            //Clear the text Box

            this.refs.replyBoxComponent.refs.replyTextBox.getDOMNode().value = ""
          }

          
        },
        render : function() {
          var partial;
          

          if(this.state.showRBox) {
            partial  = <CommentReplyBox ref = "replyBoxComponent" replyPosted = {this.replyPosted}/>
          } else {
            partial = "";
          }
          

          var repliesArray = this.state.replies.map(function(item) {
            return (<ReplyPost reply = {item.comment} />)
          });


          return (
            <div className = "commentWrapper">
            <div className = "postTopSection">
            <div className = "imageSection">
            <img src = {this.props.img} />
            </div>
            <div className = "nameAndDateContainer">
            <div className = "authorHolder">
            <a className = "commentAuthor" href = "javascript:void(0)">{this.props.author}</a>
            </div>
            <div className = "dateHolder"> {this.props.postedDate}</div>
            </div>
            </div>

            <div className = "eachComment">
            <div className = "commentContent">{this.props.comment}</div>
            <CommentActions showReplyBox = {this.showReplyBox} />
            </div>
            {partial}


            {repliesArray}

            </div>);
        }
      });
module.exports = CommentPost;