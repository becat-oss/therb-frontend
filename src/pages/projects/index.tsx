import Layout from "src/components/Layout";
import ProjectList from "./ProjectList";
import ProjectListProvider from "./ProjectListContext";


export default function ProjectListIndex(){
  return(
    <Layout>
      <ProjectListProvider>
        <ProjectList />
      </ProjectListProvider>
    </Layout>
  )
}