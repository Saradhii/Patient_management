import React from 'react'
import Login from '../Login/Login';
import {Link} from "react-router-dom";
import { useState,useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Medicine = () => {
    const token = localStorage.getItem("DoctorLogintoken");
    const {id} = useParams();
    const [data,setData] = useState([]);
    const [formData, Setformdata] = useState({});
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };
    const handleClose1 = () => {
      setOpen(false);
      window.location.href="/patients"
    };
     const handleChange = (e)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
    });
    }

    // get list of medicine for patient
    useEffect(() => {
    const getdata= async()=>{
       let res = await fetch(`https://doctor-patient-mock.herokuapp.com/medicine/single/${id}`,{
           method:"GET",
         });
         let data = await res.json();
         setData(data);
    }
    getdata();
    }, []);

    //updating the medicin data
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        axios.put(`https://doctor-patient-mock.herokuapp.com/medicine/edit/${id}`, formData, {
            headers: { "Content-Type": "application/json" },
          }).then((responce) => {
            const { data } = responce;
            setOpen(true);
          });
      };

    //back to pateint page
    const goback = ()=>{
      window.location.href="/patients"
    }

    //deleting medicine
    const deletemedicine = async()=>{
      let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/delete/${id}`, {
    method: "DELETE",
    });
     setOpen1(true);
    }

  return (
    <>{token? <>
    <div className='updatemedicine'>
      <div className='medicinedetails'>
         <div className='medicine'><h3>Medicine details</h3><h3>Dosage</h3></div>
         { data.length!=0 ? <>
          {data && data.map((e)=>{
          return(
            <>
            <div className='medicine'>
              <p>{e.name}</p>
              <p>{e.medicine}</p>
            </div>
            </>
          )
         })}
         </>:<h3>No medicine for this patient ., please try on first page patients</h3>}
         <div className='medicine'><button className='open-button' onClick={goback}>Go back</button>
         <button className="redbutton" onClick={deletemedicine}>Delete medicine</button></div>
      </div>
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
         <h1>Update data &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://www.svgrepo.com/show/284208/patient.svg"/></h1>

        <label for="psw"><b>Medication</b></label><br></br>
        <select name="name" class="tag" onChange={handleChange}>
        <option value="">Select</option>
        <option value="Naproxen Sodium">Naproxen Sodium</option>
        <option value="Selenium Sulfide">Selenium Sulfide</option>
        <option value="Acetaminophen">Acetaminophen</option>
        </select>

        <label for="psw"><b>Medication dose</b></label><br></br>
        <select name="medicine" class="tag" onChange={handleChange}>
        <option value="">Select</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        </select>
        <button type="submit" className="btn">Update</button>
       </form>
      </div>
      
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">data updated</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>

    <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="error">Deleted medicine</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>:<Login/>}
    </>
  )
}

export default Medicine