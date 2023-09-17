/*global chrome*/

import React, { useEffect, useState } from 'react';
import '../App.css';
import '../TabLayout.css';
import downarrow from '../downarrow.png';
import ReactDOM from 'react-dom';
// 

async function postJSON(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("postJSON Success:", result);
    return result;
    
  } catch (error) {
    console.error("postJSON Error:", error);
  }
}

async function account_store(new_account) {

  // 1. 현재 chrome.storage에 저장된 키 값들의 배열을 가져오고
  const result = await chrome.storage.local.get(["accounts"]);
  console.log("현재 저장된 accounts 값들",result);

  let updateData = [];
  if(result.accounts) {
      //accounts라는 key의 데이터가 존재할 때...
      try {
          const accountsArray = result.accounts;
          if (Array.isArray(accountsArray)) {
            updateData = accountsArray;
            console.log("updateData에 과거 데이터 추가.")
          }
        } catch (error) {
          console.error("Error parsing keys:", error);
        }
  }
  console.log("updateData 확인 : ",updateData)

  
  // 2. 해당 배열에 새로 추가된 계정을 넣어준다
  updateData.push(new_account); // 기존 데이터를 추가해준다.

  
  // 3. 해당 배열을 chrome.storage에 다시 넣어준다. (갱신한다)
  await chrome.storage.local.set({accounts : updateData}); // 테스트를 위해 await 함
  const result2 = await chrome.storage.local.get(["accounts"]);
  console.log("갱신된 account 값들",result2);

  
  // 4. 새로 추가된 계정을 활성화된 계정에 추가해준다.
  await chrome.storage.set({activeAccount : new_account});
  const result3 = await chrome.storage.local.get(["activeAccount"]);
  console.log("활성화된 account 값",result3);  
}


