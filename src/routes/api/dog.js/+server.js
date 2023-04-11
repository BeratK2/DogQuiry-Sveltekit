import { json } from "@sveltejs/kit";
import supabase from "../../../lib/db";

export const GET = async ({input}) => {
  const getBreed = async () => {
    let breeds;
    try {
      let { data, error } = await supabase
        .from("dogs")
        .select("avg_energy")
        .eq("Breed", input);
      breeds = data;
      console.log(breeds)
      return breeds;
    } catch (e) {
      console.error(e);
    }    
  };
  return json(getBreed())
};
