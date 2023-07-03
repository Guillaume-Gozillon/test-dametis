import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const About = () => {
  return (
    <Navigation>
      <h1>ABOUT Page</h1>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
    </Navigation>
  );
};

export default About;
