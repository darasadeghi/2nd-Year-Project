import { IRouterProps } from './Router/Interfaces/IRouter';
import BasicRouter from "./Router/Implementations/BasicRouter"
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./application.css"

// EDIT THE IMPLEMENTATIONS FOR EACH PATH HERE
const routerProps : IRouterProps = 
{

}

  
// INJECT THE APPLICATION'S ROOT COMPONENT (AN IROUTER IMPLEMENTATION) INTO THE HTML PAGE
ReactDOM.render(
    React.createElement(BasicRouter, routerProps, []),   // (Component, Props, Children)
    document.getElementById("root")
);