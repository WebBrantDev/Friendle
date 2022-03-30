import { useEffect, useState } from "react";
import axios from "axios";
import "./TeamDashboard.scss";
import { useNavigate } from "react-router-dom";

const TeamDashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  let navigate = useNavigate();

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

  if (localStorage.getItem("token")) {
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
      </div>
    );
  } else {
    navigate("/");
  }
};

export default TeamDashboard;
