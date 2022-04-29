import Sidebar from "src/components/Sidebar";
import { useGeometryContext } from "../GeometryContext";
import ConditionForm from "./ConditionForm";

export default function SideForm(): React.ReactElement{
  const { wwr } = useGeometryContext();
  if (!wwr) {
    return (
      <Sidebar>
        <div>
          Error
        </div>
      </Sidebar>
    );
  }
  return (
    <Sidebar>
      {/* <Form wwr={wwr}/> */}
      <ConditionForm />
    </Sidebar>
  )
}