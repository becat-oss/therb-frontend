import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { getConstructionDetails_API } from "src/api/construction/requests";
import { IConstructionDetail } from "src/models/construction";
import { getEnvelopeDetails_API, saveEnvelope } from "src/api/envelope/request";
import { IEnvelope } from "src/models/envelope";
import { getTags_API } from "src/api/tags/request";
import { getWindowDetails_API } from "src/api/window/requests";
import { EnvelopeDetailComponent } from "src/components/envelope/envelope-detail";
import { ITagType } from "src/components/construction/construction-detail";
import { Box } from "@mui/material";

export default function Envelope({
  envelope,
  materialTags,
  constructionDetails,
  windowDetails,
}: {
  envelope: IEnvelope;
  materialTags: ITagType[];
  constructionDetails: IConstructionDetail[];
  windowDetails: IConstructionDetail[];
}): React.ReactElement {
  const { t } = useTranslation("add-envelope");
  const router = useRouter(); 

  const onSubmit = async (envelopeToSave: Omit<IEnvelope, "id">) => {   
    return await saveEnvelope(envelopeToSave);
  };

  const onAfterSubmit = () =>{
    router.push("../envelopes");
  }

  const onCancel = () => {
      router.push("../envelopes");
  };
  return (
    <Box>
      <EnvelopeDetailComponent
        envelope={envelope}
        materialTags={materialTags}
        constructionDetails={constructionDetails}
        windowDetails={windowDetails}
        t={t}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onAfterSubmit={onAfterSubmit}
      ></EnvelopeDetailComponent>
    </Box>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const materialTags = await getTags_API();
  const constructionDetails = await getConstructionDetails_API();
  const windowDetails = await getWindowDetails_API();
  if (params.id === "new")
    return {
      props: {
        envelope: null,
        materialTags,
        constructionDetails,
        windowDetails,
      },
    };
  const envelopeDetails = await getEnvelopeDetails_API();
  const envelope = envelopeDetails.filter(
    (d) => d.id.toString() === params.id
  )[0];
  return {
    props: { envelope, materialTags, constructionDetails, windowDetails },
  };
}
