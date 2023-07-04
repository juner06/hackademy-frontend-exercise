import React from 'react'
import ReactDOM from 'react-dom/client'
import { ListAll } from './components/ListAll';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListAll />
  </React.StrictMode>,
)
