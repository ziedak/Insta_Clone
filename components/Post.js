import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { db } from '../firebase'
const Post = ({ post }) => {
  const { username, avatar, postImage, caption } = post.data()
  const { id } = post

  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  // fetch likes
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  // fetch comments
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      avatar: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }
  return (
    <div className="border-gray-200 border mt-5 bg-white">
      {/* Header */}
      <div className="flex items-center p-3">
        <img
          src={avatar}
          alt=""
          className="rounded-full w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={postImage} alt="" className="object-cover w-full" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex  space-x-4  ">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="actionBtn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="actionBtn" />
            )}
            <ChatIcon className="actionBtn" />
            <PaperAirplaneIcon className="actionBtn" />
          </div>
          <BookmarkIcon className="actionBtn" />
        </div>
      )}

      <p className="p-5 truncate">
        {/* nb likes  */}
        {likes.length > 0 && (
          <p className=" font-bold mb-1">{likes.length} likes</p>
        )}

        {/* caption */}
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll  scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().avatar}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-1">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>

              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input Box */}
      {session && (
        <form className="flex items-center p-4 border-t">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none"
            placeholder="Add Comment ..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
