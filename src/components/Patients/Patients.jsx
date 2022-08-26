import React from 'react'
import Login from '../Login/Login';
import { useState,useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Link} from "react-router-dom";
import Posts from "./Post";
import Pagination from "./Pagination";

const Home = () => {
  const token = localStorage.getItem("DoctorLogintoken");
  const [patient,setPatient] =useState([]);
  const [formData, Setformdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  
  //pagination variables
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = patient.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  //alert messages
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleClose = () => {
      window.location.reload();
      setOpen(false);
    };
    const handleClose1 = () => {
      window.location.reload();
      setOpen1(false);
    };
 
  //changes on input
  const handleChange = (e)=>{
      let name = e.target.name;
      Setformdata({
      ...formData,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
      [name]: e.target.value,
      img:"https://w7.pngwing.com/pngs/791/121/png-transparent-health-care-medicine-physician-patient-contract-research-organization-infirm-text-hospital-surgery.png",
  });
  }

  //open form for new todo
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  //close form
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  // Filter by gender Male only
  function genderfilterM() {
    const getdata= async()=>{
      let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/filter/M`,{
          method:"GET",
        });
        let data = await res.json();
        console.log(data);
        setPatient(data);
   }
   getdata(); 
  }

  // Filter by gender Female only
  function genderfilterF() {
        const getdata= async()=>{
          let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/filter/F`,{
              method:"GET",
            });
            let data = await res.json();
            console.log(data);
            setPatient(data);
       }
       getdata(); 
  }

  // Filter by age Low to High
  function agefilterL() {
    const getdata= async()=>{
      let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/sort/L`,{
          method:"GET",
        });
        let data = await res.json();
        console.log(data);
        setPatient(data);
   }
   getdata(); 
  }

  // Filter by age High to low
  function agefilterH() {
    const getdata= async()=>{
      let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/sort/H`,{
          method:"GET",
        });
        let data = await res.json();
        console.log(data);
        setPatient(data);
   }
   getdata(); 
  }

// get list of patients
  useEffect(() => {
    const getdata= async()=>{
       let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/all`,{
           method:"GET",
         });
         let data = await res.json();
         setPatient(data);
    }
    getdata();
 }, []);

//  post new pateint 
 const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(formData);
  axios.post(`https://doctor-patient-mock.herokuapp.com/patient/newpatient`, formData, {
      headers: { "Content-Type": "application/json" },
    }).then((responce) => {
      const { data } = responce;
      setOpen1(true);
    });
};

//deleting a patient
const deleteItem = async (id) => {
  console.log(id);
  let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/delete/${id}`, {
    method: "DELETE",
  });
  setOpen(true);
};

//search patient by name
const searchProduct = (e) => {
  const value = e.target.value;
  console.log(value);
  axios.get(`https://doctor-patient-mock.herokuapp.com/patient/search?name=${value}`)
    .then((res) => {
      const { data } = res;
       setPatient(data);
    })
};
 
//reset filters & sortings
const resetFilter = ()=>{
  window.location.reload();
}

  return (
    <>{token ? <>
     <div className='homeprofile'>
        <div className='patient'>
          <div className='patientheader'>
              <div><h1>Patients List</h1></div>
              <div className='filters'>
                <button className='open-button' onClick={openForm}>Add new patient</button>&nbsp;&nbsp;&nbsp;
                <span>Filter By Gender:</span>
                <button className='open-button' onClick={genderfilterM}>M</button>
                <button className='open-button' onClick={genderfilterF}>F</button>&nbsp;&nbsp;&nbsp;
                <span>Sort By Age</span>
                <button className='open-button' onClick={agefilterL}>Low to High</button>
                <button className='open-button' onClick={agefilterH}>High to Low</button>&nbsp;&nbsp;
                <span>Search:</span>&nbsp;
                <input type="text" placeholder='Patient name'  onChange={(e) => searchProduct(e)}></input>
                <button className='open-button' onClick={resetFilter}>Reset<br></br>Filter🔄</button>
              </div>
          </div>
          <div className='patientdata'>
                  <div>
                  <h3>Patient name</h3>
                  <h3>Gender (M/F)</h3>
                  <h3>Age</h3>
                  <h3>No of medication</h3>
                  <h3>Delete</h3>
                  </div>
                  {patient.length!=0 ? <Posts posts={currentPosts} loading={loading}/> : <p>loading...</p>}
                  <div className='footer'>
                  <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={patient.length}
                  paginate={paginate}
                  />
    </div>
          </div>
        </div>
     </div>
    </>:<Login/>}
    <div className="form-popup" id="myForm">
         <form className="form-container" onSubmit={handleSubmit}>
         <h1>New Patient &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://www.svgrepo.com/show/284208/patient.svg"/></h1>

        <label><b>Patient name</b></label>
        <input type="text" placeholder="Enter your task" name="name" onChange={handleChange} required/>

        <label><b>Age</b></label>
        <input type="text" placeholder="Enter your task" name="age" onChange={handleChange} required/>

        <label><b>Gender</b></label><br></br>
        <select name="gender" class="status" onChange={handleChange}>
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        </select>

        <label for="psw"><b>Medication dose</b></label><br></br>
        <select name="medicine" class="tag" onChange={handleChange}>
        <option value="">Select</option>
        <option value="5">5 Naproxen Sodium</option>
        <option value="10">10 Selenium Sulfide</option>
        <option value="15">15 Acetaminophen</option>
        </select>
        <button type="submit" className="btn">Send</button>
        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
       </form>
     </div>
     <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="error">Patient deleted</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
    </Dialog>
    
    <Dialog open={open1} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
        <Alert severity="success">New patient added</Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Continue</Button>
        </DialogActions>
    </Dialog>
    </>
    
  )
}

export default Home