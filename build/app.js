 	var data = [{
        "author" : "Azhar",
        "comment" : "This is azhar, He writes lots of code every day",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Azhar",
        
        "replies" : [{
          author : "jenny",
          comment : "Azhar says he is cool"
        }],


        "postedDate" : moment().format('MMMM Do YYYY, h:mm:ss a')
      }, {
        "author" : "Jenny",
        "comment" : "This is Jenny, She is amaizing developer. And she also does testing. She plays violen too. Also a great TT player, some say ",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny",
        "replies" : [],
        "postedDate" : moment().format('MMMM Do YYYY, h:mm:ss a')
      }];
      
      var CommentReplyBox = React.createClass({displayName: "CommentReplyBox",
        /*Prop Valiadtion*/
        
        propTypes : function() {
          return {
            replyPosted : React.React.PropTypes.func.isRequired
          }
        },
        render : function() {
          return (
              React.createElement("div", {className: "commentReply"}, 
                React.createElement("div", {className: "imageSection"}, 
                  React.createElement("img", {src: "http://dummyimage.com/32x32/0088cc/ffffff.gif&text=.Jenny"})
                ), 
                React.createElement("textarea", {ref: "replyTextBox", onKeyUp: this.props.replyPosted, className: "commentReplyBox", placeholder: "write a comment..."})
              )
            )
        }

      });


      // This is the CommentPOST (When User posts new status)

      var CommentPost = React.createClass({displayName: "CommentPost",
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
            partial  = React.createElement(CommentReplyBox, {ref: "replyBoxComponent", replyPosted: this.replyPosted})
          } else {
            partial = "";
          }
          

          var repliesArray = this.state.replies.map(function(item) {
            return (React.createElement(ReplyPost, {reply: item.comment}))
          });


          return (
            React.createElement("div", {className: "commentWrapper"}, 
              React.createElement("div", {className: "postTopSection"}, 
                  React.createElement("div", {className: "imageSection"}, 
                   React.createElement("img", {src: this.props.img})
                  ), 
                  React.createElement("div", {className: "nameAndDateContainer"}, 
                      React.createElement("div", {className: "authorHolder"}, 
                        React.createElement("a", {className: "commentAuthor", href: "javascript:void(0)"}, this.props.author)
                      ), 
                      React.createElement("div", {className: "dateHolder"}, " ", this.props.postedDate)
                  )
              ), 

              React.createElement("div", {className: "eachComment"}, 
                React.createElement("div", {className: "commentContent"}, this.props.comment), 
                React.createElement(CommentActions, {showReplyBox: this.showReplyBox})
              ), 
              partial, 

              
              repliesArray
              
            ));
      	}
      });


      var ReplyPost = React.createClass({displayName: "ReplyPost",

          render : function (argument) {
            return (
                React.createElement("div", {className: "replyPost"}, 
                  React.createElement("div", {className: "imageSection"}, 
                    React.createElement("img", {src: "http://dummyimage.com/32x32/0088cc/ffffff.gif&text=.Jenny"})
                  ), 
                  React.createElement("div", {className: "replyContent"}, 
                    this.props.reply
                  ), 
                  React.createElement("div", {className: "spacer"})
                )
              );  
          }
      }); 

      var CommentActions = React.createClass({displayName: "CommentActions",

        render : function (argument) {
          return (React.createElement("div", {className: "actionControlsContainer"}, 
            React.createElement("div", {className: "actionControl"}, 
            	React.createElement("i", {className: "fa fa-reply fa-1 actionLinks", onClick: this.props.showReplyBox}, " Reply ")
            ), 
            React.createElement("div", {className: "actionControl"}, 
            	React.createElement("i", {className: "fa fa-thumbs-o-up fa-1 actionLinks"}, " Like ")
            ), 
             React.createElement("div", {className: "actionControl"}, 
              React.createElement("i", {className: "fa fa-retweet actionLinks"}, " Share ")
            )
            ));
        }
      });

      var CommentBox = React.createClass({displayName: "CommentBox",
        
        getInitialState : function(argument) {
          return {data : []}
        },
        componentDidMount : function (argument) {
          var self = this;
          //Just to see if things work async ;)
          setTimeout(function () {
           // body...
           self.setState({
            data : data
           });
         }) 
        },
        submitFormAndRefresh : function (obj) {
          this.state.data.unshift(obj);
          this.setState({
            data : data
          });
        },
        render : function(argument) {
         
         var comments = this.state.data.map(function(item) {
            return (React.createElement(CommentPost, {postedDate: item.postedDate, 
                    author: item.author, 
                    comment: item.comment, 
                    img: item.img, 
                    replies: item.replies})
                  );
          });
          
          return (
            React.createElement("div", null, 
              React.createElement("div", {className: "allCommentContainer"}, 
              React.createElement(CommentForm, {submitdata: this.submitFormAndRefresh}), 
               comments
              )
            )
            );
        }

      });

      var CommentForm = React.createClass({displayName: "CommentForm",

        render : function() {
          

          return (
            React.createElement("div", {className: "postForm"}, 

              React.createElement("div", {className: "postHeader"}, 
                React.createElement("ul", {className: "postHeaderItems"}, 
                  React.createElement("li", null, React.createElement("i", {className: "fa fa-comment"}), "Update Status"), 
                  React.createElement("li", null, React.createElement("i", {className: "fa fa-camera"}), "Add Photo/Video"), 
                  React.createElement("li", null, React.createElement("i", {className: "fa fa-files-o"}), "Create Photo Album")
                )
              ), 
              React.createElement("form", null, 
              
              React.createElement("div", {className: "textAreaWrapper"}, 
                React.createElement("textarea", {placeholder: "Enter your comment", ref: "postdata", onKeyUp: this.handleKeyUp}

                )
              ), 

              React.createElement("div", {className: "postControls"}, 
                React.createElement("ul", {className: "footerItems"}, 
                  React.createElement("li", null, React.createElement("i", {className: "fa fa-camera-retro"})), 
                  React.createElement("li", null, React.createElement("i", {className: "fa fa-map-marker"})), 
                  React.createElement("li", null, React.createElement("i", {className: "fa fa-user-plus"}))

                )
              )
              )
            ));
        },
        handleKeyUp : function (evt) {
          if(evt.keyCode === 13) {
            this.props.submitdata({
              author : "azhar",
              comment : evt.currentTarget.value,
              img : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny",
              postedDate : moment().format('MMMM Do YYYY, h:mm:ss a')
            });

            React.findDOMNode(this.refs.postdata).value = "";
          }
        }
      });

      React.render(React.createElement(CommentBox, {data: data}), document.getElementById('content'));
