import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import {
  getConstructionDetails_API,
  saveConstructionDetail,
} from "src/api/construction/requests";
import { IConstructionDetail } from "src/models/construction";
import { getMaterials_API } from "src/api/material/request";
import { IMaterialDetail } from "src/models/material";
import { getTags_API } from "src/api/tags/request";
import { ConstructionCategory } from "src/models/category";
import ConstructionDetailComponent, { ITagType } from "src/components/construction/construction-detail";


export default function Construction({
  constructionDetail,
  materialDetails,
  materialTags,
}: {
  constructionDetail: IConstructionDetail;
  materialDetails: IMaterialDetail[];
  materialTags: ITagType[];
}): React.ReactElement {
  const router = useRouter();
  const { t } = useTranslation("add-construction");  

  const categories = Object.values(ConstructionCategory).filter(
    (cat) => cat !== ConstructionCategory.WINDOW
  );

  const onSubmit = async (constructionDetailToSave: IConstructionDetail) => {  
      return await saveConstructionDetail(constructionDetailToSave);
  };

  const onAfterSubmit = () =>{
    router.push("../constructions");
  }

  const onCancel = () => {    
      router.push("../constructions");
  };

  return (
    <Box>
      <ConstructionDetailComponent constructionDetail={constructionDetail} materialDetails={materialDetails} materialTags={materialTags} categories={categories} t={t} onCancel={onCancel} onSubmit={onSubmit} onAfterSubmit={onAfterSubmit}></ConstructionDetailComponent>
    </Box> 
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  let materialDetails = await getMaterials_API();
  materialDetails = materialDetails.filter((m) => m.classification === 1);
  const materialTags = await getTags_API();
  if (params.id === "new")
    return {
      props: { constructionDetail: null, materialDetails, materialTags },
    };
  const constructionDetails = await getConstructionDetails_API();

  const constructionDetail = constructionDetails.filter(
    (d) => d.id === params.id
  )[0];
  return { props: { constructionDetail, materialDetails, materialTags } };
}
