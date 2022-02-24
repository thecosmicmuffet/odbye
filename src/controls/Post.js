import React from "react";
import "./Post.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, count } = this.props;

    return (
      <div className="post-root">
        <div>{count+1}</div>
        {data.body.map((post) => {
          switch (post.kind) {
            case "text":
              return <div dangerouslySetInnerHTML={{ __html: post.data }}>{}</div>;
            case "embed":
              return (
                <a href={post.data.url}>
                  <img className="post-image" src={post.data.thumbnailLargeUrl} />
                </a>
              );
            case "image":
              return <img className="post-image" src={post.data.url} alt={post.data.alt} />;
          }
        })}
      </div>
    );
  }
}
