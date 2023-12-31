/*global chrome*/
import React, { useState, useEffect } from 'react';
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';
import { BrowserRouter, Route,Routes} from 'react-router-dom';

import Main from './Main'

import Welcome from './pages/welcome';
import Header from './pages/header';
import Test from './pages/test'
import Create_password from './pages/wallet_create/create-password';




import './App.css';
import Import_with_recovery_phrase from './pages/wallet_import/import-with-recovery-phrase';
import Import_create_password from './pages/wallet_import/import-create-password';
import PopupComponent from './popup/PopupComponent';
import Sign_request_transaction from './popup/Sign_request_transaction';

function App() {

  const [request, setRequest] = useState('');
  const [componentsToRender, setComponentsToRender] = useState([]);

  // // 로컬 저장소로부터 상태를 받아온다.
  useEffect(() => {
    
    chrome.storage.local.get(['request_state'], (result) => {
      const storedData = result.request_state; 
      setRequest(storedData);
      
      console.log(storedData)

      if(storedData == "init") {
        let updateData = [];
        updateData.push(<Header />); 
        updateData.push(<Router><Welcome /></Router>);
        setComponentsToRender(updateData);

      } else if(storedData == "dapp_login") {
        let updateData = [];
        updateData.push(<PopupComponent/>);
        setComponentsToRender(updateData);

      } else if(storedData == "dapp_trx") {
        let updateData = [];
        updateData.push(<Sign_request_transaction/>);
        setComponentsToRender(updateData);
        
      } else if(storedData == "main") {
        let updateData = [];
        updateData.push(<BrowserRouter><Main/></BrowserRouter>);
        setComponentsToRender(updateData);
      }
      
    });

    // let updateData = [];
    // updateData.push(<Header />); 
    // updateData.push(<Router><Welcome /></Router>);
    // setComponentsToRender(updateData);

    // let updateData = [];
    // updateData.push(<BrowserRouter><Main/></BrowserRouter>);
    // setComponentsToRender(updateData);

    // let updateData = [];
    // updateData.push(<PopupComponent/>);
    // setComponentsToRender(updateData);


  }, []);



  
  
  return (
    <>
      {
        componentsToRender
      }      
    </>
  );
}

export default App;
