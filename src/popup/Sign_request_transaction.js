/*global chrome*/
import React from 'react';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';
  


  
export default function Sign_request_transaction({choiceAccount}) {


    const handleRequestTrx = () => {
        
        chrome.runtime.sendMessage(
            { action: "trx_request"}
        );
    };

    const handleCloseTrx = () => {
        
        chrome.runtime.sendMessage(
            { action: "trx_close"}
        );
    };

    return (
        <>
            {/* <div className='card-container'>
                <Card className="text-center" style={{ width: '100%', height: '100%'}}>
                    <Card.Body>
                    <div className="d-flex flex-column justify-content-between h-100" style={{ minHeight: '500px' }}>
                        <div>
                            <h3 className="mb-4">서명 요청</h3>
                            <Card.Text className="mb-5" style={{ fontSize: '14px'}}>요청하는 사이트를 신뢰하고 그 내용을 완전히 이해하는 경우에만 이 메시지에 서명하세요.</Card.Text>
                            <Card.Text className="mb-4" style={{ fontSize: '14px', textAlign: 'left'}}>
                                메시지 :
                                <br></br>
                                Crypto Explorer에 오신걸 환영합니다!
                                <br></br><br></br>
                                투표에 대한 트랜잭션을 요청합니다.
                                <br></br><br></br>
                                해당 요청은 계정의 cpu와 net의 스테이킹을 필요로 합니다.
                            </Card.Text>
                        </div>
                        <div>
                            <div className='mb-3' style={{ fontSize: '12px' }}>
                                신뢰할 수 있는 사이트만 연결하세요.
                            </div>
                            <div className="d-flex justify-content-between">
                                <Button onClick={handleCloseTrx} className="mx-2 btn_primary_outline card-content">취소</Button>
                                <Button onClick={handleRequestTrx} className="mx-2 btn_primary card-content">서명</Button>
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
                            <h2 className='h-text-center h-my-4'>서명 요청</h2>
                            <div className='h-text-center h-mb-10'>
                                요청하는 사이트를 신뢰하고 그 내용을 완전히 이해하는 경우에만 이 메시지에 서명하세요.
                            </div>
                            <div className='h-mt-5'>
                                메시지 :
                                <br></br>
                                Crypto Explorer에 오신걸 환영합니다!
                                <br></br><br></br>
                                투표에 대한 트랜잭션을 요청합니다.
                                <br></br><br></br>
                                해당 요청은 계정의 cpu와 net의 스테이킹을 필요로 합니다.
                            </div>
                        </div>
                        
                        <div className='h-flex h-flex-col h-w-full h-mb-4'>
                            <div className='h-text-center h-text-xs h-mb-3'>
                                신뢰할 수 있는 사이트만 연결하세요.
                            </div>
                            <div className='h-flex h-flex-row h-w-full'>
                                <button onClick={handleCloseTrx} className='h-grow h-mx-2 h-mb-2'>이전</button>
                                <button onClick={handleRequestTrx} className='h-grow h-mx-2 h-mb-2 '>서명</button>
                            </div>
                            
                        </div>
                    </div>                
                </div>
            </div>
        </>

    )
}
  