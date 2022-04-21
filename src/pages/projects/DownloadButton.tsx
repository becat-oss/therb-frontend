import React from 'react';
import { GridCellParams } from "@material-ui/data-grid";
import Button from '@material-ui/core/Button';
import { getDownload } from 'src/api/KeyRequests';
import { useRouter } from 'next/router';

interface Props{
  params: GridCellParams["row"];
}
export default function DownloadButton({params}:Props):React.ReactElement{ 
  const { replace } = useRouter();
  
  const handleClick = () =>{
    // async function download(){
    //   const response = await getDownload(params.name);
    //   console.log('response["data"]',response["data"]);
    // }
    // console.log('click');
    // download();
    replace(`http://localhost:5000/download/${params.name}`);
  }

  return(
    <Button 
      variant="contained" 
      color="primary"
      onClick={handleClick}
    >
      ダウンロード
    </Button>
  )
}
