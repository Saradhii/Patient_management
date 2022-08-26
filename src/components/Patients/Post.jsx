import React from 'react'
import {Link} from "react-router-dom";

const Post = ({ posts, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
      }
    
  //deleting a patient
  const deleteItem = async (id) => {
  console.log(id);
  let res = await fetch(`https://doctor-patient-mock.herokuapp.com/patient/delete/${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};    




  return (
    <>
    {posts.map(e => (
  <>
  <div>
  <Link to={`/medicine/${e._id}`}><h3><img src="https://w7.pngwing.com/pngs/791/121/png-transparent-health-care-medicine-physician-patient-contract-research-organization-infirm-text-hospital-surgery.png"/>&nbsp;&nbsp;<p>{e.name}</p></h3>
  </Link>
  <h3>{e.gender}</h3>
  <h3>{e.age}</h3>
  <h3>{e.medicine}</h3>
  <button className='delete' onClick={() => {deleteItem(e._id)}}>Delete</button>
  </div>
  </>
      ))}
    </>
  )
}

export default Post