import React, { useState } from "react";
import { ContractConsumer } from "./../Context/ContractContext";

export default function Trial() {
  const [instance, setInstance] = useState();
  console.log(instance);
  return (
    <div>
      <ContractConsumer>
        {(a) => {
          console.log(a);
          setInstance(a);
        }}
      </ContractConsumer>
    </div>
  );
}
