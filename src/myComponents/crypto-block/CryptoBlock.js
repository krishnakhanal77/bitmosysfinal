import { Button, Dialog, DialogContent, DialogTitle, TextField, Typography, CardMedia, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import "./style.css"

export default function CryptoBlock(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelChange = (e) => {
    props.value(e.target.value, props.item.name, props.item.image, props.item.id);
    setValue(e.target.value);
  };

  return (
    <>
      <Box className="content" sx={{ display: 'flex', justifyContent: 'space-between', alignItems:"center", mb: "10px", padding: "15px" }}>
        <Box sx={{ display: "flex" }}>
          <CardMedia
          sx={{pr:"10px"}}
            component="img"
            height="30"
            width="30"
            image={props.item.image}
            alt={props.item.name}
          />
          <Typography sx={{pt: "5px"}}>{props.item.name}</Typography>
        </Box>
        <Button variant="contained" onClick={handleClickOpen} >Buy</Button>


        <Dialog open={open} onClose={handleClose}>
         <Box sx={{backgroundColor: "rgb(15, 73, 63)", p:1}}>
         <DialogTitle color= "white">{props.item.name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={handelChange}
            />
            {(value < 0) && <Typography color="error">quantity must be positive</Typography>}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={() => {
              {value > 0 && handleClose();}
              {value > 0 && props.handleClose();}
            }}>Buy</Button>
          </DialogActions>
         </Box>
        </Dialog>


      </Box>
    </>
  )
};
