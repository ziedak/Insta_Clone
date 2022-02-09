import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './story'
import { useSession } from 'next-auth/react'
const Stories = () => {
  const { data: session } = useSession()
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, idx) => ({
      ...faker.helpers.contextualCard(),
      id: idx,
    }))
    setSuggestions(suggestions)
  }, [])

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  )
}

export default Stories
