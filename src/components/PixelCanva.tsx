import { Box, Tooltip } from "@mui/material";
import { User } from "../pages/Home";
import { Dispatch, SetStateAction } from "react";

interface ColorData {
  data: any;
  setIsModaleOpen: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<User>>;
  userInfo: User;
}

const PixelCanva = ({
  data,
  setIsModaleOpen,
  setUserInfo,
  userInfo,
}: ColorData) => {
  const handleClick = (key: string, data: { color: string; user: string }) => {
    setIsModaleOpen(true);

    setUserInfo({
      color: data.color,
      name: data.user,
      coordinates: key,
    });
  };

  return (
    <Box display="grid" gridTemplateColumns="repeat(50, 1fr)" rowGap={0}>
      {Array.from({ length: 50 }, (_, row) =>
        Array.from({ length: 50 }, (_, col) => {
          const i = `${row + 1}-${col + 1}`;
          const currentUser = data[i];
          const userName = currentUser?.user;
          const userColor = currentUser?.color;

          return (
            <Tooltip
              key={i}
              title={
                userName ? `${userName} - ${userColor} - (${row},${col})` : ""
              }
            >
              <Box
                onClick={() => userName && handleClick(i, currentUser)}
                sx={{
                  border: "1px solid black",
                  width: "100%",
                  height: "100%",
                  marginBottom: 2,
                  background: currentUser?.color || "white",
                  cursor: userName ? "pointer" : "inherit",
                  "&:hover": {
                    background: "darken",
                  },
                }}
              />
            </Tooltip>
          );
        })
      )}
    </Box>
  );
};

export default PixelCanva;
