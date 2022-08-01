import React, { useContext, useEffect, useMemo, useState } from "react";
import { getProjectData } from "src/api/KeyRequests";
import { ProjectData } from "src/AppTypes";

interface ProjectListState{
  projectData: ProjectData[];
  setProjectData: (projectData: ProjectData[]) => void;
};

const initialState: ProjectListState = {
  projectData:[],
  setProjectData:()=>{}
}

export const ProjectListContext = React.createContext<ProjectListState>(initialState);

interface ProjectListProviderProps{
  children: React.ReactNode;
}

export default function ProjectListProvider({children}:ProjectListProviderProps):React.ReactElement{
  const req = getProjectData();
  const [projectData,setProjectData] = useState(initialState.projectData);
  
  useEffect(()=>{
    async function getProjects(){
      const response = await req;

      setProjectData(response["data"]);
    }
    getProjects();
  },[]);

  const projectListState = useMemo((): ProjectListState=>{
    return{
      projectData,
      setProjectData
    }
  },[projectData]);

  return <ProjectListContext.Provider value={projectListState}>{children}</ProjectListContext.Provider>
}

export function useProjectListContext(): ProjectListState{
  return useContext(ProjectListContext);
}