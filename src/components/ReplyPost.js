 var ReplyPost = React.createClass({

          render : function (argument) {
            return (
                <div className = "replyPost">
                  <div className = "imageSection">
                    <img src = "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny" />
                  </div>
                  <div className = "replyContent">
                    {this.props.reply}
                  </div>
                  <div className = "spacer" />
                </div>
              );  
          }
      });

 module.exports = ReplyPost;