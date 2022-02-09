import Image from 'next/image'

import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()
  console.log('session', session)

  return (
    <div className="sticky top-0 shadow-sm border-b bg-white z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid  w-24">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="relative   w-10 lg:hidden flex-shrink-0">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Center */}
        <div className="relative mt-1 p-3  rounded-md max-w-xs">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black "
            type="text"
            placeholder="Search"
          />
        </div>
        {/* Right */}
        <div className="flex items-center justify-end space-x-4 mt-1">
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <HomeIcon className="navBtn" />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />

                <div className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-pulse">
                  30
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user?.image}
                alt="profil pic"
                className="h-10 w-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
