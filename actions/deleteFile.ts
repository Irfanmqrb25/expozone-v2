"use server";

import { UTApi } from "uploadthing/server";

const deleteFiles = async (url: string) => {
  try {
    const utapi = new UTApi();
    const newUrl = url.substring(url.lastIndexOf("/") + 1);
    await utapi.deleteFiles(newUrl);
  } catch (error) {
    console.log(error);
  }
};

export default deleteFiles;
