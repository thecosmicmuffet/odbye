import React from "react";
import "./Post.css";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.renderPostFragment = this.renderPostFragment.bind(this);
  }

  renderPostFragment(fragment) {
    switch (fragment.kind) {
      case "text":
        return <p dangerouslySetInnerHTML={{ __html: fragment.data }}>{}</p>;
      case "embed":
        return (
          <a href={fragment.data.url}>
            <img className="post-image" src={fragment.data.thumbnailLargeUrl} alt={fragment.data.alt} />
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
  }

  render() {
    const { data, count } = this.props;
    let dataBody = data.body.length > 0 ? data.body : data.reposted_body || [];
    return (
      <div className="post-root">
        <div>{count + 1}</div>
        <div className="dateStamp">{data.created_at}</div>
        {dataBody.map(this.renderPostFragment)}
        {data.comments && data.comments.length > 0 && (
          <div className="Comments">
            <hr />
            <b>Comments:</b>
            <br />
            {data.comments.map((comment) => {
              return comment.body.map(this.renderPostFragment);
            })}
          </div>
        )}
      </div>
    );
  }
}
