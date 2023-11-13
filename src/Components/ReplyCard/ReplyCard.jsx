import React, { useContext } from 'react'
import AuthenticationContext from '../../Providers/AuthenticationContext'

const ReplyCard = ( {onHideReply}) => {
    const { user } = useContext(AuthenticationContext);
    const avatar = user.photoURL;

    const handleReply = () => {

    }

    return (
        <div className="reply-card">
            <div className='reply-avatar'>
                <img className='avatar-image' src={avatar} alt="" />
            </div>
            <div className='reply-body'>
                <textarea>

                </textarea>
            </div>
            <div className='reply-submit'>
                <button className='button' onClick={onHideReply}>REPLY</button>
            </div>
        </div>
  )
}

export default ReplyCard
