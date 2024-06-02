
function App({children} : {children: React.ReactNode}) {

  return (
    <main className='h-screen w-screen flex justify-center items-center antialiased'>
      <div className="w-[99%] h-[99%] border border-border rounded-xl">
        {children}
      </div>
    </main>
  )
}

export default App
