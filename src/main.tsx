import {createRoot} from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import './i18n/config'

// Importing the main application component and rendering it into the root element
createRoot(document.getElementById("root")!).render(<App />);