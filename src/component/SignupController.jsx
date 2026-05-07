import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { api } from "../config/api";
import { showToast } from "../hook/UseToast";

export default function SignupController({showsignup,setShowsignup}) {
    const [selectedRole, setSelectedRole] = useState(null);
    const roles = [
        { name: 'ADMIN' },
        { name: 'USER' },
    ];
    const handleSignIn = async(e) =>{
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const signUpPayload = {
            name:data.get('userName'),
            email:data.get('email'),
            password:data.get('password'),
            role:selectedRole?.name
        }
        const signup = await api.post("/auth/signup",signUpPayload,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
       if(signup.data){
            showToast({
                severity: 'success',
                summary: 'Success',
                detail: 'Sign UP successfully',
                life: 3000
            });
            setShowsignup(false);
        }
        
    }
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={showsignup}
                modal
                onHide={() => { if (!showsignup) return; setShowsignup(false); }}
                content={({ hide }) => (
                    <div className="px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <form action="" onSubmit={handleSignIn}>
                            <div className="flex justify-between items-center py-2 gap-2">
                            <label className="text-primary-50 font-semibold">
                                Name
                            </label>
                            <InputText id="userName" name="userName" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
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
                        <div className="flex justify-between items-center py-2 gap-2">
                            <label className="text-primary-50 font-semibold">
                                Role
                            </label>
                                <Dropdown value={selectedRole} onChange={(e) => setSelectedRole(e.value)} options={roles} optionLabel="name"
                                    placeholder="Select a Role" className="w-full md:w-14rem" />
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

