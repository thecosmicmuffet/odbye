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
        <div>{count + 1}</div>
        <div className="dateStamp">{data.created_at}</div>
        {data.body.map((post) => {
          switch (post.kind) {
            case "text":
              return (
                <div dangerouslySetInnerHTML={{ __html: post.data }}>{}</div>
              );
            case "embed":
              return (
                <a href={post.data.url}>
                  <img
                    className="post-image"
                    src={post.data.thumbnailLargeUrl}
                  />
                </a>
              );
            case "image":
              return (
                <img
                  className="post-image"
                  src={post.data.url}
                  alt={post.data.alt}
                />
              );
          }
        })}
        {data.comments && data.comments.length > 0 && (
          <div className="Comments">
            <hr/>
            <b>Comments:</b>
            <br />
            {data.comments.map((comment) => {
              return comment.body.map((fragment) => {
                switch (fragment.kind) {
                  case "text":
                    return (
                      <p dangerouslySetInnerHTML={{ __html: fragment.data }}>
                        {}
                      </p>
                    );
                  case "embed":
                    return (
                      <a href={fragment.data.url}>
                        <img
                          className="post-image"
                          src={fragment.data.thumbnailLargeUrl}
                        />
                      </a>
                    );
                  case "image":
                    return (
                      <img
                        className="post-image"
                        src={fragment.data.url}
                        alt={fragment.data.alt}
                      />
                    );
                }
              });
            })}
          </div>
        )}
      </div>
    );
  }
}
