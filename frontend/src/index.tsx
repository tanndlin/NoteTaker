import ReactDOM from 'react-dom/client';
import '../globals.css';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);
