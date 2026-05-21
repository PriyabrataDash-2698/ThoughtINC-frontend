import React, { useEffect, useState } from 'react'
import { api } from '../config/api'

import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
const ViewVlog = ({userrole,publisherid }) => {
  const { status } = useParams();
  const [vlogs, setVlogs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleadmin, setVisibleadmin] = useState(false);
  const [admincomment,setAdmincomment] = useState("");
  const navigate = useNavigate();
  

  
  useEffect(() => {
    console.log(publisherid)
    let jwt = sessionStorage.getItem("JWT");
    const fetchData = async () => {
      try {
        if(status=="APPROVED"){
          const res = await api.get(`/thoughtINC/public/vlog`);
          setVlogs(res.data);
        }
        else if(status == "PENDING"){
          const res = await api.get(`/thoughtINC/vlog?status=${status}`,{
          headers:jwt ? { Authorization:`Bearer ${jwt}`,} : {}
        });
        setVlogs(res.data)
        }
        else if(status == "REJECTED" && publisherid != null){
        const res = await api.get(`/thoughtINC/vlog?status=${status}&publisherId=${publisherid}`,{
          headers:jwt ? { Authorization:`Bearer ${jwt}`,} : {}
        });
        setVlogs(res.data)
      }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [status,publisherid]);
  const handleComment = (e) => {
   
  }
  const handleAdminReview = async (id,e) => {
    let jwt = sessionStorage.getItem("JWT");
    const adminreview = {
      comment:e=="REJECTED" ? admincomment : null,
      status: e
    }
    
  const res = await api.put(`/thoughtINC/review/${id}`,adminreview,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
     if(res){
      setVisibleadmin(false);
     }
  }
  const handleIndividualVlog = (vlogid) =>{
    console.log("hiii from vlogid",vlogid);
    navigate(`/vlog/${vlogid}`)
  }

  const footerContent = (
    <div>
      <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={handleComment} autoFocus />
    </div>
  );
  return (
    <div>
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 flex justify-end">
            {userrole ?
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">{userrole == "ADMIN" ? `Admin blog Dashboard` : `From ThoughtInc Poplular`}</h2>
              :
              <h2 className="text-4xl font-semibold tracking-tight text-pretty "><span className='text-white sm:text-5xl'>Watch For</span>
                <span className='text-2xl text-amber-300 font font-stretch-75% mx-4'>Thoughts</span>Here...</h2>
            }
          </div>
          <div className={vlogs.length === 0 ?"mt-4":"mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"}>
            {
              vlogs.length === 0 ? 
              ( <div className='text-2xl font-bold'>No {status.toLowerCase()} vlogs found</div>):
            (
            vlogs
            .map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <img alt="" src={post.uploadImage} className="w-4/5 h-4/5 rounded-sm bg-gray-800" />
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <div className='text-gray-400'>{post.uploadDate}</div>
                </div>
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                    <a href="#" onClick={()=>handleIndividualVlog(post.id)}>
                      <span className="absolute inset-0" />
                      {post.heading}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{post.description}</p>
                </div>
                
                {userrole=="ADMIN" &&
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div>
                    <button type="button" className="text-sm/6 font-semibold text-white"
                    onClick = {()=>setVisibleadmin(true)}
                    >
                      Reject
                    </button>
                    <div className="card flex justify-content-center">
                      <Dialog className='bg-white' header="Comment" visible={visibleadmin} onHide={() => { if (!visibleadmin) return; setVisibleadmin(false); }}
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <input type="text" name="comment" id="comment"
                        onChange={(e)=>setAdmincomment(e.target.value)}
                          className="border block min-w-0 grow py-1.5 pr-3 pl-1 w-full" />
                            <Button label="No" icon="pi pi-times" onClick={() => setVisibleadmin(false)} className="p-button-text" />
                            <Button label="Yes" icon="pi pi-check" onClick={()=>handleAdminReview(post.id,"REJECTED")} autoFocus />
                      </Dialog>
                    </div>
                    </div>
                    <button
                      type="submit"
                      onClick={()=>handleAdminReview(post.id,"APPROVED")}
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Approve
                    </button>
                  </div>
                }
              </article>
            )))
          }
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ViewVlog