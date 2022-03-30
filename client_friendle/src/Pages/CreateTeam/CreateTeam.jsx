import "./CreateTeam.scss";
import axios from "axios";

const CreateTeam = () => {
  const createHandler = (e) => {
    e.preventDefault();
    const { team } = e.target.team.value;

    axios
      .post("http://localhost:8080/joinTeam", { team })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create-team">
      <form className="create-team__form" onSubmit={createHandler}>
        <input
          className="create-team__input"
          type="text"
          name="team"
          placeholder="Team Name"
        />
        <button className="create-team__button">Create</button>
      </form>
    </div>
  );
};

export default CreateTeam;
