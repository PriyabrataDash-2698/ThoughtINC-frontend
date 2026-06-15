import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../config/api';
import ShimmerEffect from '../skeleton/ShimmerEffect';

const IndividualVlog = () => {
    const contentRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
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
    const handleShare = async () => {
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
    const handleSound = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        const text = contentRef.current.innerText;
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 1;
        utterance.pitch = 1; 
        utterance.volume = 1; 

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        speechSynthesis.speak(utterance);
    }
    const pause = () => {
        speechSynthesis.pause();
        setIsPaused(true);
    };

    const resume = () => {
        speechSynthesis.resume();
        setIsPaused(false);
    };

    const stop = () => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };
  return (
    <div>
        <div className='my-10 mx-5'>
            <div className='mx-5 my-5'>
                <div className='flex justify-start'>
                    <button onClick={handleShare}>
                    <i className='pi pi-share-alt mr-2' ></i>
                    </button>
                    <div>
                    <button onClick={handleSound}>
                    <i className='pi pi-volume-up mr-2' ></i>
                    </button>
                          {isSpeaking && !isPaused && (
                              <button onClick={pause}>
                                <i className='pi pi-pause mr-2' ></i>
                                </button>
                          )}

                          {isPaused && (
                              <button onClick={resume}>
                                <i className='pi pi-play mr-2' ></i>
                                </button>
                          )}
                        {isSpeaking && isPaused && (
                          <button onClick={stop}>
                            <i className='pi pi-pause-circle'></i>
                          </button>
                        )
                        }
                    </div>
                </div>
                <h2 className='lg:text-4xl font-semibold tracking-tight text-pretty wrap-break-word'>{vlogdata?.heading}</h2>
            </div>
            <div ref={contentRef}>
                <div className='w-full h-auto object-cover flex justify-center rounded-2xl individualvlog-image-border'>
                <img src={vlogdata?.uploadImage} alt="" className='rounded-2xl'/>
                </div>
                <div className='lg:text-xl font-semibold mx-5 my-5'>
                    <p className='text-justify text-sm/7'>{vlogdata?.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IndividualVlog