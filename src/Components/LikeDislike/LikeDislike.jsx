import React from 'react'
import Plus from '../../assets/images/plus.svg';
import Minus from '../../assets/images/minus.svg';

const LikeDislike = ({ children, likeButtonClicked, dislikeButtonClicked, child }) => {
  return (
    <div className='like-dislike'>
        <button onClick={likeButtonClicked}><img src={Plus} alt="Like this post." /></button>
            <p>{children}</p>
        <button onClick={dislikeButtonClicked}><img src={Minus} alt="Dislike this post." /></button>
    </div>
  )
}

export default LikeDislike
