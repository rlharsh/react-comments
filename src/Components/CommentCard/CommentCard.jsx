import React, { useState, useContext, useEffect, useRef } from 'react'
import LikeDislike from '../LikeDislike/LikeDislike';
import ReplyButton from '../ReplyButton/ReplyButton';
import AuthenticationContext from '../../Providers/AuthenticationContext';
import { getAllReplies, subscribeToReplies } from '../../Helpers/API';
import ReplyCard from '../ReplyCard/ReplyCard';

const CommentCard = ({ comment, likeButtonClicked, dislikeButtonClicked, replyButtonClicked, child = false}) => {

    const date = comment.date;
    const author = comment.author;
    const likes = comment.likes;
    const avatar = comment.avatar;
    const comment_text = comment.comment_text;
    const clean_date = new Date(date.seconds * 1000);

    const [replyShowing, setReplyShowing] = useState(false);
    const { authenticated } = useContext(AuthenticationContext);
    const { user } = useContext(AuthenticationContext);
    const [replies, setReplies] = useState([]);

    const repliesLoaded = useRef(false);

    useEffect(() => {
        const unsubscribe = subscribeToReplies(comment.id, setReplies);
        return () => unsubscribe();
    }, [comment.id]);

    const replyToComment = () => {
        if (authenticated) {
            setReplyShowing(true);
        } else {
            console.log("You cannot reply, not authenticated.");
        }
    };

    const hideReply = () => {
        setReplyShowing(false);
    }

    useEffect(() => {
        async function getReplies() {
            const allReplies = await getAllReplies(comment.id);
            setReplies(allReplies);
            repliesLoaded.current = true;
        }
        getReplies();
    }, [])


    return (
        <div className='comment-container'>
            <div key={comment.id} className='comment-card'>
                <div className='comment-card__header'>
                    <div className='comment-card__photo'>
                        <img src={avatar} alt={`${author} avatar picture.`} />
                        <h2>{author}</h2>
                        {
                            authenticated && user?.uid === comment.uid ? <div className="user-slug">
                                you
                            </div> : null
                        }
                    </div>
                    <p>{clean_date.toLocaleString()}</p>
                </div>
                <div className="comment-card__body">
                    {comment_text}
                </div>
                <div className='comment-card__footer'>
                    {
                      <LikeDislike likeButtonClicked={() => likeButtonClicked(comment.id, child)} dislikeButtonClicked={() => dislikeButtonClicked(comment.id, child)}>
                            {likes.length}
                    </LikeDislike>
                    }
                    {
                        <ReplyButton replyButtonClicked={() => replyToComment()}/>
                    }
                </div>
            </div>
            {
                replyShowing && <ReplyCard onHideReply={hideReply} parentId={comment.id} />
            }
            <div className='comment-replies'>
            {
                repliesLoaded.current &&
                    <div className='replies-container'>
                        {
                            replies.map(reply => {
                            return (
                                <CommentCard comment={reply} likeButtonClicked={likeButtonClicked} dislikeButtonClicked={dislikeButtonClicked} replyButtonClicked={replyButtonClicked} key={comment.id} child/>
                            )
                            })
                        }
                    </div>
            }
        </div>
    </div>
    )
}

export default CommentCard
