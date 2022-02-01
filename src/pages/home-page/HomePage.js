import { Button, CardMedia, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import cryptoData from "../../data";
import DialogBox from "../../myComponents/dialog-box/DialogBox";
import NavBar from "../../myComponents/navbar/Navbar";
import "./style.css"

export default function HomePage() {
  const navigate = useNavigate();

  const getDataFromLS = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    return data || [];
  }

  const [data, setData] = useState(getDataFromLS());
  const [open, setOpen] = useState(false);
  let total = data?.reduce((sum, item) => sum + Number(item.value), 0);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [indexNumber, setIndexNumber] = useState("");
  const [exchangeImage, setExchangeImage] = useState("")
  const [exchangeName, setExchangeName] = useState("")
  const [exchangeIndex, setExchangeIndex] = useState("")
  const showExchangeIndex = exchangeIndex + 2;
  const showExchangeName = exchangeName;
  const showExchangeImage = exchangeImage;
  const exchangeValue = value - indexNumber;
  const showExchangeValue = Math.abs(exchangeValue);
  const cryptoName = name;
  const cryptoId = id;
  const cryptoValue = value;
  const cryptoImage = cryptoData[id]?.image;

  const getDropdownData = (name, value) => {
    setName(name);
    setId(value);
  }

  const getInputData = (value) => {
    setValue(value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeDataIfZero = () => {
    let newShowArray = data.filter(function (showArray) {
      return showArray.value != "0";
    });
    localStorage.setItem('data', JSON.stringify(newShowArray));
    window.location.reload();
  }

  const handleRemove = (id) => {
    data.splice(id, 1)
    localStorage.setItem('data', JSON.stringify(data))
    navigate("/")
  }

  const showExchangedData = {
    "id": cryptoId,
    "name": showExchangeName,
    "value": showExchangeValue,
    "image": showExchangeImage
  }

  const handleShowManageExchange = () => {
    let newShowData = data;
    newShowData.unshift(showExchangedData)
    localStorage.setItem('data', JSON.stringify(newShowData))
    navigate("/")
  }

  const removePreviousData = () => {
    data.splice(showExchangeIndex, 1)
    localStorage.setItem('data', JSON.stringify(data))
    navigate("/")
  }

  const getExchangedData = {
    "name": cryptoName,
    "value": cryptoValue,
    "image": cryptoImage
  }

  const handleSubmit = () => {
    let newData = data;
    newData.unshift(getExchangedData)
    localStorage.setItem('data', JSON.stringify(newData))
    navigate("/")
  }

  const handleManageExchange = (indexNumber, exchangeImage, exchangeName, index) => {
    setIndexNumber(indexNumber);
    setExchangeImage(exchangeImage);
    setExchangeName(exchangeName);
    setExchangeIndex(index);
  }

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('data')));
  }, [])

  return (
    <Container>
      <NavBar />
      <Box className="header" sx={{ padding: "45px 60px", mb: "10px", borderRadius: "15px" }}>
        <Box>
          <Typography variant='small'>Number Of Crypto Coins Types</Typography> <br />
          <Typography variant='small'>{data?.length || 0}</Typography>
        </Box>

        <Box>
          <Typography variant='small'>Number Of Crypto Coins</Typography> <br />
          <Typography variant='small'>
            {total || 0}
          </Typography> <br />
        </Box>
      </Box>
      <Box>
        {
          data?.length ?
            <Box>
              {
                data?.map((item, index) => (
                  <Box key={index} className="content" sx={{ padding: "15px", mb: "10px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
                      <Box sx={{ display: "flex", width: "50px" }}>
                        <CardMedia
                          sx={{ pr: "10px" }}
                          component="img"
                          height="30"
                          width="30"
                          image={item.image}
                          alt={item.name}
                        />
                        <Typography sx={{ pt: "5px" }} key={index} variant="small">{item.name} </Typography>
                      </Box>
                      <Box sx={{ pt: "5px" }}>
                        <Typography key={index} variant="small">
                          {item.value}
                        </Typography>
                      </Box>
                      <Box>
                        <Button onClick={() => {
                          handleClickOpen();
                          handleManageExchange(item.value, item.image, item.name, index);
                        }} key={index} sx={{ mr: "10px", BackgroundColor: "red" }} variant="contained" >exchange</Button>
                        <Button
                          onClick={() => handleRemove(index)}
                          variant="contained"
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))
              }
            </Box>
            :
            <Box className="content" sx={{ padding: "15px", mb: "10px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
                <Typography variant="small">Opps! No Crypto Coins found ):</Typography>
                <Button variant="contained" onClick={() => navigate('/crypto-page')}>Buy Crypto</Button>
              </Box>
            </Box>
        }
      </Box>
      <Box>
        <DialogBox
          indexValue={indexNumber}
          exchangeName={exchangeName}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          getDropdownData={getDropdownData}
          getInputData={getInputData}
          handleShowManageExchange={handleShowManageExchange}
          removePreviousData={removePreviousData}
          removeDataIfZero={removeDataIfZero}
          value={name}
          open={open}
        />
      </Box>
    </Container>
  )
}