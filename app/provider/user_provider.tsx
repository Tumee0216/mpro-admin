import React, { createContext, useEffect, useState } from "react";

export const TypeContext = createContext({ type: '', setType: null })

export const TypeProvider = ({ children }: any) => {

    const [type, setType] = useState('');
    
    return (
        <TypeContext.Provider value={{
            type: type,
            //@ts-ignore
            setType: setType
        }}>
            {children}
        </TypeContext.Provider>
    )
}