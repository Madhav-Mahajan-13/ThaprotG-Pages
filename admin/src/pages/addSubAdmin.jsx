/* eslint-disable no-unused-vars */
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import {toast,ToastContainer} from 'react-toastify'
import {MyContext} from '../context/myContext';
import { useContext } from 'react';

const Input = tw.input`
    shadow-inner
    px-4
    py-1
    border-black
    border-2
    rounded-md
    focus:outline-none
    focus:ring-1
    focus:ring-blue-600
`

const InpDiv = tw.div`
    flex
    flex-col
    mb-3
`

export default function AddSubAdmin() {

    const {backendHost,toastOptions} = useContext(MyContext);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [department,setDept] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(name,email,department);

        const res = await fetch(backendHost + '/api/admin/createsubadmin',{
            method:"POST",
            body:JSON.stringify({
                name:name,
                email:email,
                department:department
            }),
            headers:{
                "Content-Type" : 'application/json'
            },
			'credentials' : 'include'
        })

        const data = await res.json();

        if(!data.success){
            toast.error(data.message,toastOptions);
        }
        else{
            toast.success("Successfull !",toastOptions);
        }
    }

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen w-full">
      <div className="bg-white px-10 md:pd-20 py-10 w-2xl md:w-3/4 shadow-2xl max-w-md">
        <h3 className="text-3xl font-bold text-center">Add Sub Admin</h3>
        <form className="mt-10" onSubmit={handleSubmit}>
          <InpDiv>
            <label className="block" htmlFor="name">
              Name
            </label>
            <Input id="name" type="text" placeholder='Enter Name' onChange = {(e) => {setName(e.target.value)}}/>
          </InpDiv>

          <InpDiv>
            <label className="block" htmlFor="email">
              Email
            </label>
            <Input id="email" type="text" placeholder='Enter Email' onChange = {(e) => {setEmail(e.target.value)}} />
          </InpDiv>

          <InpDiv>
            <label className="block" htmlFor="department">
              Department
            </label>
            <Input id="department" type="text" placeholder="Enter Department" onChange = {(e) => {setDept(e.target.value)}} />
          </InpDiv>

            <div className='text-center'>
          <button type='submit' className='bg-green-500 text-white px-4 py-1 m-auto rounded-md hover:bg-blue-900 focus:ring-2 mt-4 w-full'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}