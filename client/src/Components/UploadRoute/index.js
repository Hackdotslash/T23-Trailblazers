import React, { useState, useEffect, useContext } from 'react';
// import MyContract from "../../contracts/MyContract.json";
// import getWeb3 from "../../getWeb3";
import QRCode from 'react-qr-code';

import {
  ContractContext,
  ContractProvider,
} from '../../Context/ContractContext';

// import Trial from "../Trial";
import UploadRoute from './UploadRoute';
const moment = require('moment');

const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: '5001',
  protocol: 'https',
});

var str;

export default function Index() {
  // const [accounts, setAccounts] = useState();
  // const [MyContractInstance, setMyContractInstance] = useState();
  const { accounts, MyContractInstance } = useContext(ContractContext);
  const [fileHash, setFileHash] = useState('');
  const [buffer, setBuffer] = useState();
  const [uploaderName, setUploaderName] = useState('');
  const [obj, setObj] = useState({
    loaded: false,
    kycAddress: '',
  });
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // async function getData() {
    //   const hash = await MyContractInstance.methods.get().call();
    //   setFileHash(hash);
    //   setObj({ ...obj, loaded: true });
    // }
    // getData();
  }, []);

  const CaptureFile = (e) => {
    e.preventDefault();
    console.log('uploaded');
    console.log(e.target.files);
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log('buffer = ', Buffer(reader.result));
      setBuffer(Buffer(reader.result));
    };
  };

  const OnSubmit = async (e) => {
    // Qmd9Jhi4q5hxD3wonKi3FYUQkVYx6GcnUDVUn3tPxNhesE

    // QmZEC7dm3WBNpdqSzGs7iCVGeBeWGJyz8FQqDSc56ikdg9

    //QmZEC7dm3WBNpdqSzGs7iCVGeBeWGJyz8FQqDSc56ikdg9

    e.preventDefault();
    console.log('Submitting form');

    const res = await ipfs.add(buffer);

    //for qrcode...
    str = res.path;
    console.log(str);

    var timeStamp = moment().unix();
    console.log(timeStamp);
    // if (str !== '') {
    //   <QRCode value={str} size={300} level={'H'} />;
    // }

    await MyContractInstance.methods
      .sethashDetails(uploaderName, timeStamp, res.path)
      .send({ from: accounts[0] });
    setFileHash(res.path);
  };

  const uploaderChange = (e) => {
    setUploaderName(e.target.value);
    // console.log('34');
    // console.log(str);
  };
  return (
    <div>
      {/* <ContractProvider value={MyContractInstance}>
        {" "}
        <Trial />{" "}
      </ContractProvider> */}
      <UploadRoute
        OnSubmitFunction={OnSubmit}
        CaptureFile={CaptureFile}
        fileHash={fileHash}
        uploader_name={uploaderName}
        uploaderChange={uploaderChange}
      />
      <div>
        <QRCode value="hello" size={300} level={'H'} />
      </div>
    </div>
  );
}
