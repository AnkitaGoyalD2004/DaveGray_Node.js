import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <P>You must have been assigned an Editor role.</P>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
