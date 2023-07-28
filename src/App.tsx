import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { router } from '@/routes/router';
import GlobalStyle from '@/style/GlobalStyle';

import { persistor, store } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
