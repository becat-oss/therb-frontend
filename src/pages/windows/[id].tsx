import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { IConstructionDetail } from "src/models/construction";
import { getTransparentMaterials_API } from "src/api/material/request";
import { IMaterialDetail } from "src/models/material";
import { getTags_API } from "src/api/tags/request";
import {
  getWindowDetails_API,
  saveWindowDetail,
} from "src/api/window/requests";
import ConstructionDetailComponent, {
  ITagType,
} from "src/components/construction/construction-detail";

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
  const { t } = useTranslation("add-window");
  const categories = ["window"];
  const onSubmit = async (constructionDetailToSave: IConstructionDetail) => {
    return await saveWindowDetail(constructionDetailToSave);
  };

  const onAfterSubmit = () =>{
    router.push("../windows");
  }

  const onCancel = () => {
    router.push("../windows");
  };
  return (
    <Box>
      <ConstructionDetailComponent
        constructionDetail={constructionDetail}
        materialDetails={materialDetails}
        materialTags={materialTags}
        categories={categories}
        t={t}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onAfterSubmit={onAfterSubmit}
      ></ConstructionDetailComponent>
    </Box>
  );
}

// This gets called on every request
export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  let materialDetails = await getTransparentMaterials_API();
  materialDetails = materialDetails.filter((m) => m.classification !== 1);
  const materialTags = await getTags_API();
  if (params.id === "new")
    return {
      props: { constructionDetail: null, materialDetails, materialTags },
    };
  // Fetch data from external API
  const constructionDetails = await getWindowDetails_API();

  const constructionDetail = constructionDetails.filter(
    (d) => d.id === params.id
  )[0];
  // Pass data to the page via props
  return { props: { constructionDetail, materialDetails, materialTags } };
}
