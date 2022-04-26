import dynamic from "next/dynamic";
import Layout from "src/components/Layout";

const Map = dynamic(() => import("../../views/Map"), { ssr: false });
export default function MapIndex(){
  return(
    <Layout>
      <Map />
    </Layout>
  )
}