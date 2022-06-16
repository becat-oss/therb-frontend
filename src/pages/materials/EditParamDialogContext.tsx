import React, { useMemo, useContext, useState, useEffect } from 'react';
import { ConstructionSetting } from 'types';
import { envelopeParams } from 'src/parameters';

interface EditParamDialogState{
  constructionSet: ConstructionSetting;
  setConstructionSet: (constructionSet: ConstructionSetting) => void;
  opaqueError: boolean; //後々opaqueErrorに名称変更する可能性
  setOpaqueError: (opaqueError: boolean) => void;
  windowError: string;
  setWindowError: (windowError: string) => void;
}

const initialState: EditParamDialogState = {
  constructionSet: envelopeParams.wood,
  setConstructionSet: () => { return; },
  opaqueError: false,
  setOpaqueError: () => { return; },
  windowError: '',
  setWindowError: () => { return; },
};

export const EditParamDialogContext = React.createContext<EditParamDialogState>(initialState);

interface EditParamDialogProviderProps{
  children: React.ReactNode;
}

export function EditParamDialogProvider({ children }: EditParamDialogProviderProps) :React.ReactElement{
  const [constructionSet, setConstructionSet] = useState(initialState.constructionSet);
  const [opaqueError, setOpaqueError] = useState(initialState.opaqueError);
  const [windowError, setWindowError] = useState(initialState.windowError);
  
  const state:EditParamDialogState=useMemo(()=>{
    return {
      constructionSet, 
      setConstructionSet,
      opaqueError,
      setOpaqueError,
      windowError,
      setWindowError,
    }
  },[constructionSet]);

  return <EditParamDialogContext.Provider value={state}>{children}</EditParamDialogContext.Provider>
}

export function useEditParamDialogContext() :EditParamDialogState{
  return useContext(EditParamDialogContext);
}