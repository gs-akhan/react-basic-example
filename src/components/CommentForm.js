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
              postedDate : moment().format('MMMM Do YYYY, h:mm:ss a'),
              replies : []
            });

            React.findDOMNode(this.refs.postdata).value = "";
          }
        }
      });


module.exports = CommentForm;