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

module.exports = CommentActions;