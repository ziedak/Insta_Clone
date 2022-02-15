import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'
export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50  scrollbar-thin scrollbar-thumb-black">
      <Head>
        <title>Insta Clone By Zied ak</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* header */}
      <Header />
      {/* Feed */}
      <Feed />
      {/* Modal */}

      <Modal />
    </div>
  )
}
