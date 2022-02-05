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

const Header = () => {
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
            src="data:image/jpeg;base64,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"
            alt="profil pic"
            className="h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
