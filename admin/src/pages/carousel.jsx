/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import ImageCard from '../components/imageCard';
import {loremIpsum} from 'lorem-ipsum'
import {MyContext} from '../context/myContext';
import {toast,ToastContainer} from 'react-toastify';


export default function Carousel(){
    const [imList,setImlist] = useState([]);
    const [imToShow,setImToShow] = useState(imList);
    const {backendHost,toastOptions} = useContext(MyContext);
    const [selected,setSelected] = useState('all');    

    useEffect(() => {
        const API_CALL = async () => {
            const res = await fetch(backendHost + '/api/admin/viewCarousel',{});

            const data = await res.json();

            if(!data.success){
                toast.error(data.message,toastOptions);
            }
            else{
                setImlist(data.data);
                setImToShow(data.data);
            }

        }
        API_CALL();    
    },[])

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    useEffect(() => {
        const filtered = imList.filter((elem) => {
            return(
                selected == 'all' || elem.status == selected
            )
        })

        setImToShow(filtered);
    },[selected,imList])
    
    const handleStatusChange = async (id,status) => {
        try {
            const res = await fetch(backendHost + '/api/admin/' + (status == 'active' ? 'suspendCarousel' : 'activeCarousel'),{
                method:"POST",
                body:JSON.stringify({
                    id:id
                }),
                headers:{
                    "Content-Type" : 'application/json'
                }
            });
    
            const data = await res.json();
    
            if(!data.success){
                toast.error(data.message,toastOptions);
            }
            else{
                setImlist(prevList => 
                    prevList.map(item => 
                        item.id === id ? { ...item, status: status === 'active' ? 'suspended' : 'active' } : item
                    )
                );
                
                toast.success("Status Updated",toastOptions);
            }
        } catch (err) {
            toast.error(err.message,toastOptions);
        }
        
    }

    const handleDelete = async(id) => {
        try{
            const res = await fetch(backendHost + '/api/admin/deleteCarousel',{
                method:"POST",
                body:JSON.stringify({
                    id:id
                }),
                headers:{
                    "Content-Type" : 'application/json'
                }
            });
    
            const data = await res.json();
    
            if(!data.success){
                toast.error(data.message,toastOptions);
            }
            else{
                setImlist(prevList => prevList.filter(item => item.id !== id));

                toast.success("Carousel Entry Deleted",toastOptions);
            }
        }catch(err){
            toast.error(err.message,toastOptions);
        }
    }

    return(
        <div className='flex flex-col gap-y-5'>
        <ToastContainer/>
        <div className='flex flex-row gap-x-4 items-center justify-center'>
            <label htmlFor='dropdown'>Filter Carousel Images</label>
            <select id='dropdown' onChange={handleChange} value={selected} className='border-2 border-black px-2'>
                <option value='all'>All</option>
                <option value='active'>Active</option>
                <option value='suspended'>Suspended</option>
            </select>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-full gap-x-5 items-center justify-center mt-24 md:mt-5 gap-y-5 px-5 md:px-2">
            {
                imToShow.map((elem,index) => {
                    return <ImageCard title={elem.title} url={backendHost + '/' + elem.image_path} id = {elem.id} status={elem.status} key={elem.id} handleStatusChange = {handleStatusChange} handleDelete = {handleDelete} />
                })
            }
        </div>
        </div>
    )
}