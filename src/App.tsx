
function App({children} : {children: React.ReactNode}) {

  return (
    <main className='h-screen w-screen cellphone-sm:overflow-y-hidden md:overflow-auto 2xl:overflow-auto flex justify-center items-center antialiased'>
      <div className="w-[99%] h-[99%] border border-border rounded-xl">
        {children}
      </div>
    </main>
  )
}

export default App
