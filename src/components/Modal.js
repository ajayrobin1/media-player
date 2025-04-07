
const  Modal = ({ isOpen, onClose, movieLinkList, setVideoUrl, setLoading }) => {
    if (!isOpen) return null;

    const handleClick = async (e) =>{

    const data = { 'torrentLink': e.target.value}

    onClose() //close the modal
    setLoading(true)

  await fetch('http://localhost:8080/addTorrent', {
      method:'post',
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data)
    })

    setVideoUrl('http://localhost:8080/video');
        setLoading(false)
   
  }
  
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-opacity-60 backdrop-blur-sm">
      <div className=" bg-gray-900 p-6 rounded-sm shadow-lg w-1/2 h-7/8 text-white overflow-y-auto scrollbar1">
        <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">Select a video file</h2>
        <button 
          onClick={onClose} 
          className="bg-red-600 text-white px-6 py-1 font-sm mb-3 rounded-sm hover:bg-red-700 transition"
          >
          close
        </button>
            </div>
        <ul className="space-y-2">
          {movieLinkList.map((item, index) => (
            <li key={index}>
              <button 
                value={item.link} 
                className="text-gray-300 hover:underline py-2 cursor-pointer"

                onClick={handleClick}
              >
                {item.title}
              </button>
              <hr className="text-gray-600" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
  };

  export default Modal;