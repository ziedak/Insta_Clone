import React from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
const Post = ({ post }) => {
  const { id, username, avatar, postImg, caption } = post
  return (
    <div>
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={avatar}
          alt=""
          className="rounded-full w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={postImg} alt="" className="object-cover w-full" />
      {/* Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex  space-x-4  ">
          <HeartIcon className="actionBtn" />
          <ChatIcon className="actionBtn" />
          <PaperAirplaneIcon className="actionBtn" />
        </div>
        <BookmarkIcon className="actionBtn" />
      </div>
      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>
      {/* comments */}
      {/* input Box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          className="border-none flex-1 focus:ring-0 outline-none"
          placeholder="Add Comment ..."
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  )
}

export default Post
