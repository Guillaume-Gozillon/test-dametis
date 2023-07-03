import { Box, Tooltip } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ColorData {
  data: any;
  setColor: Dispatch<SetStateAction<string>>;
  sendData: boolean;
  color: string;
  name: string;
  setsendData: Dispatch<SetStateAction<boolean>>;
  setIsPickerVisible: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
}

const PixelCanva = ({
  data,
  setColor,
  color,
  sendData,
  setsendData,
  setIsPickerVisible,
  setName,
  name,
}: ColorData) => {
  const [coordinates, setCoordinates] = useState("");

  const url = "http://localhost:8000/";

  useEffect(() => {
    const updateColor = async () => {
      if (sendData === true) {
        try {
          await axios.post(url, {
            coordinates,
            user: name,
            color,
          });
          setsendData(false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateColor();
  }, [sendData]);

  const handleClick = (key: string, data: { color: string; user: string }) => {
    setIsPickerVisible(true);
    setColor(data.color);
    setName(data.user);
    setCoordinates(key);
  };

  const renderGrid = () => {
    return Array.from({ length: 50 }, (_, row) =>
      Array.from({ length: 50 }, (_, col) => {
        const key = `${row + 1}-${col + 1}`;
        const item = data[key];
        const userExist = item?.user;

        return (
          <Tooltip title={userExist || ""} key={key}>
            <Box
              onClick={() => userExist && handleClick(key, item)}
              sx={{
                border: "1px solid black",
                width: "100%",
                height: "100%",
                marginBottom: 2,
                background: item?.color || "white",
                cursor: userExist ? "pointer" : "inherit",
              }}
            />
          </Tooltip>
        );
      })
    );
  };

  return (
    <Box display="grid" gridTemplateColumns="repeat(50, 1fr)" rowGap={0}>
      {renderGrid()}
    </Box>
  );
};

export default PixelCanva;