function Header({ accountName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMakeAccount, setIsMakeAccount] = useState(false);
  const [tid, setTid] = useState('');

  const [makeAccountName, setMakeAccountName] = useState('');
  const [accountList, setAccountList] = useState([]);
  
  const handleAccountNameChange = (event) => {
    setMakeAccountName(event.target.value);
  };

  // 계정 조회를 위해 계정 목록을 가져온다..
  useEffect(async() => {
    setAccountList([
      {account_name : "aaaa", publicKey :"123", privateKey : "aa123" }, 
      {account_name : "bbbb", publicKey :"456", privateKey : "aa456" }, 
      {account_name : "cccc", publicKey :"789", privateKey : "aa789" } 
    ])

    // const result_accounts = await chrome.storage.local.get(["accounts"]); // 계정 가져오기

    // console.log("계정조회를 위해 계정 목록을 가져옴 : result_accounts : ");
    // console.log(result_accounts)

    // let account_num = 0; // 계정의 수 가져오기
    // if(Object.keys(result_accounts).length !== 0) {
    //   account_num = result_accounts.accounts.length;
    // }
    // console.log("createAccount : 계정의 수 : "+account_num);

  }, []);
  
  
  const getAccountList= async()=>{

    // 1. 현재 chrome.storage에 저장된 키 값들의 배열을 가져오고
    const result = await chrome.storage.local.get(["accounts"]);
    console.log("현재 저장된 accounts 값들",result);

    if(result.accounts) {
      //accounts라는 key의 데이터가 존재할 때...
      try {
        const accountsArray = result.accounts;
       
      } catch (error) {
        console.error("Error parsing keys:", error);
      }
    }
  }
 
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openMakeAccount = () => {
    setIsMakeAccount(true);
  };

  const closeMakeAccount = () => {
    setIsMakeAccount(false);
  };

  const handleCreateAccount = (event) => {
    // 계정 생성 관련 핸들러
    console.log("계정 생성 버튼")
    createAccount();
  };

  const handleAccountChoice = async (account) => {
    console.log("활성화된 계정을 바꿔준다. 클릭한 계정정보")
    console.log(account);

    chrome.storage.sync.set({ activeAccount: account }, () => {
      console.log("활성화된 account 값이 저장되었습니다.");
      
      // 저장된 데이터를 다시 읽어옵니다.
      chrome.storage.sync.get(["activeAccount"], (result) => {
        console.log("활성화된 account 값", result.activeAccount);
      });
    });
  };

  const createAccount = async () => {
    
    try {
      
      // 1. 저장된 니모닉과 계정 개수를 바탕으로 키를 생성한다.
      
      const result_user_mnemonic = await chrome.storage.local.get(["user_mnemonic"]); // 니모닉 가져오기
      const result_accounts = await chrome.storage.local.get(["accounts"]); // 계정 가져오기

      console.log("createAccount : result_user_mnemonic : ");
      console.log(result_user_mnemonic)
      console.log("createAccount : result_accounts : ");
      console.log(result_accounts)

      let account_num = 0; // 계정의 수 가져오기
      if(Object.keys(result_accounts).length !== 0) {
        account_num = result_accounts.accounts.length;
      }
      console.log("createAccount : 계정의 수 : "+account_num);

      
      // 2. 니모닉을 기반으로 키 생성을 요청한다. (니모닉 기반 키 요청)
      const url_for_key = "http://221.148.25.234:3100/key_create_from_mnemonic";
      const data_for_key = {
          mnemonic: result_user_mnemonic.user_mnemonic,
          num_child: account_num,
        };
      
      const keyData = await postJSON(url_for_key, data_for_key);

      const publicKey = keyData.keyPairs[0].publicKey;
      const privateKey = keyData.keyPairs[0].privateKey;


      // 2.5 해당 public 키로 설정된 계정이 있는지 조회한다. (공개키의 계정 여부 조회)
      const url_for_publicKeyAccount = "http://221.148.25.234:8989/getAccountList";
      const data_for_publicKeyAccount = {
          publicKey: publicKey
        };
      
      const result_publicKeyAccount = await postJSON(url_for_publicKeyAccount, {datas : data_for_publicKeyAccount});
      const publicKeyAccount = result_publicKeyAccount.accounts;
      console.log("createAccount : 계정조회 결과")
      console.log(publicKeyAccount)
      if(Array.isArray(publicKeyAccount) && publicKeyAccount.length !== 0) {
        console.log("이미 계정이 존재하는 public key입니다.")
        return;
      }    


      // 3. 해당 public key로 설정된 계정이 없다면 public과 private키를 기반으로 계정 생성을 요청한다..
      
      const createName = makeAccountName // 계정이름

      const url_for_account = "http://221.148.25.234:8989/createAccount";
      const data_for_account = {
          createName: createName,
          publicKey: publicKey,
        };

      const response_account = await postJSON(url_for_account, {datas : data_for_account});
      if(response_account.status == "SUCCESS") {
          
        console.log("계정생성 성공")
        console.log("트랜잭션 아이디 : "+response_account.result.transaction_id);
        setTid(response_account.result.transaction_id)
        
        const new_account = {account_name : accountName, publicKey :publicKey, privateKey : privateKey }
        account_store(new_account); // 계정 생성에 성공하면 해당 계정을 storage에 저장한다.

      } else {
        console.log("계정생성 실패")
      }

    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    return (
      <div className='setting-bar'>
        <p className='accountHeader' onClick={openModal}>{accountName}</p><img onClick={openModal} src={downarrow} className="selectAccount" />
      {isModalOpen && (
        <div className="account_modal">
          <div className="account_modal-content">
            <h2 className='choose-account'>계정 선택</h2>
            <div className='account-list'>
              {accountList.map((account, index) => (
                <div key={index} onClick={() => handleAccountChoice(account)}>
                  <div>{account.account_name}</div>
                </div>
              ))}
            </div>

            
            <div className='add-account' onClick={openMakeAccount}>
            + Add account
            </div>
            <button onClick={closeModal}>닫기</button>
          </div>
          
        </div>
        
      )}
      {isMakeAccount && (
        <div className="account_modal">
        <div className="account_modal-content">
          <h2 className='choose-account'>계정 생성</h2>
          <div className='account-list'>
            <div>
              계정 이름
            </div>
            <div>
              <input type='text' value={makeAccountName} onChange={handleAccountNameChange}></input>
            </div>
          </div>

          <div>
            <button onClick={handleCreateAccount}>계정 생성</button>
            <button onClick={closeMakeAccount}>닫기</button>
          </div>
        </div>
      </div>

      )}

      </div>
    );
  }





export default Header;