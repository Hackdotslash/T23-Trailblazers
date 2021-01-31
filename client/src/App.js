// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import UploadRoute from "./Components/UploadRoute";
import DownloadRoute from "./Components/DownloadRoute";
import VerifyRoute from "./Components/VerifyRoute";
import Home from "./Components/HomeRoute";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ContractProvider } from "./Context/ContractContext";

import MyContract from "./contracts/MyContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState();
  const [MyContractInstance, setMyContractInstance] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ConfigureWithTruffle() {
      try {
        // await window.ethereum.enable();
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);

        setAccounts(accounts);
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const MyContractInstance = new web3.eth.Contract(
          MyContract.abi,
          MyContract.networks[networkId] &&
            MyContract.networks[networkId].address
        );
        console.log(MyContractInstance);
        setMyContractInstance(MyContractInstance);

        console.log(loading);
        setLoading(false);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    }
    ConfigureWithTruffle();
    // setLoading(false);
  }, []);

  console.log(loading);
  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <ContractProvider value={{ accounts, MyContractInstance }}>
          <Router>
            <Route path="/upload" exact component={UploadRoute} />
            <Route path="/download" exact component={DownloadRoute} />
            <Route path="/verify" exact component={VerifyRoute} />

            <Route path="/" exact component={Home} />
          </Router>
        </ContractProvider>
      )}
    </>
  );
}

export default App;
