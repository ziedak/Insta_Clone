import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header'
const signin = ({ providers }) => {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-content max-h-screen py-2 mt-40 px-14  text-center">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
        <p className="font-xs text-center">this is insta clone</p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const providers = await getProviders()
  return { props: { providers } }
}

export default signin
