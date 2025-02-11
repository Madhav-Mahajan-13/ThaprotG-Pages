/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function AdminCard({ user ,handleUserChange}) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white w-80">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">ID: {user.id}</p>
            
            <div className="mt-3 space-y-2">
                <p><strong>User ID:</strong> {user.user_id}</p>
                <p><strong>Type:</strong> {user.type}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-white 
                        ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {user.status}
                    </span>
                </p>
                <p className="text-gray-400 text-sm">Created At: {new Date(user.created_at).toDateString()}</p>
            </div>
            <div className="flex items-center justify-center border-t-2 border-black">
        <button className={"px-1 py-2 cursor-pointer " + "bg-" + (user.status=='suspended' ? "green-" : "red-") + '500 w-full' } onClick={(e) => handleUserChange(user.user_id,user.status)}>{user.status =='suspended' ? "Activate" : "Suspend"}</button>
      </div>
        </div>
    );
}
