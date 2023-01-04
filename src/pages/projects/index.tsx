import { DataGrid, GridColumns } from "@mui/x-data-grid";
import {
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@material-ui/data-grid";
import {
  deleteProjectData,
  deleteTherbData,
  getDownload,
  getProjectData,
} from "src/api/KeyRequests";
import { ProjectData } from "src/AppTypes";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProjectList({
  projectData,
}: {
  projectData: ProjectData[];
}) {
  const { replace } = useRouter();

  // const { projectData } = useProjectListContext();
  //TODO: allProjectsのエンドポイントがうまくいってない
  // const { loading,error,data } = useQuery(GET_PROJECTS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error {JSON.stringify(error)}(</p>;

  // console.log('data from apollo',data);

  const [projects, setprojects] = useState(projectData);

  const handleDetailClick = async (id: number) => {
    //replace(`/timeseries/${params.id}`);
    const response = await getDownload("png", id);
    replace(response.url);
  };

  const handleDeleteClick = async (id: number) => {
    const index = projects.findIndex((p) => p.id === id);
    if (index >= 0) {
      const response1 = await deleteProjectData(`${id}`);
      const response2 = await deleteTherbData(`${id}`);
      const newProjectList = [...projects];
      const deletedProject = newProjectList.splice(index, 1)[0];
      console.log(`${deletedProject.name} is deleted`);
      setprojects(newProjectList);
    }
  };

  const handleDownloadClick = async (id: number) => {
    const response = await getDownload("excel", id);
    replace(response.url);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", flex: 1 },
    { field: "name", headerName: "プロジェクト名", flex: 2 },
    { field: "comfortableTime", headerName: "Comfortable Time", flex: 2 },
    {
      field: "detail",
      headerName: "グラフデータ",
      flex: 2,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDetailClick(params.row.id)}
        >
          詳細
        </Button>
      ),
    },
    {
      field: "download",
      headerName: "Excelデータダウンロード",
      flex: 2,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDownloadClick(params.row.id)}
        >
          ダウンロード
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "データ削除",
      flex: 2,
      renderCell: (params: GridCellParams) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          削除
        </Button>
      ),
    },
  ];

  const rows: GridRowsProp = projects;

  return (
    <DataGrid
      rows={rows}
      columns={columns as unknown as GridColumns}
      // onRowClick={handleRowClick}
    />
  );
}

export async function getServerSideProps() {
  const res = await getProjectData();
  return {
    props: {
      projectData: res.data || [],
    },
    // revalidate: 10, // In seconds
  };
}
