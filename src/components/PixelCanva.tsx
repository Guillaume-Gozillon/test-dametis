import { Box, Tooltip } from "@mui/material";
import { UserInfo } from "../pages/Home";
import { Dispatch, SetStateAction } from "react";

interface ColorData {
  data: any;
  setIsPickerVisible: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
}

const PixelCanva = ({ data, setIsPickerVisible, setUserInfo }: ColorData) => {
  const handleClick = (key: string, data: { color: string; user: string }) => {
    setIsPickerVisible(true);

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
          const userExist = currentUser?.user;

          return (
            <Tooltip title={userExist || ""} key={i}>
              <Box
                onClick={() => userExist && handleClick(i, currentUser)}
                sx={{
                  border: "1px solid black",
                  width: "100%",
                  height: "100%",
                  marginBottom: 2,
                  background: currentUser?.color || "white",
                  cursor: userExist ? "pointer" : "inherit",
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
