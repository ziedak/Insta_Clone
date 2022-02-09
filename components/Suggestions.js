import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
const Suggestions = () => {
  const [dummyPost, setdummyPost] = useState([])

  useEffect(() => {
    const dummyPost = [...Array(5)].map((_, idx) => ({
      id: idx,
      username: faker.fake('{{name.lastName}} {{name.firstName}}'),
      avatar: faker.image.avatar(),
    }))
    setdummyPost(dummyPost)
  }, [])

  return (
    <div className="mt-4 ml-4">
      <div className="flex justify-between text-sm mb-5">
        <h3 className=" font-bold text-gray-400">Suggestions For you</h3>
        <button className=" font-semibold text-gray-600">See All</button>
      </div>
      {dummyPost.map((sug) => (
        <div key={sug.id} className="flex items-center justify-between mt-3">
          <img
            src={sug.avatar}
            className="h-10 w-10  rounded-full border p-{2px}"
            alt=""
          />

          <div className="flex-1 ml-4">
            <h2 className="text-sm text-semibold ">{sug.username}</h2>
            <h3 className="text-xs text-gray-400">works at home</h3>
          </div>
          <button className="text-sm font-semibold text-blue-400">
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
