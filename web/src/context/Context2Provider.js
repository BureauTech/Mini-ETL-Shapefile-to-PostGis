import React, { useState, createContext } from 'react';

export const Context2 = createContext();

const ContextProvider2 = ({ children }) => {
  const [shapeReturn, setShapeReturn] = useState([]);
  const context = {
    shapeReturn,
    setShapeReturn,
  };
  return (
    <Context2.Provider value={ context }> 
      {children}
    </Context2.Provider>
  );
}
export default ContextProvider2;