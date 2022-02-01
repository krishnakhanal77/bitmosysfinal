import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export default function DialogBox(props) {
  const [value, setValue] = React.useState();
  const [dropValue, setDropValue] = React.useState();
  const [dropName, setDropName] = React.useState();
  const dValue = dropValue;
  const dName = dropName;
  const tValue = value;

  const handleExchangeChange = (event, name) => {
    props.getDropdownData(name.props.children, event.target.value);
    setDropValue(event.target.value)
    setDropName(name.props.children)
  }
  const handleTextChange = (event) => {
    props.getInputData(event.target.value);
    setValue(event.target.value);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Box sx={{ backgroundColor: "rgb(15, 73, 63)", p: 1 }}>
          <DialogTitle color="white">Exchange  "{props.exchangeName}" With </DialogTitle>
          <DialogContent sx={{ color: 'white' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" >Choose Crypto</InputLabel>
              <Select
                required={true}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Crypto"
                value={dValue}
                onChange={handleExchangeChange}
              >
                <MenuItem value={0}>Bitcoin</MenuItem>
                <MenuItem value={1}>Ethereum</MenuItem>
                <MenuItem value={2}>Binance</MenuItem>
                <MenuItem value={3}>Tether</MenuItem>
                <MenuItem value={4}>Usdcoin</MenuItem>
                <MenuItem value={5}>Cardano</MenuItem>
                <MenuItem value={6}>Xrp</MenuItem>
                <MenuItem value={7}>Cardano</MenuItem>
                <MenuItem value={8}>Terraluna</MenuItem>
                <MenuItem value={9}>Polkadot</MenuItem>
              </Select>
              {dName === props.exchangeName && <Typography color="error">Crypto must be diffrent</Typography>}
              {dName !== props.exchangeName && (!dValue && <Typography sx={{ mt: 1 }} color="error">Please select crypto</Typography>)}
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Crypto Quantity"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
            {+props.indexValue < +tValue && <Typography sx={{ mt: 1 }} color="error">Must be smaller than {props.indexValue} coins.</Typography>}
            {(tValue < 0) && <Typography color="error">quantity must be positive</Typography>}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={props.handleClose}>Cancel</Button>
            <Button variant="contained" onClick={() => {
              { (tValue && dValue && tValue > 0 && tValue <= props.indexValue && dName !== props.exchangeName) && props.handleSubmit(); }
              { (tValue && dValue && tValue > 0 && tValue <= props.indexValue && dName !== props.exchangeName) && props.handleClose(); }
              { (tValue && dValue && tValue > 0 && tValue <= props.indexValue && dName !== props.exchangeName) && props.handleShowManageExchange(); }
              { (tValue && dValue && tValue > 0 && tValue <= props.indexValue && dName !== props.exchangeName) && props.removePreviousData(); }
              { (tValue && dValue && tValue > 0 && tValue <= props.indexValue && dName !== props.exchangeName) && props.removeDataIfZero(); }
            }}>Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}