import React, { useState, createContext } from 'react';

export const Context1 = createContext();

const ContextProvider = ({ children }) => {
  const [shapeReturn, setShapeReturn] = useState([]);
  const context = {
    shapeReturn,
    setShapeReturn,
  };
  return (
    <Context1.Provider value={ context }> 
      {children}
    </Context1.Provider>
  );
}
export default ContextProvider;