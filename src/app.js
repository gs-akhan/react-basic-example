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


      // This is the CommentPOST (When User posts new status)

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

      var CommentActions = React.createClass({

        render : function (argument) {
          return (<div className = "actionControlsContainer">
            <div className = "actionControl">
            	<i className = "fa fa-reply fa-1 actionLinks" onClick = {this.props.showReplyBox}> Reply </i>
            </div>
            <div className = "actionControl">
            	<i className = "fa fa-thumbs-o-up fa-1 actionLinks"> Like </i>
            </div>
             <div className = "actionControl">
              <i className = "fa fa-retweet actionLinks"> Share </i>
            </div>
            </div>);
        }
      });

      var CommentBox = React.createClass({
        
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

      var CommentForm = React.createClass({

        render : function() {
          

          return (
            <div className = "postForm">

              <div className = "postHeader">
                <ul className = "postHeaderItems" >
                  <li><i className="fa fa-comment"></i>Update Status</li>
                  <li><i className="fa fa-camera"></i>Add Photo/Video</li>
                  <li><i className="fa fa-files-o"></i>Create Photo Album</li>
                </ul>
              </div>
              <form>
              
              <div className = "textAreaWrapper">
                <textarea  placeholder = "Enter your comment" ref = "postdata" onKeyUp = {this.handleKeyUp}>

                </textarea>
              </div>

              <div className = "postControls">
                <ul className = "footerItems">  
                  <li><i className ="fa fa-camera-retro"></i></li>
                  <li><i className ="fa fa-map-marker"></i></li>
                  <li><i className ="fa fa-user-plus"></i></li>

                </ul>
              </div>
              </form>
            </div>);
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

      React.render(<CommentBox data = {data} />, document.getElementById('content'));
