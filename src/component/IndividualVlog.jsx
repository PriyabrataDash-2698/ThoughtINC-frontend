import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../config/api';

const IndividualVlog = () => {
    const {id} = useParams();
    const [vlogdata,setVlogdata] = useState([]);
    useEffect(()=>{
        viewVlogById();
    },[])
    const viewVlogById = async()=>{
        const jwt = sessionStorage.getItem("JWT");
        const data = await api.get(`thoughtINC/vlog/${id}`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        if(data){
            setVlogdata(data?.data);
        }
        
    }
  return (
    <div>
        <div className='my-10 mx-5'>
            <div className='mx-5 my-5'>
                <h2 className='text-4xl font-semibold tracking-tight text-pretty wrap-break-word'>{vlogdata?.heading}</h2>
            </div>
            <div className='w-[100] h-[10] flex justify-center'>
            <img src={vlogdata?.uploadImage} alt="" />
            </div>
            <div className='text-xl font-semibold mx-5 my-5'>
                <p>{vlogdata?.description}</p>
            </div>
        </div>
    </div>
  )
}

export default IndividualVlog