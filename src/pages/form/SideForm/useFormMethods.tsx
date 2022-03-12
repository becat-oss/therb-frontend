import { AnalysisZone, ConditionInputs } from "src/AppTypes";
import { UseFormReturn, useForm } from 'react-hook-form';
import { useMemo } from "react";

const initialProgram = 'office';
const initialSpaceType = 'open_office';
export default function useFormMethods(zone: AnalysisZone): UseFormReturn{
    const initialValues = useMemo((): ConditionInputs =>{
        return {
            program:zone.program || initialProgram,
            space_type: zone.space_type || initialSpaceType
        }
    },[zone]);

    const methods = useForm<ConditionInputs>({defaultValues: initialValues});

    return methods;
}