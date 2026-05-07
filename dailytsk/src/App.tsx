import { useState } from 'react'
import ToDo from './components/ToDo'
import { FilterContext } from './components/FilterContext'

function App() {
  return (
    <>
      <ToDo />
      <FilterContext />
    </>
  )
}

export default App
