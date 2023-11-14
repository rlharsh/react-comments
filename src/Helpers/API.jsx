// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, onSnapshot, getDoc, doc, arrayRemove, getDocs, getFirestore, collection, query, where, updateDoc, arrayUnion } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMBx7wvTiot4PD7tchiCw7C5vaeyv6OYY",
  authDomain: "react-comments-bcd85.firebaseapp.com",
  projectId: "react-comments-bcd85",
  storageBucket: "react-comments-bcd85.appspot.com",
  messagingSenderId: "638169391342",
  appId: "1:638169391342:web:41eee1c53d011b5e5e13ff",
  measurementId: "G-938TW3BZK0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const commentCollectionRef = collection(db, "comments");

export async function getAllComments() {
  const snapshot = await getDocs(commentCollectionRef);
  const comments = snapshot.docs.map((doc) => {
    const comment = doc.data();
    comment.id = doc.id;
    return comment;
  });
   return comments;
}

export async function getAllReplies(id) {
  const replyCollectionRef = collection(db, "replies");
  const q = query(replyCollectionRef, where("parent_id", "==", id));

  try {
    const querySnapshot = await getDocs(q);
    const replies = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return replies;
  } catch (error) {

  }
}

export async function addLikeToComment(id, uid, child) {
  try {
    const commentDocRef = !child ? doc(db, 'comments', id) : doc(db, 'replies', id);
    await updateDoc(commentDocRef, {
      likes: arrayUnion({ uid: uid })
    })
  } catch (error) {
    console.error("Error adding a like: ", error);
  }
}

export async function addResponseToComment(id, user, child, message) {
  try {
    const data = {
      author: user.displayName,
      avatar: user.photoURL,
      comment_text: message,
      date: new Date(),
      likes: [],
      parent_id: id,
      replies: []
    }

    const replyCollectionRef = collection(db, 'replies');
    const res = await addDoc(replyCollectionRef, data);

  } catch (error) {
    console.error('Error: ', error);
  }
}

export async function removeLikeFromComment(id, uid, child) {
  try {
    const commentDocRef = !child ? doc(db, 'comments', id) : doc(db, 'replies', id);
    const commentDoc = await getDoc(commentDocRef);
    if (commentDoc.exists()) {
      const currentLikes = commentDoc.data().likes;
      const newLikes = currentLikes.filter(like => like.uid !== uid);

      await updateDoc(commentDocRef, {
        likes: newLikes
      })
    }
  } catch (error) {
    console.error("Error removing like: ", error);
  }
}

export function subscribeToComments(callback) {
  const unsubscribe = onSnapshot(commentCollectionRef, (snapshot) => {
    const updatedComments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(updatedComments);
  }, (error) => {
    console.error("Error subscribing to comments:", error);
  });

  return unsubscribe;
}
export { app };
