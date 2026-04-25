import React from 'react'
import { api } from '../config/api'

const ViewVlog = () => {
  const getAllVlogs = async () =>{
    const data = await api.get("thoughtINC/allVlogs");
    console.log(data);
  }
  return (
    <div>ViewVlog Coming Soon...
      <div ><button type="submit" onClick={getAllVlogs}>submit</button></div>
    </div>
  )
}

export default ViewVlog