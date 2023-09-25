import { Provider } from 'react-redux';
import App from './app/App';
import { createRoot } from 'react-dom/client';
import { store } from './app/store/store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
);
