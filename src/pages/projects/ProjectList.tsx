import { useProjectListContext } from "./ProjectListContext";
import { DataGrid,GridColumns } from '@mui/x-data-grid';
import { GridColDef, GridRowParams, GridRowsProp } from "@material-ui/data-grid";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export default function ProjectList(){
  const { projectData } = useProjectListContext();
  const { replace } = useRouter();

  const columns: GridColDef[] = [
      {field:'id',headerName:"id",width:100},
      {field:'name',headerName:"プロジェクト名",width:200}
  ]

  const handleRowClick = useCallback((params:GridRowParams)=>{
    replace(`/${params.id}/timeseries`);
  },[])

  const rows:GridRowsProp =projectData;
  
  return (
    <div style={{ height: 300, width: '80%' }}>
      <DataGrid 
        rows={rows}
        columns = {columns as unknown as GridColumns}
        onRowClick={handleRowClick}
      />
    </div>
  )
}