import React, {Component} from "react";
import Comment from './Comment';

class CommentList extends Component {
  constructor(props, contexts) {
    super(props, contexts);
  }

  render() {
    var commentNodes = this.props.data.map((comment) => {
      return (
        <Comment key={comment.id} author={comment.author}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className='commentList'>
        {commentNodes}
      </div>
    );
  }
}

export default CommentList
