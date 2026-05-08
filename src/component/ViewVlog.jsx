import React, { useEffect, useState } from 'react'
import { api } from '../config/api'

import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
const ViewVlog = () => {

  const [vlogs, setVlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleadmin, setVisibleadmin] = useState(false);
  const [admincomment,setAdmincomment] = useState("");

  

  useEffect(() => {
    let jwt = sessionStorage.getItem("JWT");
    const fetchData = async () => {
      try {
        const res = await api.get("/thoughtINC/allVlogs",{
          headers:jwt ? { Authorization:`Bearer ${jwt}`} : {}
        });
        setVlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const handleComment = (e) => {
   
  }
  const handleAdminReview = async (id,e) => {
    const adminreview = {
      comment:e=="REJECTED" ? admincomment : null,
      status: e
    }
    
  const res = await api.put(`/thoughtINC/review/${id}`,adminreview);
     if(res){
      setVisibleadmin(false);
     }
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
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">{isAdmin ? `Admin blog Dashboard` : `From ThoughtInc Poplular`}</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {vlogs.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <div className='text-gray-400'>{post.uploadDate}</div>
                </div>
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {post.heading}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <img alt="" src={post.uploadImage} className="w-4/5 h-4/5 rounded-sm bg-gray-800" />
                </div>
                {isAdmin ?
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
                  :
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div><i className='pi pi-thumbs-up'></i></div>
                    <div><i className='pi pi-share-alt'></i></div>
                    <button
                      type="submit"
                      onClick={() => setVisible(true)}
                      className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      comment
                    </button>
                    <div className="card flex justify-content-center">
                      <Dialog className='bg-white' header="Comment" visible={visible} footer={footerContent} onHide={() => { if (!visible) return; setVisible(false); }}
                        style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                        <input type="text" name="comment" id="comment"
                          className="border block min-w-0 grow py-1.5 pr-3 pl-1 w-full" />
                      </Dialog>
                    </div>
                  </div>
                }
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewVlog