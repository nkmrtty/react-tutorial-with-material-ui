import React, {Component} from "react";

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class CommentForm extends Component {
  constructor(props, contexts) {
    super(props, contexts)
    this.state = {
      author: '',
      text: ''
    };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
    console.log(e.target.value);
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
    console.log(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();

    if (!author || !text) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: "", text: ""});
  }
  render() {
    return (
      <div>
        <TextField hintText='Your name' value={this.state.author} onChange={this.handleAuthorChange} /> <br />
        <TextField hintText='Say something' value={this.state.text} onChange={this.handleTextChange} /> <br />
        <RaisedButton label='Post' onMouseDown={this.handleSubmit} />
      </div>
    );
  }
}

export default CommentForm
