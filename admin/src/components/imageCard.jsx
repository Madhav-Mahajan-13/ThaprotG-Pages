/* eslint-disable react/prop-types */

export default function ImageCard(props){
    const {id,title,url,status,handleStatusChange,handleDelete,description} = props;
    return(
        <div className="flex flex-col w-full md:w-xs border-2 border-black rounded-md relative">
            <img src={url} className="w-full border-b-2 border-black"/>
            <h1 className="pl-1 text-lg font-bold border-b-2 border-black text-wrap w-full">{title.toUpperCase()}</h1>
            <p className="pl-1 break-words text-md border-b-2">{description}</p>
            <div className="flex flex-row items-center justify-center gap-x-2 my-2 font-bold">
                {status == 'active' ?
                 <div className="bg-red-500 px-2 py-2 cursor-pointer" onClick={() => {handleStatusChange(id,status)}}>
                    Disable
                </div> 
                : 
                <div className="bg-green-400 px-2 py-2 cursor-pointer" onClick={() => {handleStatusChange(id,status)}}>
                    Enable
                </div>
                }
                <div className="bg-red-500 px-2 py-2 cursor-pointer" onClick={() => {handleDelete(id)}}>
                    Delete
                </div>
            </div>
        </div>
    )
}