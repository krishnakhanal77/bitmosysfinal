import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CryptoBlock from "../../myComponents/crypto-block/CryptoBlock";
import NavBar from "../../myComponents/navbar/Navbar";
import cryptoData from "../../data";
import "./style.css"

export default function CryptoPage() {

  const getDataFromLS = () => {
    const data = localStorage.getItem('data');
    if (data) {
      return JSON.parse(data);
    }
    else {
      return []
    }
  }

  const [data, setData] = useState(getDataFromLS());
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState('');

  function getValue(value, name, image, id) {
    setValue(value);
    setName(name);
    setImage(image);
    setId(id);
  }

  function handleClose(e) {
    let mydata = {
      value,
      name,
      image,
      id,
    }
    setData([...data, ...[mydata]]);
    setName('');
    setValue('');
    setImage('');
    setId('');
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  return (
    <>
      <Container>
        <NavBar />
        <Box className="header" sx={{ padding: "50px 60px", mb: "10px", borderRadius: "15px" }}>
          <Typography variant="small">
            Crypto Coins
          </Typography>
        </Box>
        <Box>
          {
            cryptoData.map((item) => (
              <>
                <CryptoBlock
                  value={getValue}
                  handleClose={handleClose}
                  item={item}
                  key={item.toString()}
                />
              </>
            ))
          }
        </Box>
      </Container>
    </>
  )
}