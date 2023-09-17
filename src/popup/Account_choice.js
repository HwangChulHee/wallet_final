/*global chrome*/
import React, { useEffect, useState } from 'react';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  

// css 모음
import '../css/hch_popup.css'
import '../css/hch_basic.css'
// import { Card, Button, Form} from 'react-bootstrap';
import Sign_request from './Sign_request';
  

function ShortenKey({ keyString }) {
    const maxLength = 10; // 원하는 최대 길이
  
    if (keyString.length <= maxLength) {
      return <span>({keyString})</span>;
    }
  
    const shortenedKey = `${keyString.substring(0, maxLength / 2)}...${keyString.substring(keyString.length - maxLength / 2)}`;
  
    return <span>({shortenedKey})</span>;
  }


  export default function Account_choice() {

    const [choiceAccount, setChoiceAccount] = useState('');
    const [accounts, setAccounts] = useState([]);

    


    useEffect(() => {
        
        // let testAccount = [
        //     {account_name : "철민", publicKey : "EOS212121212121213131232312212121", privateKey : "456"},
        //     {account_name : "현성", publicKey : "EOS4545454545454545454545454545545", privateKey : "456"},
        // ];
        // setAccounts(testAccount);

        // 크롬 스토리지로부터 public key와 계정 이름의 목록을 가져온다.
        chrome.storage.local.get(['accounts'], (result) => {
            const storedData = result.accounts; 
            let updateData = [];
            updateData = storedData;
            
            setAccounts(updateData);
            console.log(updateData);           
          });


    }, [])

    const handleChoiceAccount = (account) => {
        setChoiceAccount(account);
    };

    const handleCloseLogin = () => {
        
        chrome.runtime.sendMessage(
            { action: "login_close"}
        );
    };
  
    return (
        <>
            {/* <div className='card-container'>
                <Card className="text-center" style={{ width: '100%', height: '100%'}}>
                    <Card.Body>
                    <div className="d-flex flex-column justify-content-between h-100" style={{ minHeight: '500px' }}>
                        <div>
                            <h3 className="mb-4">Albatros로 연결</h3>
                            <Card.Text className="mb-4">계정 선택</Card.Text>
                            <div>
                            {accounts.map((account, index) => (
                                <Card key={index} className="mb-2">
                                    <Card.Body className="d-flex align-items-center">
                                        <Form.Check name='radio_account' type="radio" onChange={()=>handleChoiceAccount(account)} checked={choiceAccount === account}/>
                                        <div className='mx-4 d-flex flex-column' style={{ fontSize: '14px', textAlign: 'left' }}>
                                            <div>
                                                {account.account_name} <ShortenKey keyString={account.publicKey} />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                            </div>
                        </div>
                        <div>
                            <div className='mb-3' style={{ fontSize: '12px' }}>
                                신뢰할 수 있는 사이트만 연결하세요.
                            </div>
                            <div className="d-flex justify-content-between">
                                <Button onClick={handleCloseLogin} className="mx-2 btn_primary_outline card-content">취소</Button>
                                <Button onClick={()=>{goTo(Sign_request, {choiceAccount})}} disabled={!choiceAccount} className="mx-2 btn_primary card-content">다음</Button>
                            </div>
                        </div>
                        
                    </div>
                    </Card.Body>
                </Card>
            </div> */}
            <div className='h-flex h-flex-row h-justify-center'>
                <div className='h-popup-container'>
                    <div className='h-h-full h-popup-content'>
                        <div className='h-w-full'>
                            <h2 className='h-text-center h-my-4'>Albatros로 연결</h2>
                            <div className='h-text-center h-mb-8'>
                                계정 선택
                            </div>
                            {accounts.map((account, index) => (
                                <div key={index} className="h-w-full h-mb-3">
                                    <div className='h-flex h-flex-row h-border-test h-p-2'>
                                        <input name='radio_account' type='radio' onChange={()=>handleChoiceAccount(account)} checked={choiceAccount === account}></input>
                                        <div className='h-ml-3 h-flex h-flex-col h-text-left'>
                                            <div className=''>
                                                {account.account_name} <ShortenKey keyString={account.publicKey} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className='h-flex h-flex-col h-w-full h-mb-4'>
                            <div className='h-text-center h-text-xs h-mb-3'>
                                신뢰할 수 있는 사이트만 연결하세요.
                            </div>
                            <div className='h-flex h-flex-row h-w-full'>
                                <button onClick={handleCloseLogin} className='h-grow h-mx-2 h-mb-2'>취소</button>
                                <button onClick={()=>{goTo(Sign_request, {choiceAccount})}} disabled={!choiceAccount} className='h-grow h-mx-2 h-mb-2 '>다음</button>
                            </div>
                            
                        </div>
                    </div>                
                </div>
            </div>
        </>

    )
  }
  