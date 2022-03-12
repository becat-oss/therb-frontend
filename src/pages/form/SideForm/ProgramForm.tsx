import { useFormContext, Controller } from 'react-hook-form';
import { spaceTypeKey, programKey,programs } from 'src/AppTypes';
import { useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

export default function ProgramForm(): React.ReactElement {
    const { control, formState: { errors }, watch, setValue } = useFormContext();

    const onChangeProgram = useCallback((program:string):void =>{
        const spaceType = watch(spaceTypeKey);
        setValue(programKey, program);
        //const spaceTypes = 
    },[]);

    return (
        <FormControl>
            <InputLabel id = {`${programKey}-label`} required>
                Program
            </InputLabel>
            <Controller 
                name={programKey}
                render = {({ field }):React.ReactElement =>(
                    <Select
                        {...field}
                        labelId = {`${programKey}-label`} 
                        id = {programKey}
                        onChange = {(e): void =>{
                            field.onChange(e);
                            onChangeProgram(e.target.value as string);
                        }}
                        required
                    >
                        {programs.map((key)=>(
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                control = {control}
                rules = {{required: true}}
            />
        </FormControl>
    )
}