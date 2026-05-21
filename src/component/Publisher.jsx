import React, { useEffect, useRef, useState } from 'react'
import { api } from '../config/api';
import { showToast } from '../hook/UseToast';
import { useLocation } from 'react-router-dom';


        

const Publisher = ({publisherid}) => {

     const location = useLocation();

     const vlog = location.state?.vlog;
     const [formData,setFormData] = useState({
        heading:"",
        description:"",
        image:null
     })
     console.log(vlog)
     useEffect(()=>{
          console.log("vlog changed:", vlog);
        if(vlog){
            setFormData({
                heading:vlog[0].heading ?? "",
                description:vlog[0].description ?? "",
                image:vlog[0

                ].uploadImage ?? null
            })
        }
     },[vlog])
     
     let jwt = sessionStorage.getItem("JWT");
   
     const [preview,setPreview] = useState(null);
    
    const handleSubmit=async (e)=>{
        let jwt = sessionStorage.getItem("JWT");
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const publisherContent = {
            heading:formData.heading,
            description:formData.description,
            image:preview !== null ? formData.image : null,
            publisherId:publisherid 
        }
        console.log(publisherContent);
        
        if(!vlog){
        const response = await api.post("/thoughtINC/create", publisherContent, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        }
        else{
            const response = await api.put("/thoughtINC/update", publisherContent, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        }
        if(response){
            showToast({
                severity: 'success',
                summary: 'Success',
                detail: 'Vlog Created Successfully',
                life: 3000
            });       
        }
    }
    const handleImagePreview = (e) =>{
        const file = e.target.files[0];
        if(file){
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        }
    }
    const handleReset = ()=>{
        const doNull ={
             heading:'',
            description:'',
            image:setPreview(null)
        }
        console.log(doNull)
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                  <label htmlFor="heading" className="block text-sm/6 font-medium text-white">
                      Heading
                  </label>
                  <div className="mt-2">
                      <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                          <input
                              id="heading"
                              name="heading"
                              type="text"
                              placeholder="A Cool Bridge:The Way To Life"
                              className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                                  value={formData.heading}
                                  onChange={(e) =>
                                      setFormData({ ...formData, heading: e.target.value })
                                  }
                          />
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-span-full">
              <label htmlFor="description" className="block text-sm/6 font-medium text-white">
                  Description
              </label>
              <div className="mt-2">
                  <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                      value={formData.description}
                      onChange={(e) =>
                       setFormData({ ...formData, description: e.target.value })}
                  />
              </div>
          </div>
           <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm/6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                    >
                      <span>Upload an image related to your content</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e)=>setFormData({...formData,image:e.target.files[0]})}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-400">PNG, JPG, GIF up to 200KB</p>
                </div>
                {/* {preview && (
                    <img src={preview} alt="preview" className='w-64 h-64 object-cover rounded-lg border' />
                )} */}
              </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm/6 font-semibold text-white"
              onClick={handleReset}>
                  Cancel
              </button>
              <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                  Submit to Admin
              </button>
          </div>
      </form>
     </div> 
  )
}

export default Publisher