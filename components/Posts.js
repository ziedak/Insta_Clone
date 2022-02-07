import faker from '@faker-js/faker'
import React, { useEffect, useState } from 'react'
import Post from './Post'

const Posts = () => {
  const [dummyPost, setdummyPost] = useState([])

  useEffect(() => {
    const dummyPost = [...Array(20)].map((_, idx) => ({
      id: idx,
      username: faker.fake('{{name.lastName}} {{name.firstName}}'),
      avatar: faker.image.avatar(),
      postImg: faker.image.abstract(),
      caption: faker.lorem.words(10),
    }))
    setdummyPost(dummyPost)
  }, [])

  return (
    <div>
      {dummyPost.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
