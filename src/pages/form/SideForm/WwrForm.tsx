import { AnalysisZone, wwrKey, perWwrKey, AnalysisGeometry } from "src/AppTypes";
import { FormControl, TextField, InputLabel } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import useUpdateAppState from "./useUpdateAppState";
import {useFormCondtionsContext} from "../formContext";
import { useEffect, useCallback } from "react";
import { Zone, convertCoordinatesToMesh } from "src/editor/zone";
import { useAppContext } from "src/AppContext";
import { useEditor } from "src/editor/useEditor";
import { editorKeys } from "src/EditorContext";

interface FormProps {
    zone: AnalysisZone;
    index: number;
    wallIndex: number;
    name: string;
    disabled?: boolean;
}

function useWallSelect(name:string, zone:AnalysisZone, wallIndex:number):[() => void, () => void]{
    const {zoneData} = useAppContext();
    const {addObject}=useEditor();
    const handleFocus = useCallback(()=>{
        const z = new Zone(zone);
        const geometry = z.getZoneParentGeometry(zoneData) as AnalysisGeometry;
        const wall = convertCoordinatesToMesh(z.getCoordinate(wallIndex),name,geometry.level,geometry.height,'0x00bbff');
        addObject(editorKeys.selectHelper,wall);
    },[addObject]);

    const handleBlur = useCallback(()=>{
        console.log('test')
    },[])

    return [handleFocus,handleBlur];
}

function Form ({ index, wallIndex, zone, name, disabled = false}:FormProps):React.ReactElement{
    const {updateAppState}=useUpdateAppState();
    const [handleFocus,handleBlur]=useWallSelect(name,zone,wallIndex);
    const label = `${'exterior-wall'}${index + 1}`
    return (
        <FormControl>
            <Controller 
            name={name}
            render={({ field }): React.ReactElement => (
                <TextField
                  {...field}
                  key={name}
                  id={name}
                  label={label}
                  variant="standard"
                  required
                  disabled={disabled}
                  onFocus={handleFocus}
                  onChange={(e): void => {
                    field.onChange(e);
                    updateAppState();
                  }}
                />
              )}
            />
        </FormControl>
    )
}

export default function WwrForm(): React.ReactElement {
    const{zone}=useFormCondtionsContext();
    useEffect(()=>{
        console.log('zone',zone);
    },[zone]);
    //console.log('zone',zone);
    return(
        <>
            {/* <Form zone={zone} index={0} wallIndex={0} name={wwrKey} disabled={true}/> */}
            {zone.exteriorWalls.map((wallIndex,i)=>{
                return <Form key={i} zone={zone} index={i} wallIndex={wallIndex} name={perWwrKey(wallIndex)} disabled={false}/>
            })}
        </>
    )
}