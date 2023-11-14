import React, { useContext, useState } from 'react'
import AuthenticationContext from '../../Providers/AuthenticationContext'
import { addResponseToComment } from '../../Helpers/API';

const ReplyCard = ( { onHideReply, parentId }) => {
    const { user } = useContext(AuthenticationContext);
    const avatar = user.photoURL;
    const [responseMessage, setResponseMessage] = useState(null);

    const handleReplyChange = (e) => {
        setResponseMessage(e.target.value);
    }

    const handleReply = async () => {
        await addResponseToComment(parentId, user, false, responseMessage);
        onHideReply();
    }

    return (
        <div className="reply-card">
            <div className='reply-avatar'>
                <img className='avatar-image' src={avatar} alt="" />
            </div>
            <div className='reply-body'>
                <textarea onChange={handleReplyChange}>

                </textarea>
            </div>
            <div className='reply-submit'>
                <button className='button' onClick={handleReply}>REPLY</button>
            </div>
        </div>
  )
}

export default ReplyCard
