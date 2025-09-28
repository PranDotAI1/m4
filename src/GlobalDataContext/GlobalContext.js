import React, { createContext, useState, useCallback } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [data, setData] = useState({});

    const setDataByKey = useCallback((key, value) => {
        setData(prevData => ({ ...prevData, [key]: value }))
    }, []);

    const getDataByKey = useCallback((key) => {
        return data[key];
    }, [data]);


    return (
        <GlobalContext.Provider value={{ setDataByKey, getDataByKey }}>
            {children}
        </GlobalContext.Provider>
    )


};


export { GlobalContext, GlobalContextProvider }