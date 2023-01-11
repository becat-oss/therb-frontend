import { ITag } from "src/models/tags";
import { IAPIResponse } from "../ApiResponse";
import { ITag_get } from "./model";

//const isProd = process.env.NODE_ENV === "production";
const isProd=true;

export async function getTags_API() {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/tags`;

  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/tags`
  //   : `http://localhost:5000/tags`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  const formattedData: ITag[] = (data.data as ITag_get[]).map((d) => {
    return {
      id: d.id,
      label: d.name || null,
    };
  });
  return formattedData;

  // return tags.map((t,i)=>{return {id: i.toString(), label: t}}) as ITag[];
}

export async function postMaterialTags_API(newtags: string[]): Promise<IAPIResponse> {
  const url = `https://stingray-app-vgak2.ondigitalocean.app/tags`;
  // const url = isProd
  //   ? `https://stingray-app-vgak2.ondigitalocean.app/tags`
  //   : `http://localhost:5000/tags`;

  const tagsToPost = newtags.map((t) => {
    return { name: t, description: "" };
  });

  const responseData: IAPIResponse = {
    status: "failed",
    message: "",
    data: [],
  };
  for (const tag of tagsToPost) {
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
      body: JSON.stringify(tag), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    if(data.status === 'success'){
      responseData.data.push(data.data);
      responseData.status = "success";
      responseData.message = "";
    }
    else{
      responseData.message = data.message;
    }
  }
  return responseData;

  // const data = await response.json();
  // return data;
  // const prevtagsCount = tags.length;
  // tags.push(...newtags);

  // return newtags.map((t,i)=>{return {id: (prevtagsCount+i), name: t}}) as ITag_get[];
}