import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'

function App() {
  return (

    
    <div className='h-full w-full relative'>

      {/* <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'></div> */}
<div
  className="absolute inset-0 -z-10 h-full w-full px-5 py-24
  [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#00FF9D80_100%)]"
/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<NoteDetailPage/>}/>
      </Routes>
      </div>

  )
}

export default App