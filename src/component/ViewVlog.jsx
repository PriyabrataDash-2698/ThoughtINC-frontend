import React, { useEffect, useState } from 'react'
import { api } from '../config/api'

const ViewVlog = () => {

const [vlogs, setVlogs] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/thoughtINC/allVlogs");
      setVlogs(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);
return(
  <div>
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Admin blog Dashboard</h2>
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

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-white"
                  >
                  Reject
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Approve
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </div>
)
}

export default ViewVlog