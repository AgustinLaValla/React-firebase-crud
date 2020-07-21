import React from 'react';
import './App.css';
import { Contact } from './components/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    <div className="row">
      <div className="col-md-10 mx-auto">
        <Contact />
      </div>
      <ToastContainer />
    </div>

  );
}

export default App;
