import { useFormContext } from 'react-hook-form';
import { ConditionInputs } from 'src/AppTypes';
import { useFormCondtionsContext }from '../formContext';
import { useCallback } from 'react';
import {useCondition} from './condition';

interface UpdateAppState {
    updateAppState: () => void;
    onSubmit: () => void;
}

export default function useUpdateAppState(){
    const {getValues, formState:{ errors }, handleSubmit } = useFormContext<ConditionInputs>();
    const {zone, setZone} = useFormCondtionsContext();
    const{updateZoneCondition}=useCondition();

    const updateAppState = useCallback(():void=>{
        const values= getValues();
        updateZoneCondition(zone, values);
    },[getValues]);

    return {
        updateAppState
    }
}