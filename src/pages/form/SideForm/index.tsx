import { useFormCondtionsContext } from "../formContext"
import { AnalysisZone } from "src/AppTypes";
import useFormMethods from "./useFormMethods";
import { FormProvider } from 'react-hook-form';
import ConditionForm from "./ConditionForm";
import Sidebar from "src/components/Sidebar";
import Button from "@material-ui/core/Button";

interface FormProps {
    zone: AnalysisZone;
}

export function Form({zone}:FormProps):React.ReactElement {
    const methods = useFormMethods(zone);

    return (
        <FormProvider {...methods}>
            <ConditionForm />
        </FormProvider>
    )
}

export default function SideForm(): React.ReactElement {
    const { zone,openDialog,setOpenDialog }=useFormCondtionsContext();

    const handleClickOpen = () =>{
        setOpenDialog( true );
        console.log('openDialog',openDialog);
      }
    
    return (
        <Sidebar>
            <Form zone={zone}/>
            <Button variant="contained" onClick={handleClickOpen}>
                Detail Setting
            </Button>
        </Sidebar>
        
            
    )
}