import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../../utils/extractTime";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    
    // Safety check for message
    if (!message) {
        console.error("Message is undefined");
        return null;
    }
    
    // Debug logs
    console.log("authUser:", authUser);
    console.log("authUser._id:", authUser?._id);
    console.log("message:", message);
    console.log("message.senderId:", message._id);
    console.log("message.sender:", message.sender);
    
    // Handle different possible structures for sender ID
    const messageSenderId = message.senderId || message.sender?._id || message.sender;
    const authUserId = authUser?._id;
    
    const fromMe = messageSenderId === authUserId;
    const formattedTime = extractTime(message.createdAt || new Date());
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    
    // Handle profile picture - use a default avatar from your assets
    const profilePic = fromMe ? 
        (authUser?.profilePic || "/src/assets/avatar.png") : 
        (message.sender?.profilePic || "/src/assets/avatar.png");
    
    const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";
    const textColor = "text-white";
    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        alt="Profile" 
                        src={profilePic}
                        onError={(e) => {
                            e.target.src = "/src/assets/avatar.png";
                        }}
                    />
                </div>
            </div>
            <div className={`chat-bubble ${textColor} ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.text || "No message content"}
                {message.image && (
                    <img 
                        src={message.image} 
                        alt="Message attachment" 
                        className="mt-2 rounded max-w-xs"
                    />
                )}
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;