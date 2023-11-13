import React from 'react'
import ReplyArrow from "../../assets/images/reply.svg";

const ReplyButton = ( { replyButtonClicked }) => {
  return (
    <button className='reply-button' onClick={replyButtonClicked}>
        <img src={ReplyArrow} alt="" />
        <p>Reply</p>
    </button>
  )
}

export default ReplyButton
