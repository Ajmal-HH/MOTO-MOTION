import MessageInput from "./MessageInput"
import Messages from "./Messages"
import {TiMessage} from 'react-icons/ti'

function MessageContainer() {
    const noChatSelcted = true 
  return (
    <div className="md:min-w-[450px] flex flex-col">
   {noChatSelcted ? <NoChatSelected /> : (
       <>
       <div className="bg-slate-500 px-4 py-2 mb-2">
         <span className="label-text">T0 : </span> <span className="text-gray-900 font-bold">Abin</span>
       </div>
       <Messages />
       <MessageInput />
       </>
   )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () =>{
return (
    <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col
        items-center gap-2">
            <p>Welcome Ajmal </p>
            <p>select a chat to start messaging</p>
            <TiMessage className="text-3xl md:text-6xl text-center" />
        </div>
    </div>
)
}
