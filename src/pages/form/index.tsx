import Layout from "src/components/Layout";
import dynamic from "next/dynamic";

import { FormConditionsProvider, useFormCondtionsContext } from "./formContext";
import { useEffect } from "react";
import { useEditor } from 'src/editor/useEditor';

const FormView = dynamic(() => import('../../views/FormView'), { ssr: false });

export default function Form() {
  //const { openDialog,setOpenDialog }=useFormCondtionsContext();

    return (
      <>     
          <Layout>
              <FormView />
          </Layout>
      </>
      );
  }