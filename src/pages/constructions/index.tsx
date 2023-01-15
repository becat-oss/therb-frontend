import React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { getConstructionDetails_API } from "src/api/construction/requests";
import { IConstructionDetail } from "src/models/construction";
import ConstructionListComponent from "src/components/construction/construction-list";

export default function ConstructionList({
  constructionDetails,
}: {
  constructionDetails: IConstructionDetail[];
}): React.ReactElement {
  const router = useRouter();
  const addMaterial = (e: any) => {
    e.preventDefault();
    router.push("../constructions/new");
  };

  const viewMaterial = (id: string) => {
    router.push(`../constructions/${id}`);
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

export async function getServerSideProps() {
  const constructionDetails = await getConstructionDetails_API();
  return {
    props: { constructionDetails }
  };
}