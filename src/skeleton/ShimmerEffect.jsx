
import React from 'react'
import { Skeleton } from 'primereact/skeleton';


const ShimmerEffect = () => {
  return (
      <div className="card">
          <div className="border-round shadow-md border-round p-4 surface-card">
              <div className="flex mb-3">
                  <div>
                      <Skeleton width="10rem" className="mb-2"></Skeleton>
                      <Skeleton width="5rem" className="mb-2"></Skeleton>
                      <Skeleton height=".5rem"></Skeleton>
                  </div>
              </div>
              <Skeleton width="100%" height="150px"></Skeleton>
              <div className="flex mt-3">
                 <div>
                      <Skeleton width="10rem" className="mb-2"></Skeleton>
                      <Skeleton width="5rem" className="mb-2"></Skeleton>
                      <Skeleton height=".5rem"></Skeleton>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ShimmerEffect