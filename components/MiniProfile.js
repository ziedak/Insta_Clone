import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const MiniProfile = () => {
  const { data: session } = useSession()
  return (
    <div className="flex  items-center justify-between mt-14 ml-5">
      <img
        src={session?.user?.image}
        alt="profil pic"
        className="h-16 w-16 rounded-full border p-[2px]"
      />
      <div className="flex-1 mx-4 justify-end ">
        <h2 className="text-bold">{session?.user?.username}</h2>

        <h3 className="text-sm text-gray-400">Welcome to Insta</h3>
      </div>
      <button className="text-sm font-semibold text-blue-400" onClick={signOut}>
        Sign Out
      </button>
    </div>
  )
}

export default MiniProfile
