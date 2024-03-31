import React from 'react'
import ReactDOM from 'react-dom/client'
import ParentComponent from './MainPage.jsx'
import HelloPage from './Hello.jsx'
import NavBar from './NavBar.jsx'
import Stack from './Stack.jsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <NavBar />
        <HelloPage />
        <Stack />
        {/* <ParentComponent /> */}
    </React.StrictMode>,
  );
