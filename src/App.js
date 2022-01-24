import React, { useEffect, useState } from "react";
import { Cloner } from "cloner";
import "./styles.css";

export default function App() {
  const [appState, setAppState] = useState({ clones: [] });
  const onCloneChange = (clones) => {
    setAppState({ ...appState, clones });
  };

  useEffect(() => {
    console.log(
      "I am parent and my clones are in my state!",
      appState.clones.map((c) => c.props.name)
    );
  }, [appState]);

  const cloneFactory = (Component) => {
    // do stuff with props in factory, dependant on parent state etc
    return {
      ...Component,
      props: {
        ...Component.props,
        name: `Clone ${Math.floor(Math.random() * 10)}`,
      },
    };
  };

  const myCloneButton = () => {
    return <button>CLONEEE</button>;
  };

  return (
    <div className="App">
      <Cloner
        cloneFactory={cloneFactory}
        onCloneChange={onCloneChange}
        cloneButton={myCloneButton}
      >
        <ToClone
          name={"OG child"}
          onRename={(name) => {
            console.log("PARENT: new name receieved", name);
          }}
        />
      </Cloner>
    </div>
  );
}

const ToClone = ({ name, onRename, unClone }) => {
  const [cloneName, setCloneName] = useState(name);
  const [newName, setNewName] = useState("");
  return (
    <div>
      <div>{cloneName}</div>
      <input
        value={newName}
        placeholder="rename me"
        onChange={(ev) => setNewName(ev.target.value)}
      ></input>
      <button
        onClick={() => {
          if (newName) {
            setCloneName(newName);
            onRename && onRename(newName);
          }
        }}
      >
        rename
      </button>
      <button
        onClick={() => {
          console.log("uncloning", cloneName);
          unClone();
        }}
      >
        unclone
      </button>
    </div>
  );
};
