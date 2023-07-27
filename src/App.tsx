import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/routes/router'
import GlobalStyle from '@/style/GlobalStyle'

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}

export default App
