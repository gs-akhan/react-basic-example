var CommentReplyBox = React.createClass({
    /*Prop Valiadtion*/

    propTypes : function() {
      return {
        replyPosted : React.React.PropTypes.func.isRequired
      }
    },
    render : function() {
      return (
        <div className = "commentReply">
        <div className = "imageSection">
        <img src = "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny" />
        </div>              
        <textarea ref = "replyTextBox" onKeyUp = {this.props.replyPosted} className = "commentReplyBox" placeholder = "write a comment..."></textarea>
        </div>
        )
    }

  });

  module.exports = CommentReplyBox;
