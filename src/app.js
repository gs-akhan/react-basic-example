 	var data = [{
        "author" : "Azhar",
        "comment" : "This is azhar, He writes lots of code every day",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Azhar"
      }, {
        "author" : "Jenny",
        "comment" : "This is Jenny, She is amaizing developer. And she also does testing. She plays violen too. Also a great TT player, some say ",
        "img" : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny"
      }];
      
      var Comment = React.createClass({
      	render : function() {
      		return (
            <div className = "commentWrapper">
              <div className = "imageSection">
               <img src = {this.props.img} />
              </div>
              
              <div className = "eachComment">
                <a className = "commentAuthor" href = "javascript:void(0)">{this.props.author}</a>
                <span className = "commentContent">{this.props.comment}</span>
                <CommentActions />
              </div>

            </div>);
      	}
      });


      var CommentActions = React.createClass({
        render : function (argument) {
          return (<div>
            <div className = "actionControl">
            	<i className = "fa fa-reply fa-1"> Reply </i>
            </div>
            <div className = "actionControl">
            	<i className = "fa fa-thumbs-o-up fa-1"> Like </i>
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
          this.state.data.push(obj);
          this.setState({
            data : data
          });
        },
        render : function(argument) {
         
         var comments = this.state.data.map(function(item) {
            return (<Comment author = {item.author}  comment = {item.comment} img = {item.img}/>);
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
          var formStyle = {
            width : "500px;",
            margin : "0 auto"
          }

          return (
            <div className = "postForm" style = {formStyle}>

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
              img : "http://dummyimage.com/32x32/0088cc/ffffff.gif&amp;text=.Jenny"
            });

            React.findDOMNode(this.refs.postdata).value = "";
          }
        }
      });

      React.render(<CommentBox data = {data} />, document.getElementById('content'));



