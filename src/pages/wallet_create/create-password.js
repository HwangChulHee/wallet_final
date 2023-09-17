/*global chrome*/
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
import React, { useState } from 'react';

// css 모음
import '../../css/hch_card.css'
import '../../css/hch_basic.css'

import Review_recovery_phrase1 from './review-recovery-phrase1';

export default function Create_password() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
  };

  const handleAgreementChange = () => {
      setAgreementChecked(!agreementChecked);
  };

  const handleCreatePassword = () => {
    console.log("새 지갑 생성 버튼 누르기")
    chrome.runtime.sendMessage(
        { action: "password_store", password: password}
    );
    goTo(Review_recovery_phrase1);    
  };

  const isButtonDisabled = !password || password !== confirmPassword || !agreementChecked;

    return (
    
    <>
    {/* <div className='card-container'>
      <Card className="text-center" style={{ width: '30rem' }}>
        <Card.Body>
          <h3 className='mb-2'>비밀번호 생성</h3>
          
          <Card.Text className='mb-5'>
            이 비밀번호는 이 기기에서만 알바트로스 지갑의 잠금을 해제합니다. 알바트로스는 이 비밀번호를 복구할 수 없습니다.
          </Card.Text>

          
          <div className="mb-3 mx-5 input-content">
            <Form.Label htmlFor="password">새 비밀번호</Form.Label>
            <InputGroup className='my-input'>
              <Form.Control
                type='password'
                value={password}
                onChange={handlePasswordChange}
              />              
            </InputGroup>
          </div> 

          <div className="mb-5 mx-5 input-content">
            <Form.Label htmlFor="password">비밀번호 확인</Form.Label>
            <InputGroup className='my-input'>
              <Form.Control
                type='password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />              
            </InputGroup>
            {password !== confirmPassword && (
              <div className="mt-2 text-danger form_check_div">비밀번호가 일치하지 않습니다.</div>
            )}
          </div>         

          
          <div className='form_check_div'>
            <Form className='mx-5 mb-2 my-input'>
              <Form.Check className='mx-2' aria-label="option 1" label="알바트로스가 이 비밀번호를 복구할 수 없음을 이해합니다." 
              checked={agreementChecked}
              onChange={handleAgreementChange}/>
            </Form>
          </div>

                
          <Button onClick={handleCreatePassword} className="mb-2 btn_primary card-content" disabled={isButtonDisabled}>새 지갑 생성</Button>     
        </Card.Body>
      </Card>
    </div> */}

    <div className='card-container'>
        <div className='card-content'>
            <h2 className='h-my-4'>비밀번호 생성</h2>
            <div className='h-text-center h-mb-8'>
            이 비밀번호는 이 기기에서만 알바트로스 지갑의 잠금을 해제합니다. 알바트로스는 이 비밀번호를 복구할 수 없습니다.
            </div>

            <div className='h-w-20 h-mb-8'>
              <div className='h-mb-4'>
                <div className='h-mb-2 h-text-left'>새 비밀번호</div>
                <input className='h-mb-2 h-w-full' type='password' value={password} onChange={handlePasswordChange}></input>
              </div>

              <div className='h-mb-4'>
                <div className='h-mb-2 h-text-left'>비밀번호 확인</div>
                <input className='h-mb-2 h-w-full' type='password'  value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                {password !== confirmPassword && (
                  <div className="h-text-red-500 h-text-xs">비밀번호가 일치하지 않습니다.</div>
                )}
              </div>
            </div>

            
            
            <div className='h-my-2 check-group h-text-left'>
                <span className='h-mr-2'>
                    <input
                    type='checkbox'
                    checked={agreementChecked} onChange={handleAgreementChange}
                    />
                </span>
                <span className='h-text-xs'>
                알바트로스가 이 비밀번호를 복구할 수 없음을 이해합니다.                   
                </span>                      
            </div>
            <div className='btn-group h-mb-4'>
                <button onClick={handleCreatePassword} disabled={!agreementChecked} className='h-mb-2'>새 지갑 생성</button>
            </div>
        </div>                
    </div>

    </>
    )
}