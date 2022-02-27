import { useState } from "react";
import "./App.css";
import { Page } from "./controls/Page";
import data from "./data/thoskite-2-2022.json";
import betterData from "./data/organized_thoskite_ello.json";

function App() {
  const [organizedJson, setOrganizedJson] = useState("");
  const [displayData, setDisplayData] = useState(betterData);
  const [currentData, setCurrentData] = useState("Posts with comments");
  const downloadOrganizedJson = (json, name) => {
    if (organizedJson !== "") URL.revokeObjectURL(organizedJson);
    setOrganizedJson("");

    const newJson = new Map();
    const dateSort = (elloPostA, elloPostB) => {
      let a = new Date(elloPostA.created_at);
      let b = new Date(elloPostB.created_at);
      return a - b;
    };
    data.posts.forEach((element) => {
      if (element.parent_post_id === null) {
        newJson.set(element.id, {
          created_at: element.created_at,
          body: element.body,
          reposted_body: element.reposted_body,
          mentioned_usernames: element.mentioned_usernames,
          comments: new Array(),
        });
      }
    });

    data.posts.forEach((element) => {
      if (newJson.has(element.parent_post_id)) {
        let thisOne = newJson.get(element.parent_post_id);
        thisOne.comments.push(element);
        thisOne.comments.sort(dateSort);
      }
    });

    let newVals = Array.from(newJson.values());
    newVals.sort(dateSort);

    const textFile = new Blob([JSON.stringify(newVals)], {
      type: "text/plain",
    });
    setOrganizedJson(URL.createObjectURL(textFile));
  };

  return (
    <div className="App">
      <div className="ConvertButton">
        <input
          value="convert to organized json"
          type="button"
          onClick={() => downloadOrganizedJson(data, "thoskite")}
        />
        {organizedJson !== "" && <a href={organizedJson}>download</a>}
      </div>
      <input
        className="ToggleDataTypeButton"
        value="toggle between all data and better data"
        type="button"
        onClick={() => {
          if (displayData !== betterData) {
            setDisplayData(betterData);
            setCurrentData("Posts with comments");
          } else {
            setDisplayData(data.posts);
            setCurrentData("All data, unorganized");
          }
        }}
      />
      <div className="pageHeader">Showing {currentData}</div>
      <Page data={displayData} />
    </div>
  );
}

export default App;
