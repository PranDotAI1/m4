import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/scss/app.scss";
import Routes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./GlobalDataContext/GlobalContext";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
