import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Buttonel } from "./ui/button/button";

class Hello extends React.Component<any> {
  render() {
    return (
      <>
        <h1>Hello, world! {this.props.name}</h1>
        <Buttonel />
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<Hello name="Julio" />);
