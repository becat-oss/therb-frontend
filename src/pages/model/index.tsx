import dynamic from "next/dynamic";
import Layout from "src/components/Layout";

const EditPlans = dynamic(() => import("../../views/EditPlans"), { ssr: false });
export default function ModelIndex(){
  return(
      <EditPlans />
  )
}