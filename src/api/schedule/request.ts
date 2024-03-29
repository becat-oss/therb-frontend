import { IScheduleDetail } from "src/models/schedule";
import { IAPIResponse } from "../ApiResponse";
import { postMaterialTags_API } from "../tags/request";
import { ISchedule_get, ISchedule_post } from "./model";

//const isProd = process.env.NODE_ENV === "production";
const isProd=true;

export async function getSchedules_API() {
  //const url = `https://stingray-app-vgak2.ondigitalocean.app/schedules`;

  const url = isProd
    ? `https://stingray-app-vgak2.ondigitalocean.app/schedules`
    : `http://localhost:5000/schedules`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: IScheduleDetail[] = (data.data as ISchedule_get[]).map(
    (d) => {
      return {
        id: d.id,
        name: d.name,
        description: d.description,
        tags: d.tags?.map((t) => {
          return { label: t.name, id: t.id.toString() };
        }) || [],
        daily: d.daily,
        weekly: d.weekly,
        monthly: d.monthly,
      };
    }
  );
  return formattedData;
}

export async function saveScheduleDetail_API(
  schedule: IScheduleDetail
): Promise<IAPIResponse> {
  const tagsWithoutId = schedule.tags.filter((t) => t.id === null);
  if (tagsWithoutId.length > 0) {
    const tagsLabels = tagsWithoutId.map((t) => t.label);
    const newTags = await postMaterialTags_API(tagsLabels);
    if (newTags.status === "failed") {
      return { status: "failed", message: "Failed while posting Tags" };
    }
    console.log(newTags);
    const tagsWithId = schedule.tags.filter((t) => t.id !== null);
    schedule.tags = tagsWithId.concat(newTags.data);
  }

  const scheduleDetail_Post: ISchedule_post = {
    name: schedule.name,
    description: schedule.description,
    tagIds: schedule.tags?.map((t) => t.id) || [],
    daily: schedule.daily,
    weekly: schedule.weekly,
    monthly: schedule.monthly,
  };

  const url = `https://stingray-app-vgak2.ondigitalocean.app/schedules`;

  const responseData: IAPIResponse = {
    status: "failed",
    message: "",
    data: [],
  };
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
    body: JSON.stringify(scheduleDetail_Post), // body data type must match "Content-Type" header
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
