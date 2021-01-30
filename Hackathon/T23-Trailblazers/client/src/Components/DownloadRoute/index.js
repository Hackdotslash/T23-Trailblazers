import React, { useState, useEffect, useContext } from "react";

// import MyContract from "../../contracts/MyContract.json";
// import getWeb3 from "../../getWeb3";

import Download from "./Component/Download";

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

  // const CaptureFile = (e) => {
  //   e.preventDefault();
  //   console.log("uploaded");
  //   console.log(e.target.files);
  //   const file = e.target.files[0];
  //   const reader = new window.FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => {
  //     console.log("buffer = ", Buffer(reader.result));
  //     setBuffer(Buffer(reader.result));
  //   };
  // };

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
    e.preventDefault();
    setFileHash(temp);
  };

  return (
    <>
      {/* <ContractProvider value={MyContractInstance}>
        {" "}
        <Trial />{" "}
      </ContractProvider> */}
      <Download
        OnSubmitFunction={OnSubmit}
        handleInputChange={handleInputChange}
        fileHash={fileHash}
        temp={temp}
      />
      {/* <p>Download</p> */}
    </>
  );
}
