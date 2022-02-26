import React from "react";
import Post from "./Post";

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOffset: 0,
      postsPerPage: 4,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({ pageOffset: 0 });
    }
  }

  useEffect() {}

  nextPage() {
    this.setState({
      pageOffset:
        this.props.data.length >
        (this.state.pageOffset + 1) * this.state.postsPerPage
          ? this.state.pageOffset + 1
          : this.state.pageOffset,
    });
  }

  previousPage() {
    this.setState({
      pageOffset: this.state.pageOffset > 0 ? this.state.pageOffset - 1 : 0,
    });
  }

  render() {
    const { pageOffset, postsPerPage } = this.state;
    const { data } = this.props;
    let start = pageOffset * postsPerPage;
    let pagePosts = data?.slice(start, start + postsPerPage) ?? {};
    let postCount = start - 1;
    return (
      <div>
        <div>
          <input onClick={this.previousPage} value="<" type="button" />
          {start + 1} ({data.length})
          <input onClick={this.nextPage} value=">" type="button" />
        </div>
        {pagePosts.map((post) => {
          postCount++;
          return <Post data={post} count={postCount} />;
        })}
      </div>
    );
  }
}

export default Page;
