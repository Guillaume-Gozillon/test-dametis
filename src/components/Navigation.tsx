import { Stack } from "@mui/material";
import { ReactNode } from "react";
import logo from "../assets/react.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type MyComponentProps = {
  children: ReactNode;
};

const Navigation = ({ children }: MyComponentProps) => {
  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        marginTop={2}
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <img src={logo} alt="Logo" style={{ width: "50px", height: "auto" }} />
        <Button variant="text" component={Link} to="/" color="primary">
          Home
        </Button>
        {/* <Button variant="text" component={Link} to="/about" color="primary">
          À propos
        </Button> */}
      </Stack>
      {children}
    </>
  );
};

export default Navigation;
