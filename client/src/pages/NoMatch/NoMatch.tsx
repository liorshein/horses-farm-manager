import { Link } from "react-router-dom"

const NoMatch = () => {
  return (
    <section className="w-screen h-screen flex flex-col items-center">
      <div className='w-full h-1/3 bg-horse bg-center bg-no-repeat'></div>
      <h1 className='text-9xl font-bold'>404</h1>
      <h3 className='text-3xl'>Hold your horses</h3>
      <h3 className='text-3xl font-bold'>page error!</h3>
      <Link className='mt-4 text-xl hover:underline' to={"/login"}>Return home</Link>
      <div className='w-full h-1/3 bg-horse bg-center bg-no-repeat'></div>
    </section >
  )
}

export default NoMatch