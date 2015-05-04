 	var data = [{
        "author" : "Azhar",
        "comment" : "This is azhar, He writes lots of code every day",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Azhar"
      }, {
        "author" : "Jenny",
        "comment" : "This is Jenny, She is amaizing developer. And she also does testing. She plays violen too. Also a great TT player, some say ",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny"
      }];
      
      var Comment = React.createClass({displayName: "Comment",
      	render : function() {
      		return (
            React.createElement("div", {className: "commentWrapper"}, 
              React.createElement("div", {className: "imageSection"}, 
               React.createElement("img", {src: this.props.img})
              ), 
              
              React.createElement("div", {className: "eachComment"}, 
                React.createElement("a", {className: "commentAuthor", href: "javascript:void(0)"}, this.props.author), 
                React.createElement("span", {className: "commentContent"}, this.props.comment), 
                React.createElement(CommentActions, null)
              )

            ));
      	}
      });


      var CommentActions = React.createClass({displayName: "CommentActions",
        render : function (argument) {
          return (React.createElement("div", null, 
            React.createElement("div", {className: "actionControl"}, 
            	React.createElement("i", {className: "fa fa-reply fa-1"}, " Reply ")
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
          this.state.data.push(obj);
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
              comments, 
              React.createElement(CommentForm, {submitdata: this.submitFormAndRefresh})
              )
            )
            );
        }

      });

      var CommentForm = React.createClass({displayName: "CommentForm",

        render : function() {
          var textAreaStyle = {
            width : "100%",
            height : "60px",
            resize : "none",
            border : "1px solid #ddd",
            outline : "none",
            "box-sizing": "border-box"
          }

          var formStyle = {
            width : "350px;",
            margin : "0 auto"
          }

          return (React.createElement("div", {style: formStyle}, 
              React.createElement("form", null, 
              React.createElement("textarea", {placeholder: "Enter your comment", style: textAreaStyle, ref: "postdata", onKeyUp: this.handleKeyUp}

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