import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { api } from "../config/api";
import { showToast } from "../hook/UseToast";
import { jwtDecode } from "jwt-decode";

export default function AuthControll({show,setShow,setUsername,setIsloggedin}) {
    // const [visible, setVisible] = useState(false);
    const handleSignIn = async(e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const signInPayload = {
            email:data.get('email'),
            password:data.get('password')
        }
        const token = await api.post("/auth/login",signInPayload,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(token.data.token){
            showToast({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful',
                life: 3000
            });
            setShow(false);
            sessionStorage.setItem("JWT",token.data.token);
            const decoded = jwtDecode(token.data.token);

            setUsername(decoded.name);

            setIsloggedin(true);
        }
        
    }
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={show}
                modal
                onHide={() => { if (!show) return; setShow(false); }}
                content={({ hide }) => (
                    <div className="px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <form action="" onSubmit={handleSignIn}>
                        <div className="flex justify-between items-center py-2 gap-2">
                            <label className="text-primary-50 font-semibold">
                                Email
                            </label>
                            <InputText id="email" name="email" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="flex justify-between items-center py-2 gap-2">
                            <label className="text-primary-50 font-semibold">
                                Password
                            </label>
                            <InputText id="password" name="password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password"></InputText>
                        </div>
                        <div className="py-2 gap-2">
                            <Button label="Sign-In" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                        <div>
                            <Button onClick={(e) => hide(e)}  label="Cancel" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                        </form>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
// onClick={(e) => hide(e)} 
