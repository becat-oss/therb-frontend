import { useProjectListContext } from "./ProjectListContext";
import { DataGrid,GridColumns } from '@mui/x-data-grid';
import { GridCellParams, GridColDef, GridRowParams, GridRowsProp } from "@material-ui/data-grid";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";

export default function ProjectList(){
  const { projectData } = useProjectListContext();
  const { replace } = useRouter();

  const columns: GridColDef[] = [
    {field:'id',headerName:"id",flex:1},
    {field:'name',headerName:"プロジェクト名",flex:2},
    {field:'download',headerName:"データダウンロード",flex:2}
    // {
    //   field:'download',headerName:"データダウンロード",
    //   flex:2,
    //   //renderCell:(params:GridCellParams)=><Button variant="contained" color="primary">ダウンロード</Button>
    // }
]

  const handleRowClick = useCallback((params:GridRowParams)=>{
    replace(`/${params.id}/timeseries`);
  },[])

  const rows:GridRowsProp =projectData;
  
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid 
        rows={rows}
        columns = {columns as unknown as GridColumns}
        onRowClick={handleRowClick}
      />
    </div>
  )
}