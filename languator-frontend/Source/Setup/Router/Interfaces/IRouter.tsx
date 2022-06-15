interface IRouter{
    // constructor comes before all other methods
    // goes: constructor => willmount => render => didmount => unmount (when the DOM no longer needs to render 'this' component)
    componentWillMount : () => void;
    render : () => JSX.Element;
    componentDidMount : () => void;
    componentWillUnmount : () => void;
}

interface IRouterProps{
  
}

interface IRouterState{

}

export {IRouter, IRouterProps, IRouterState};