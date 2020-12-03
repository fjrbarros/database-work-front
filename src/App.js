// import React from "react";
// import { useSelector, useDispatch } from "react-redux";

// export default function App() {
//     const dispatch = useDispatch();
//     const newValue = useSelector((state) => state.newValue);
//     const newValueParam = useSelector((state) => state.newValueParam);

//     return (
//         <div>
//             <h3>{newValue}</h3>
//             <button onClick={() => dispatch({ type: "MAIS" })}>+</button>
//             <button onClick={() => dispatch({ type: "MENOS" })}>-</button>

//             <h3>{newValueParam}</h3>
//             <button onClick={() => dispatch({ type: "MAISPARAM", param: 2 })}>
//                 +
//             </button>
//             <button onClick={() => dispatch({ type: "MENOSPARAM", param: 2 })}>
//                 -
//             </button>
//         </div>
//     );
// }



import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Usuario from './pages/Usuario';
import Cidade from './pages/Cidade';

// function LoadingPage() {
//     return (
//         // TODO
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//             Carregando...
//         </div>
//     );
// }

// function PrivateRoute(props) {
//     const usuario = useSelector(state => state.sessao.usuario);

//     if (!usuario) {
//         const redirectTo = props.location.pathname;
//         return <Redirect to={{ pathname: '/login', state: { redirectTo } }} />;
//     }
//     return <Route {...props} />;
// }

export default function App() {
    // const loading = useSelector(state => state.app.loading);

    // if (loading) {
    //     return <LoadingPage />;
    // }

    return (
        <BrowserRouter>
            <Switch>
            <Route path='/cidade' component={Cidade} />
                <Route path='/usuario' component={Usuario} />
                <Route path='/' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}