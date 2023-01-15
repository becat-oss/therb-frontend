import React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { IConstructionDetail } from "src/models/construction";
import { getWindowDetails_API } from "src/api/window/requests";
import ConstructionListComponent from "src/components/construction/construction-list";

export default function ConstructionList({
  constructionDetails,
}: {
  constructionDetails: IConstructionDetail[];
}): React.ReactElement {
  const router = useRouter();

  const addMaterial = (e: any) => {
    e.preventDefault();
    router.push("../windows/new");
  };

  const viewMaterial = (id: string) => {
    router.push(`../windows/${id}`);
  };

  return (
    <Box>
      <ConstructionListComponent
        constructionDetails={constructionDetails}
        addNew={addMaterial}
        viewDetail={viewMaterial}
      ></ConstructionListComponent>      
    </Box>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const constructionDetails = await getWindowDetails_API();
  console.log('constructionDetails',constructionDetails)

  // Pass data to the page via props
  return {
    props: { constructionDetails }
  };
}
