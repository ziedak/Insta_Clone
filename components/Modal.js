import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useSession } from 'next-auth/react'
import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { db, storage } from '../firebase'
const Modal = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const filePickerRef = useRef(null)
  const captionRef = useRef('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const uploadPost = async (e) => {
    //create Post add to fire storage
    //get the post id for newly created post
    //upload image to firebase storage with post id
    //get download url from firebase storage
    //update orignal post with image
    e.preventDefault()

    if (!captionRef.current.value) return
    if (loading) return

    setLoading(true)
    // try {
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session?.user?.username,
      caption: captionRef.current.value,
      avatar: session.user.image,
      timestamp: serverTimestamp(),
    }).then(async (dc) => {
      if (selectedFile) {
        //upload imageToPost
        const uploadtask = ref(storage, `posts/${dc.id}/image`)
        await uploadString(uploadtask, selectedFile, 'data_url').then(
          async () => {
            //on upload complete

            const storageRef = ref(storage, `posts/${dc.id}/image`)

            await getDownloadURL(storageRef).then(async (url) => {
              console.log('url', url)

              let postRef = doc(db, 'posts', dc.id)

              // Set the "imageUrl" field of the post
              await updateDoc(postRef, {
                postImage: url,
              })

              console.log(postRef)
            })
          },
          (error) => console.log('Error upload image: ', error)
        )
      }
    })
    //console.log("Document written with ID: ", docRef.id);
    // }
    // catch (e) {
    // 	console.error("Error adding document: ", e);
    // }
    setOpen(false)
    setLoading(false)
    setSelectedFile(false)
    captionRef.current.value = ''
  }
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 xs:block xs:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen "
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl  transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {/* upload icon */}
                  {selectedFile ? (
                    <div>
                      <img
                        src={selectedFile}
                        alt=""
                        onClick={() => setSelectedFile(null)}
                        className="w-full object-contain cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="flex mx-auto items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                      <CameraIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                        onClick={() => filePickerRef.current.click()}
                      />
                    </div>
                  )}

                  {/* title */}

                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        New Post
                      </Dialog.Title>

                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>

                    {/* caption */}
                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        placeholder="Please enter a caption"
                        ref={captionRef}
                      />
                    </div>
                  </div>

                  {/* button upload */}

                  <div className="mt-5 sm:mt-6">
                    <button
                      disabled={loading}
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      onClick={(e) => uploadPost(e)}
                    >
                      {!loading ? ' Upload New Post' : 'Loading...'}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Modal
