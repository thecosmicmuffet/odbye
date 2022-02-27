import React from "react";
import Post from "./Post";
import "./Post.css";

export class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOffset: 0,
      postsPerPage: 4,
      postWidth: 408,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentWillMount() {
    this.resize();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({ pageOffset: 0 });
    }
    if (prevState.postWidth !== this.state.postWidth) {
      this.resize();
    }
  }

  resize() {
    let newPostsPerPage = Math.max(
      1,
      Math.floor(window.innerWidth / this.state.postWidth)
    );
    let newPageOffset = Math.floor(
      (this.state.postsPerPage / newPostsPerPage) * this.state.pageOffset
    );
    this.setState({
      postsPerPage: newPostsPerPage,
      pageOffset: newPageOffset,
    });
  }

  nextPage(offset) {
    if (offset === undefined) {
      offset = 1;
    }
    this.setState({
      pageOffset: Math.min(
        this.state.pageOffset + offset,
        Math.ceil(
          (this.props.data.length - this.state.postsPerPage) /
            this.state.postsPerPage
        )
      ),
    });
  }

  previousPage(offset) {
    if (offset === undefined) {
      offset = -1;
    }
    if (offset >= 0) {
      offset = 0 - offset;
    }
    this.setState({
      pageOffset: Math.max(this.state.pageOffset + offset, 0),
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
          <input
            onClick={(e) => this.setState({ pageOffset: 0 })}
            value="|<"
            type="button"
          />
          <input
            onClick={(e) => this.previousPage(-10)}
            value="<<"
            type="button"
          />
          <input onClick={(e) => this.previousPage()} value="<" type="button" />
          {start + 1} ({data.length})
          <input onClick={(e) => this.nextPage()} value=">" type="button" />
          <input onClick={(e) => this.nextPage(10)} value=">>" type="button" />
          <input
            onClick={(e) =>
              this.setState({
                pageOffset: Math.ceil(
                  (this.props.data.length - this.state.postsPerPage) /
                    this.state.postsPerPage
                ),
              })
            }
            value=">|"
            type="button"
          />
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
