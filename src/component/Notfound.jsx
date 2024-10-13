import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../css/NotFound.css'

const Notfound = () => {

    const navigate = useNavigate(); 
  
    const handleGoBack = () => {
      navigate(-1); 
    };


    return (
        <div className="NFcontainer">
          <h1 className="NFheading">404</h1>
          <p className="NFmessage">We couldn't find the page you are looking for.</p>
          <button className="NFbutton" onClick={handleGoBack}>Go back to previous page</button>
        </div>
      );
    };

    
export default Notfound;
