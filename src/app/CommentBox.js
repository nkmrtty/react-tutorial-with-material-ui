import React, {Component} from "react";
import request from 'superagent';

import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

const styles = {
  container: {
    textAlign: 'center',
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
  appBar: {
    height: 50,
  },
});

class CommentBox extends Component {
  constructor(props, contexts) {
    super(props, contexts);

    this.state = {
      data: []
    };

    this.fetchCommentsFromServer = this.fetchCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }

  fetchCommentsFromServer() {
    request
      .get(this.props.url)
      .end((err, res) => {
        if(err) {
          throw err;
        }
        this.setState({data: res.body});
      })
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    request
      .post(this.props.url)
      .send(comment)
      .end((err, res) => {
        if(err) {
          this.setState({data: comments});
          throw err;
        }
        this.setState({data: res.body});
      });
  }

  componentDidMount() {
    this.fetchCommentsFromServer();
    setInterval(this.fetchCommentsFromServer, this.props.pollInterval)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title="Comments" style={styles.appBar} />
          <div className='commentBox' style={styles.container}>
            <CommentList data={this.state.data} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default CommentBox;
