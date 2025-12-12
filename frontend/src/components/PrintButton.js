
import React from "react";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print";

// PrintButton expects a `componentRef` prop referencing the component to print.
export default function PrintButton({ componentRef }) {
  return (
    <div>
      {/* button to trigger printing of target component */}
      <ReactToPrint
        trigger={() => <Button>Print this out!</Button>}
        content={() => (componentRef ? componentRef.current : null)}
      />
    </div>
  );
}

