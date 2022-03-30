import React from "react";
import "./App.scss";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import TeamDashboard from "./Pages/TeamDashboard/TeamDashboard";
import CreateTeam from "./Pages/CreateTeam/CreateTeam";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    let { value } = e.target.wordle;
    value = value.split(" ");
    const game_day = value[1];
    const num_of_guesses = value[2][0];
    const guess_pattern = value.splice(4);
    const guess_array = guess_pattern.join("");
    const green2 = "🟩";
    const black2 = "⬛";
    const yellow2 = "🟨";
    let outerArray = [];
    for (let i = 0; i < guess_pattern.length; i++) {
      const innerArray = [];
      for (let j = 0; j < guess_pattern[i].length; j++) {
        if (guess_pattern[i][j] === "\ud83d") {
          if (guess_pattern[i][j + 1] === "\udfe8") {
            innerArray.push("y");
            j++;
          } else if (guess_pattern[i][j + 1] === "\udfe9") {
            innerArray.push("g");
            j++;
          }
        } else {
          innerArray.push("b");
        }
      }
      outerArray.push(innerArray);
    }
    outerArray = outerArray.join("").replace(/,/g, "");
    const object = { data: outerArray, game_day, num_of_guesses };
    console.log(object);
    const newArray = outerArray.split("");
    let formatterArray = [];
    let str = "";
    for (let i = 0; i < newArray.length; i++) {
      if (outerArray[i] === "b") {
        str += black2;
      } else if (outerArray[i] === "y") {
        str += yellow2;
      } else {
        str += green2;
      }
      if (i === 4 || i === 9 || i === 14 || i === 19 || i === 24 || i === 29) {
        formatterArray.push(str);
        str = "";
      }
    }
    console.log(formatterArray);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Signup/:id" element={<Signup />} />
          <Route path="Login" element={<Login />} />
          <Route path="TeamDashboard" element={<TeamDashboard />} />
          <Route path="CreateTeam" element={<CreateTeam />} />
        </Routes>
        {/* <form onSubmit={handleSubmit}>
        <input type="text" name="wordle" />
        <button>Submit</button>
      </form> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
