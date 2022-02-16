import faker from '@faker-js/faker'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

const dummyPost = [...Array(20)].map((_, idx) => ({
  id: idx,
  username: faker.fake('{{name.lastName}} {{name.firstName}}'),
  avatar: faker.image.avatar(),
  postImg: faker.image.abstract(),
  caption: faker.lorem.words(10),
}))
const Posts = () => {
  const [dummyPost, setdummyPost] = useState([])

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
  //     (snapshot) => {
  //       console.log('snapshot.docs', snapshot.docs)
  //       setdummyPost(snapshot.docs)
  //     }
  //   )

  //   return () => {
  //     unsubscribe()
  //   }
  //   // setdummyPost(dummyPost)
  // }, [db])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => setdummyPost(snapshot.docs)
      ),
    [db]
  )

  return (
    <div>
      {dummyPost.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
