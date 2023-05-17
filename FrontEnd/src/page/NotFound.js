import React from 'react';
import Header from '../component/Header';

function NotFound() {
  return (
    <>
    <Header/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>  
    <div class="notfound" style={{ textAlign: 'center' }}>
        <div class="notfound-404">
        <h1 style={{fontSize: '300px'}}>4<span style={{color: '#537557'}}>0</span>4</h1>
        </div>
        <h2>the page you requested could not found</h2><br></br>
        <a class="btn btn-outline-primary" style={{borderColor: '#537557', color: '#537557'}} href="/dashboard" role="button">Back to Dashbaord</a>
    </div>
    </div>
    </>
  );
}

export default NotFound;