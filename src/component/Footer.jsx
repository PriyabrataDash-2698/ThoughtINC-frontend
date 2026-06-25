import React from 'react'
import { useEffect, useRef, useState } from "react";


export default function Footer() {
  return (
    <footer className="z-50 bg-glass px-4 py-6 transition-transform duration-300">
      
        <div className="border border-slate-700/50 bg-[#020d2b] rounded-2xl flex flex-col items-center justify-center">
          
          <div className="flex flex-wrap items-center justify-center gap-10 text-gray-400 text-[18px] font-medium">
            <a href="#" className="hover:text-white transition">
              About
            </a>
            <a href="#" className="hover:text-white transition">
              Contact Us
            </a>
            <a href="#" className="hover:text-white transition">
              Products
            </a>
          </div>

          <div className="flex items-center justify-center gap-10 mt-5 text-gray-400 text-4xl">
            <a href="#" className="hover:text-white transition">
              <i className="pi pi-facebook"></i>
            </a>

            <a href="#" className="hover:text-white transition">
              <i className='pi pi-instagram'></i>
            </a>

            <a href="#" className="hover:text-white transition">
              <i className='pi pi-twitter'></i>
            </a>

            <a href="#" className="hover:text-white transition">
              <i className='pi pi-github'></i>
            </a>

            <a href="#" className="hover:text-white transition">
              <i className='pi pi-youtube'></i>
            </a>
          </div>

          <p className="mt-5 text-gray-500 text-[18px] font-bold">
            © 2026 A FalseFire Inc. All rights reserved.
          </p>
        </div>
    </footer>
  );
}