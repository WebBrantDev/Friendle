import { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/user-dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { username, id, team_id } = res.data.decoded;
        setUsername(username);
        setUserId(id);
        setTeamId(team_id);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="user-dashboard">
      <div className="user-dashboard__main">{`Welcome ${username}!`}</div>
    </div>
  );
};

export default UserDashboard;
