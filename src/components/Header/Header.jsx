import React from 'react';
import "./styles.css";
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Header = () => {
   
  //Alert popup for Successfull logout
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    window.location.href="./login";
    };

  //getting jwt from localstorage for redux
    var token = localStorage.getItem("DoctorLogintoken");
    var name  = localStorage.getItem("DoctorName");
    const handleLogout =()=>{
      localStorage.removeItem("DoctorLogintoken");
      localStorage.removeItem("DoctorLoginid");
      localStorage.removeItem("DoctorName");
      setOpen(true);
    }

  return (
    //Header content --> if token is present show logout, doctor name & patient list 
    //Header content --> if token is not present show login & signup

    <>
    {token ? 
    <div className='header'>
      <span><img src="https://www.svgrepo.com/show/284250/surgeon-doctor.svg"/>&nbsp;&nbsp;<p>{name}</p></span>
      <Link to="/todos"><h1>Patients List</h1></Link> 
      <Link to="./logout"><h1 onClick={handleLogout}>Logout</h1></Link>
    </div> : 
    <div className='header'>
     <h1><img src="https://www.svgrepo.com/show/128222/medical-kit.svg"/></h1>
     <Link to="/login"><h1>LOGIN</h1></Link>
     <Link to="/signup"><h1>SIGN-UP</h1></Link> 
    </div>}
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">User Logged out successfully</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default Header