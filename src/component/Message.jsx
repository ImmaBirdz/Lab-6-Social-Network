import React, { useState, useEffect, useContext, useRef } from 'react';
import { LoginContext } from '../variable/LoginContext';
import { db } from '../backend/firebaseConfig';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import '../css/Message.css';
import { TabTitle } from './TabTitle';

const Message = () => {
    const { loginID, selectedFriend } = useContext(LoginContext);
    const [inputText, setInputText] = useState('');
    const [loginData, setLoginData] = useState({});
    const [selectedFriendData, setSelectedFriendData] = useState({});
    const [chatID, setChatID] = useState(null);
    const [chatData, setChatData] = useState([]);

    const chatRef = useRef(null); // Ref for chat container

    // Tab Title
    useEffect(() => {
        TabTitle('Message | Black Cat with Bow');
    }, []);
    
    // set scroll to bottom of chat container
    useEffect(() => {
        if (chatRef.current) { // scroll to bottom
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatData, chatRef]);

    // Fetch Login data
    useEffect(() => {
        const fetchLoginData = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === loginID) {
                    setLoginData(doc.data());
                }
            });
        }

        fetchLoginData();
    }, [loginID]);

    // Fetch Selected Friend data
    useEffect(() => {
        const fetchSelectedFriendData = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === selectedFriend) {
                    setSelectedFriendData(doc.data());
                }
            });
        }

        fetchSelectedFriendData();
    }, [selectedFriend]);

    // Find Chat ID between Login and Selected Friend
    useEffect(() => {
        const findChatID = async () => {
            const chatCollection = collection(db, 'chats');

            const q1 = query(chatCollection, where('user1', '==', loginID), where('user2', '==', selectedFriend));
            const q2 = query(chatCollection, where('user1', '==', selectedFriend), where('user2', '==', loginID));

            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);

            // Combine the two query snapshot
            const allSnapshots = [...querySnapshot1.docs, ...querySnapshot2.docs];

            if (allSnapshots.length === 0) {
                // Create a new chat
                const newChat = await addDoc(chatCollection, {
                    user1: loginID,
                    user2: selectedFriend
                });
                setChatID(newChat.id);
            } else {
                allSnapshots.forEach(doc => {
                    setChatID(doc.id);
                });
            }

        }
        findChatID();
    }, [loginID, selectedFriend]);


    // Chat Data
    useEffect(() => {
        if (inputText.length > 0) return;
        const fetchChatData = async () => {
            const chatCollection = collection(db, 'chats', chatID, 'texts');
            const chatSnapshot = await getDocs(chatCollection);
            setChatData([]);
            chatSnapshot.forEach(doc => {
                setChatData(prevChat => [...prevChat, doc.data()]);
            });
            // sort chat data by when
            setChatData(prevChat => prevChat.sort((a, b) => a.when - b.when));
        }
        
        if (chatID) {
            fetchChatData();
        }
    }, [chatID, inputText]);

    // Send Message
    const handleSubmitText = async () => {
        console.log('Input Text: ', inputText);
        if (inputText) {
            const chatCollection = collection(db, 'chats', chatID, 'texts');
            const newMessagePayload = {
                text: inputText,
                from: loginID,
                when: serverTimestamp()
            }

            await addDoc(chatCollection, newMessagePayload).then(() => {
                // clear input text
                setInputText('');
            });
        }
    }

    // Handle Enter Key
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmitText();
        }
    }
    
    return (
        <div>
            <div className="message-container">
                {/* Chat Area (Middle Section) */}
                <main className="feed">
                    {
                        selectedFriend ? (
                        <>
                            {/* Msg Header Section */}
                            <div className="msg-header">
                                <div className="container1">
                                    <img src={selectedFriendData.profile_pic} className="msgimg" alt={selectedFriendData.username} />
                                    <div className="active">
                                        <p>{selectedFriendData.display_name}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Chat Inbox */}
                            <div className="chat-page">
                                <div className="msg-inbox">
                                    <div className="chats" ref={chatRef}>
                                        {/* Message Container */}
                                        <div className="msg-page">
                                            {
                                                Array.isArray(chatData) && chatData.map((msg, index) => (
                                                    <div key={index} className={msg.from === loginID ? 'my-message' : 'friend-message' }>
                                                        <p className="message">{msg.text}</p>
                                                        <div className="message-time">{new Date(msg.when.seconds * 1000).toLocaleString()}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {/* Msg Bottom Section */}
                                    <div className="msg-bottom">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Write message..." 
                                                value={inputText} 
                                                onChange={(e) => setInputText(e.target.value)}
                                                onKeyDown={(e) => handleEnterKey(e)}
                                            />
                                        </div>
                                        <div className="send" value={inputText} onClick={handleSubmitText}>
                                            <img src="https://img.icons8.com/dotty/80/filled-sent.png" alt="Send-arrow" className="send-arrow" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        ) : (
                            <div className="no-chat">
                                <h1>No chat selected</h1>
                            </div>
                        )
                    }
                </main>
            </div>
        </div>
    );
};

export default Message;
