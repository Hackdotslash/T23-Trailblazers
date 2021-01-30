import React, { useContext } from "react";

const ContractContext = React.createContext();

const ContractProvider = ContractContext.Provider;
const ContractConsumer = ContractContext.Consumer;

export { ContractContext, ContractProvider, ContractConsumer };
