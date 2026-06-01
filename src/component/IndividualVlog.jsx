import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../config/api';
import ShimmerEffect from '../skeleton/ShimmerEffect';

const IndividualVlog = () => {
    const {id} = useParams();
    const [vlogdata,setVlogdata] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        viewVlogById();
    },[])
    const viewVlogById = async()=>{
        try {
            setLoading(true);
            const jwt = sessionStorage.getItem("JWT");

            const data = await api.get(`thoughtINC/vlog/${id}`, {
                headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
            });
            if (data) {
                setVlogdata(data?.data);
            }
        } catch (error) {
            
        }
        finally{
            setLoading(false)
        }   
    }
    if(loading){
       return <ShimmerEffect/>;
    }
    const handleCopyLink = async () => {
        try {
            await navigator.share({
                title: "Check out this Blog",
                text: "ThoughtINC Blogs,From The House of FALSEFIRE",
                url: window.location.href,
            });
        } catch (error) {
            console.log("Share cancelled", error);
        }
    };
  return (
    <div>
        <div className='my-10 mx-5'>
            <div className='flex justify-end'>
                
            </div>
            <div className='mx-5 my-5'>
                <div className='flex justify-around'>
                <h2 className='lg:text-4xl font-semibold tracking-tight text-pretty wrap-break-word'>{vlogdata?.heading}</h2>
                <button onClick={handleCopyLink}>
                <i className='pi pi-share-alt mr-2' ></i>
                </button>
                </div>
            </div>
            <div className='w-full h-auto object-cover flex justify-center'>
            <img src={vlogdata?.uploadImage} alt="" />
            </div>
            <div className='lg:text-xl font-semibold mx-5 my-5'>
                <p className='text-justify text-sm/7'>{vlogdata?.description}</p>
            </div>
        </div>
    </div>
  )
}

export default IndividualVlog