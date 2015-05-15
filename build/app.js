 	var data = [{
        "author" : "Azhar",
        "comment" : "This is azhar, He writes lots of code every day",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Azhar"
      }, {
        "author" : "Jenny",
        "comment" : "This is Jenny, She is amaizing developer. And she also does testing. She plays violen too. Also a great TT player, some say ",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny"
      }];
      

      var CommentReplyBox = React.createClass({displayName: "CommentReplyBox",

        render : function() {
          return (
              React.createElement("div", {className: "commentReply"}, 
                React.createElement("textarea", {className: "commentReplyBox"})
              )
            )
        },

      });



      var Comment = React.createClass({displayName: "Comment",
      	
        getInitialState : function (argument) {
          return {showRBox : false};
        },

        showReplyBox : function() {
          var _showState = this.state.showRBox;
          
          _showState ^= 1;

          this.setState({
            showRBox : _showState
          });
        },
        render : function() {
      		var partial;
          if(this.state.showRBox) {
            partial  = React.createElement(CommentReplyBox, null)
          } else {
            partial = "";
          }
          return (
            React.createElement("div", {className: "commentWrapper"}, 
              React.createElement("div", {className: "imageSection"}, 
               React.createElement("img", {src: this.props.img})
              ), 
              
              React.createElement("div", {className: "eachComment"}, 
                React.createElement("a", {className: "commentAuthor", href: "javascript:void(0)"}, this.props.author), 
                React.createElement("span", {className: "commentContent"}, this.props.comment), 
                React.createElement(CommentActions, {showReplyBox: this.showReplyBox})
              ), 
              partial
            ));
      	}
      });


      var CommentActions = React.createClass({displayName: "CommentActions",
        render : function (argument) {
          return (React.createElement("div", null, 
            React.createElement("div", {className: "actionControl"}, 
            	React.createElement("i", {className: "fa fa-reply fa-1", onClick: this.props.showReplyBox}, " Reply ")
            ), 
            React.createElement("div", {className: "actionControl"}, 
            	React.createElement("i", {className: "fa fa-thumbs-o-up fa-1"}, " Like ")
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
            return (React.createElement(Comment, {author: item.author, comment: item.comment, img: item.img}));
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
          var formStyle = {
            width : "500px;",
            margin : "0 auto"
          }

          return (
            React.createElement("div", {className: "postForm", style: formStyle}, 

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
              img : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny"
            });

            React.findDOMNode(this.refs.postdata).value = "";
          }
        }
      });

      React.render(React.createElement(CommentBox, {data: data}), document.getElementById('content'));



