
import { useFormContext } from 'react-hook-form';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import ProgramForm from './ProgramForm';
import Button from '@material-ui/core/Button';
import WwrForm from './WwrForm';

interface SectionProps {
    name? : string;
    children: React.ReactNode;
}

export function Section({name, children}: SectionProps):React.ReactElement{
    return(
        <Paper>
            <InputLabel shrink>
                {name}
            </InputLabel>
            <div>{children}</div>
        </Paper>
    )
}

export default function ConditionForm(): React.ReactElement {
    const { formState: {errors}}= useFormContext();
    //const { onSubmit } = useUpdateAppState();

    return (
        <form>
            <Section>
                <ProgramForm />
            </Section>
            <Section>
                <WwrForm />
            </Section>
        </form>
    )
}