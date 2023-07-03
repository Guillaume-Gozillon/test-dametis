import { useEffect, useState } from "react";
import PixelCanva from "../components/PixelCanva";
import Navigation from "../components/Navigation";
import { SketchPicker } from "react-color";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import axios from "axios";

export interface UserInfo {
  name: string;
  coordinates: string;
  color: string;
}

const Home = () => {
  const [data, setData] = useState([]);
  const [sendData, setsendData] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const url = "http://localhost:8000/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, [sendData]);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    coordinates: "",
    color: "",
  });

  useEffect(() => {
    const updateColor = async () => {
      if (sendData === true) {
        try {
          await axios.post(url, {
            coordinates: userInfo.coordinates,
            user: userInfo.name,
            color: userInfo.color,
          });
          setsendData(false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    updateColor();
  }, [sendData]);

  const handleChangeComplete = (color: any) => {
    const rgbaString = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;

    setUserInfo((prevState) => ({
      ...prevState,
      color: rgbaString,
    }));
  };

  const handleSendData = () => {
    setsendData(true);
    setIsPickerVisible(false);
  };

  return (
    <Navigation>
      <h1>r/Place</h1>
      {data && (
        <PixelCanva
          data={data}
          setUserInfo={setUserInfo}
          setIsPickerVisible={setIsPickerVisible}
        />
      )}
      <Dialog open={isPickerVisible} sx={{ alignItems: "center" }}>
        <DialogTitle>Changer les informations</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            vitae dui varius odio dignissim pretium non eget nisi.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={userInfo.name}
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setUserInfo((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </DialogContent>
        <Box sx={{ alignSelf: "center", mb: 2 }}>
          <SketchPicker
            color={userInfo.color}
            onChangeComplete={handleChangeComplete}
          />
        </Box>
        <DialogActions>
          <Button onClick={() => setIsPickerVisible(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleSendData}>
            Modifier le champs
          </Button>
        </DialogActions>
      </Dialog>
    </Navigation>
  );
};

export default Home;
