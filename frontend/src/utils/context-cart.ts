import { createContext } from 'react';
//CRIAR O CONTEXTO:
// Definir o tipo do contexto (dado + função set)
export type ContextCartCountType = {
  contextCartCount: number;
  setContextCartCount: (contextCartCount: number) => void;
};
//Criar o contexto com a função createContext
export const ContextCartCount = createContext<ContextCartCountType>({
  contextCartCount: 0,
  setContextCartCount: () => {},
});

//PROVER O CONTEXTO GLOBALMENTE



