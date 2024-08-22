import { formatFileSize } from "@/lib/utils";
import { UploadDropzone } from "@/utils/uploadthings";
import { FileIcon, Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
export type File={
    name:string;
    size:number;
    url:string;
}
type MultiImageInputProps={
    label:string;
    files:File[];
    setFiles:any;
    className:string;
    endpoint:string;
}
export default function MultiFileUploader({
  label,
  files = [],
  setFiles,
  className = "col-span-full",
  endpoint = " multiProductsUploader",
}:MultiImageInputProps) {
  function handleImageRemove(index:any){
    const updatedImages=files.filter((image,i)=>i!==index)
    setFiles(updatedImages)
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
        >
          {label}
        </label>
        
      </div>
      {files.length>0 ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
        {files.map((file,i)=>{
            console.log(file)
          return(
<div className="relative flex items-center gap-2 text-gray-500 dark:text-gray-500" key={i}>
              <button onClick={()=>handleImageRemove(i)} className="absolute -top-4 -right-2 bg-slate-100 text-red-600 rounded-full">
                <XCircle/>
              </button>
              
                <FileIcon size="30" className="shrink-0" />
                <div className="min-w-0 text-sm">
                  <div className="text-gray-400 dark:text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </div>
                  
                </div>
            </div>
          )
        })}
       </div>
      ) : (
        <UploadDropzone
          endpoint={"doctorProfessionDocs"}
          onClientUploadComplete={(res) => {
            // setImageUrl(res[0].url);
            // Do something with the response
            const urls=res.map((item,i)=>{
                return {
                    url:item.url,
                    name:item.name,
                    size:item.size
                }
            })
            setFiles(urls)
            toast.success("Image Upload complete")
            console.log("Files: ", res);
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Image Upload Failed,Try Again")
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}