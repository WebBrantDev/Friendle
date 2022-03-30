import { useEffect, useState } from "react";
import axios from "axios";
import "./TeamDashboard.scss";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { formatBackEnd, formatFrontEnd } from "../../helpers/formatEntry";

const TeamDashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [pattern, setPattern] = useState("");
  const [gameDay, setGameDay] = useState("");
  const [guesses, setGuesses] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let { value } = e.target.wordle;
    if (value) {
      value = value.split(" ");
      const game_day = value[1];
      const num_of_guesses = value[2][0];
      const guess_pattern = value.splice(4);
      const formattedData = formatBackEnd(
        game_day,
        num_of_guesses,
        guess_pattern,
        userId,
        teamId
      );
      axios
        .post("http://localhost:8080/addEntry", formattedData)
        .then((res) => {
          const { game_day, num_of_guesses, guess_pattern } = res.data;
          setPattern(formatFrontEnd(guess_pattern));
          setGameDay(game_day);
          setGuesses(num_of_guesses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const inviteHandler = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/Signup/${teamId}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    alert("Copied link to clipboard!");
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/Login");
  };

  useEffect(() => {
    let isMounted = true;
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    if (!loggedIn) {
      axios
        .get("http://localhost:8080/teamDashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const { username, id, team_id } = res.data.decoded;
          setUsername(username);
          setUserId(id);
          setTeamId(team_id);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <div className="team-dashboard">
      <div className="team-dashboard__main">{`Welcome ${username}!`}</div>
      <button className="team-dashboard__button" onClick={logoutHandler}>
        Logout
      </button>
      {teamId ? (
        <button className="team-dashboard__button" onClick={inviteHandler}>
          Invite a friend!
        </button>
      ) : (
        <button
          className="team-dashboard__button"
          onClick={() => {
            navigate("/CreateTeam");
          }}
        >
          Create Team
        </button>
      )}
      <form className="team-dashboard__entry-form" onSubmit={handleSubmit}>
        <input type="text" name="wordle" />
        <button>Submit</button>
      </form>
      {pattern ? (
        <div className="team-dashboard__entry-container">
          <p>{gameDay}</p>
          <p>{guesses}/6</p>
          {pattern.map((pat) => {
            return (
              <div key={uuidv4()} className="team-dashboard__pattern">
                {pat}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TeamDashboard;
