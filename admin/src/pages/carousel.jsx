/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import ImageCard from '../components/imageCard';
import {loremIpsum} from 'lorem-ipsum'
export default function Carousel(){
    const [imList,setImlist] = useState([]);
    
    useEffect(() => {
        const images = []
        for(let i = 0;i<10;i++){
            images.push({
                title:loremIpsum(),
                url:"https://picsum.photos/200"
            })
        }
        setImlist(images);
    },[])

    return(
        <div className="flex flex-col md:flex-row flex-wrap w-full gap-x-5 items-center justify-center mt-24 md:mt-5 gap-y-5 px-5 md:px-2">
            {
                imList.map((elem,index) => {
                    return <ImageCard title={elem.title} url={elem.url} key={index} />
                })
            }
        </div>
    )
}