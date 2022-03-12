import React from "react"
import Layout from "src/components/Layout"
import InputMaterialForm from "./inputMaterialForm"

export default function Material(): React.ReactElement{
    return(
        <Layout>
            <form>
                <InputMaterialForm />
            </form>
        </Layout>
        
    )
}