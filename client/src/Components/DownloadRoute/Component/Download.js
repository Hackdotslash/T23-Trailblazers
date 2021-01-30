import React from "react";
import { ContractConsumer } from "../../../Context/ContractContext";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function Download(props) {
  return (
    <>
      {/* <ContractConsumer>
        {(a) => {
          //   console.log(a);
          setInstance(a);
        }}
      </ContractConsumer> */}

      <Grid
        container
        direction="column"
        justify="center"
        // spacing={5}
        alignItems="center"
      >
        <Grid
          container
          item
          xs={6}
          direction="column"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid
            container
            item
            //   xs={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h2" gutterBottom>
              Download Your Document
            </Typography>
          </Grid>

          <Grid
            container
            item
            //   xs={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
            {/* <img
              //   src={`https://ipfs.infura.io/ipfs/${props.fileHash}`}
              src={
                props.fileHash
                  ? `https://ipfs.infura.io/ipfs/${props.fileHash}`
                  : "https://picsum.photos/600/400"
              }
              style={{ width: "100%" }}
              alt="f"
            /> */}
            <object
              data={
                props.fileHash
                  ? `https://ipfs.infura.io/ipfs/${props.fileHash}`
                  : "https://picsum.photos/600/400"
              }
              width="600"
              height="400"
            ></object>
          </Grid>

          <Grid
            container
            item
            //   xs={6}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <form onSubmit={props.OnSubmitFunction}>
              <input
                type="text"
                name="fileHash"
                value={props.temp}
                onChange={props.handleInputChange}
              />
              <input type="submit" />
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
