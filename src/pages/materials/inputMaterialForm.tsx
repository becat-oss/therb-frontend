import React, { useCallback } from 'react';
import { TextField, makeStyles, createStyles, FormControl, InputLabel, Select, MenuItem, useFormControl } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import useUpdateAppState from '../form/SideForm/useUpdateAppState';

// const useStyles = makeStyles((theme: Theme)=>{
//     createStyles({
//         form:{
//             '& > *':{
                
//             }
//         }
//     })
// })
const materials=['insulation','gypsum board','brick'];

const materialKey='material';



export default function InputMaterialForm(): React.ReactElement{
    const { control,setValue } = useFormContext();

    const onChangeMaterial = useCallback((material:string): void=>{
        setValue(materialKey,material)
    },[]);


    //
    // return(
    //     <FormControl>
    //         <InputLabel>
    //             素材
    //         </InputLabel>
    //         <Controller
    //             name={materialKey}
    //             render={({ field }): React.ReactElement =>{
    //                 <Select
    //                     {...field}
    //                     labelId={`${materialKey}-label`}
    //                     id={materialKey}
    //                     options={[
    //                         {value:'test',label:'test'},
    //                         {value:'test1',label:'test1'}
    //                     ]}
                        
    //                     onChange={(e): void=>{
    //                         field.onChange(e);
    //                         onChangeMaterial(e.target.value as string)
    //                         //updateAppState()
    //                     }}
    //                     required
    //                 >
    //                     {materials.map((key)=>{
    //                         <MenuItem key={key} value={key}>
    //                             {key}
    //                         </MenuItem>
    //                     })}
    //                 </Select>
    //             }}
    //             control={control}
    //             rules={{ required:true }}
    //         />
    //     </FormControl>
        
    // )
}