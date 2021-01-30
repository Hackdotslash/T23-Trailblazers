import React, { useState, useEffect, useContext } from "react";

// import MyContract from "../../contracts/MyContract.json";
// import getWeb3 from "../../getWeb3";

import Verify from "./Component/Verify";

import {
  ContractContext,
  ContractProvider,
} from "../../Context/ContractContext";

// import Trial from "../Trial";
// import UploadRoute from "./UploadRoute";

const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export default function Index() {
  // const [accounts, setAccounts] = useState();
  // const [MyContractInstance, setMyContractInstance] = useState();
  const { accounts, MyContractInstance } = useContext(ContractContext);
  const [fileHash, setFileHash] = useState("");
  const [temp, setTemp] = useState("");
  const [buffer, setBuffer] = useState();
  const [outputResult, setOutputResult] = useState();
  const [obj, setObj] = useState({
    loaded: false,
    kycAddress: "",
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
    console.log("uploaded");
    console.log(e.target.files);
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      console.log("buffer = ", Buffer(reader.result));
      setBuffer(Buffer(reader.result));
    };
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(name);
    setTemp(value);
    // setObj({
    //   ...obj,
    //   [name]: value,
    // });
  };

  const OnSubmit = async (e) => {
    // Qmd9Jhi4q5hxD3wonKi3FYUQkVYx6GcnUDVUn3tPxNhesE

    // QmZEC7dm3WBNpdqSzGs7iCVGeBeWGJyz8FQqDSc56ikdg9

    //QmZEC7dm3WBNpdqSzGs7iCVGeBeWGJyz8FQqDSc56ikdg9
    e.preventDefault();
    console.log("Submitting form");

    const res = await ipfs.add(buffer);
    console.log(res);
    const output = await MyContractInstance.methods
      .verifyDetails(res.path)
      .call();
    console.log(output);
    setOutputResult(output);
    setFileHash(res.path);
  };

  console.log(outputResult);

  return (
    <>
      {/* <ContractProvider value={MyContractInstance}>
        {" "}
        <Trial />{" "}
      </ContractProvider> */}
      <Verify
        OnSubmitFunction={OnSubmit}
        CaptureFile={CaptureFile}
        fileHash={fileHash}
        outputResult={outputResult}
      />
      {/* <p>Download</p> */}
    </>
  );
}
