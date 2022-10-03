import { IScheduleDetail } from "src/models/schedule";
import { IAPIResponse } from "../ApiResponse";
import { ISchedule_get, ISchedule_post } from "./model";

export async function getSchedules_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/schedules`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IScheduleDetail[] = (data.data as ISchedule_get[]).map(
    (d) => {
      return {
        id: d.id,
        name: d.name,
        description: d.description,
        tagIds: d.tagIds || [],
        daily: d.daily[0],
        weekly: d.weekly[0],
        monthly: d.monthly[0],
      };
    }
  );
  return formattedData;
}

export async function saveScheduleDetail_API(schedule: ISchedule_post): Promise<IAPIResponse> {
  // const tagsWithoutId = material.tags.filter((t) => t.id === null);
  // if (tagsWithoutId.length > 0) {
  //   const tagsLabels = tagsWithoutId.map((t) => t.label);
  //   const newTags = await postMaterialTags_API(tagsLabels);
  //   if (newTags.status === "failed") {
  //     return { status: "failed", message: "Failed while posting Tags" };
  //   }
  //   console.log(newTags);
  //   const tagsWithId = material.tags.filter((t) => t.id !== null);
  //   material.tags = tagsWithId.concat(newTags.data);
  // }

  const url = `https://stingray-app-vgak2.ondigitalocean.app/schedules`;

  

  const responseData: IAPIResponse = {
    status: "failed",
    message: "",
    data: [],
  };
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/constructions`
  //   : `http://localhost:5000/constructions`;
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(schedule), // body data type must match "Content-Type" header
  });
  const data = await response.json();
  if (data.status === "success") {
    responseData.status = "success";
    responseData.data = [data.data];
  } else {
    responseData.status = "failed";
    responseData.message = data.message;
  }
  return responseData;
}
