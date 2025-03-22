import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Buttonel } from "../../ui/button/button";

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

// Obtén el elemento raíz para montar el componente
const root = ReactDOM.createRoot(
  document.getElementById("hello") as HTMLElement
);

// Renderiza el componente en el elemento raíz
root.render(<Hello name="Julio" />);
