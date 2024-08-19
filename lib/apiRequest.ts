// import { useRouter } from "next/navigation";
import { BioDataFormProps } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
type requestTypeProps={
    setLoading:any,
    endpoint:any,
    data:any,
    resourceName:string,
    reset?:any,
    redirect? :any 
}
export async function makePostRequest(
 { setLoading, endpoint, data, resourceName, reset, redirect }: requestTypeProps) {
  try {
    console.log(data)
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setLoading(false);
      toast.success(`New ${resourceName} Created Successfully`);
      return   {
        data:response.body,
        status:200,
        error:null
    }
    //   reset();
    //   redirect()
    } else {
      setLoading(false);
      if (response.status === 409) {

        toast.error("The Giving Warehouse Stock is NOT Enough");
      } else {
        toast.error("Something Went wrong");
      }
    }
    return   {
        data:response.body,
        status:200,
        error:null
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
    return {
        data:error,
        status:500,
        error:null
    }
  }
}

export async function makePutRequest(
 { setLoading,
  endpoint,
  data,
  resourceName,
  redirect}:requestTypeProps
) {
  try {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log(response);
      setLoading(false);
      toast.success(`${resourceName} Updated Successfully`);
     redirect()
      
    } else {
      setLoading(false);
      toast.error("Something Went wrong");
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}