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

// 컴포넌트 
import Create_password from './wallet_create/create-password';
import Import_recovery_phrase from './wallet_import/import-with-recovery-phrase';

// import 'bootstrap/dist/css/bootstrap.css';
// import {Button, Card, Form} from 'react-bootstrap';


// css 모음
import '../css/hch_card.css'
import '../css/hch_basic.css'
import Logo from '../assets/eagle.jpg';

export default function Welcome() {

    const [agreementChecked, setAgreementChecked] = useState(false); // State to track the agreement checkbox

    const handleAgreementChange = () => {
        setAgreementChecked(!agreementChecked); // Toggle the checkbox state
    };

    return (
        <>
            {/* <div className='card-container'>
                <Card className="text-center" style={{ width: '30rem'}}>
                    <Card.Body>
                        <h3 className='mb-2'>시작하기</h3>
                        <Card.Text className='mb-4'>
                            알바트로스는 EOSIO 기반 블록체인이 Web3의 세계에 접근할 수 있도록 하는 안전한 지갑입니다.
                        </Card.Text>

                        <Card.Img className='mb-5 card-content' variant="top" src={Logo} />
                                        
                        <div className='form_check_div'>
                            <Form className='mx-5 mb-2'>
                                <Form.Check className='mx-2 my-input' aria-label="option 1" label="알바트로스의 이용약관에 동의합니다."
                                checked={agreementChecked}
                                onChange={handleAgreementChange}
                                />
                            </Form>
                        </div>
                    
                        <Button onClick={() => goTo(Create_password)} className="mb-2 btn_primary card-content" disabled={!agreementChecked}>새 지갑 생성</Button>
                        <Button onClick={() => goTo(Import_recovery_phrase)} className="mb-2 btn_primary_outline card-content" disabled={!agreementChecked}>기존 지갑 가져오기</Button>
                    </Card.Body>
                </Card>
            </div> */}

            <div className='card-container'>
                <div className='card-content'>
                    <h2 className='h-my-4'>시작하기</h2>
                    <div className='h-text-center h-mb-4'>
                        Albatros는 EOSIO 기반 블록 체인이 Web3의 세계에 접근할 수 있도록 하는 안전한 지갑입니다.
                    </div>
                    <div className='h-mb-4'>
                        <img className='logo' src={Logo} />
                    </div>
                    <div className='h-my-2 check-group h-text-left'>
                        <span className=''>
                            <input
                            type='checkbox'
                            checked={agreementChecked}
                            onChange={handleAgreementChange}
                            />
                        </span>
                        <span className='h-text-xs'>
                        알바트로스의 이용약관에 동의합니다.                            
                        </span>                      
                    </div>
                    <div className='btn-group h-mb-4'>
                        <button onClick={() => goTo(Create_password)} disabled={!agreementChecked} className='h-mb-2'>새 지갑 생성</button>
                        <button onClick={() => goTo(Import_recovery_phrase)} disabled={!agreementChecked} className='h-mb-2 '>기존 지갑 가져오기</button>
                    </div>
                </div>                
            </div>
        </>
        


    )
}