import React, {Component} from "react";
import marked from 'marked'

class Comment extends Component {
  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className='comment' key={this.props.id}>
        <h2 className='commentAuthor'>
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

export default Comment
