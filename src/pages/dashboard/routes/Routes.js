import { Button } from "antd";
import React from "react";

function Routes() {
  const styles = {
    root: {
      //   display: "flex",
      color: "green",
    },
    color: {
      color: "red",
    },
  };

  return (
    <div>
      <div>
        <Button style={styles.root}> THIS IS ROUTES</Button>
      </div>
      <div> THIS IS ROUTES</div>
      <div> THIS IS ROUTES</div>
    </div>
  );
}

export default Routes;
