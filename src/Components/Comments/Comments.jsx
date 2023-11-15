import React, { useEffect, useState, useRef, useContext } from 'react'
import { addLikeToComment, getAllComments, removeLikeFromComment, subscribeToComments } from '../../Helpers/API';
import AuthenticationContext from '../../Providers/AuthenticationContext';
import CommentCard from '../CommentCard/CommentCard';

const Comments = () => {
    const [comments, setComments] = useState(null);
    const commentsInitialized = useRef(false);

    const { authenticated } = useContext(AuthenticationContext);
    const { user } = useContext(AuthenticationContext);

    useEffect(() => {
        const unsubscribe = subscribeToComments(setComments);
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        async function fetchComments() {
            try {
                const allComments = await getAllComments();
                setComments(allComments);
                commentsInitialized.current = true;
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        }

        if (!commentsInitialized.current) {
            fetchComments();
        }
    }, []);

    const likeButtonClicked = async (id, child) => {
        if (!authenticated) {
            console.log("You are not logged in.");
        } else {
            await addLikeToComment(id, user.uid, child);
        }
    };

    const dislikeButtonClicked = async (id, child = false) => {
        if (!authenticated) {
            console.log("You are not logged in.");
        } else {
            await removeLikeFromComment(id, user.uid, child);
        }
    };

    const replyButtonClicked = (id) => {
        if (!authenticated) {
            console.log("You cannot reply, not logged in.");
        } else {
            console.log(id);
        }
    };

    if (!commentsInitialized.current) {
        return <div>Loading...</div>
    }

    const renderComments = () => {
        return (
                comments.map(comment => (
                    <CommentCard comment={comment} likeButtonClicked={likeButtonClicked} dislikeButtonClicked={dislikeButtonClicked} replyButtonClicked={replyButtonClicked} key={comment.id}/>
                ))
        )
    }

    return (
        <div>
            {
                commentsInitialized.current && (
                    <div>
                        { renderComments() }
                    </div>
                )
            }
        </div>
    )
}

export default Comments
