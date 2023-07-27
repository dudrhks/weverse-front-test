import { createBrowserRouter } from 'react-router-dom'

import Detail from '@/pages/Detail'
import Root from '@/pages/Root'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/:id',
    element: <Detail />,
  },
])
