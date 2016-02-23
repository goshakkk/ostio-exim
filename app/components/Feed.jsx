import React from 'react';
import PostCard from 'components/PostCard';
import Avatar from 'components/Avatar';
import postsStore from 'stores/posts';
import usersStore from 'stores/users';

export default React.createClass({
  mixins: [
    postsStore.connect('postsLoading', 'posts'),
    usersStore.connect('usersLoading', 'users')
  ],

  componentDidMount() {
    postsStore.actions.fetchLatest();
    usersStore.actions.fetchLatest();
  },

  render() {
    let posts, users;

    if (!this.state.posts || this.state.postsLoading) {
      posts = "Loading...";
    } else if (this.state.posts.length > 0) {
      posts = this.state.posts.map(post => <PostCard post={post} inFeed={true} />)
    } else {
      posts = "No posts.";
    }

    if (!this.state.users || this.state.usersLoading) {
      users = "Loading...";
    } else if (this.state.users.length > 0) {
      users = this.state.users.map(user => {
        return <span className="user animated-item-view animated-item-view-end">
          <a className="user-organization organization" href={'/@' + user.login} title={user.login}>
            <Avatar url={user.avatar_url} />
          </a>
        </span>;
      });
    } else {
      users = "No users.";
    }

    return (
      <div>
        <div className="user-list-container">
          <h4>Latest users</h4>

          <div className="users">
            {users}
          </div>
        </div>
        <div className="post-list-container">
          <h4>Latest posts</h4>

          <div className="topic-posts">
            {posts}
          </div>
        </div>
      </div>
    );
  }
});
