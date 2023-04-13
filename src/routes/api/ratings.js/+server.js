import { json } from "@sveltejs/kit";
import supabase from "../../../lib/db";

export const GET = async ({url}) => {
  const dog = url.searchParams.get('dog')

  const getRatings = async () => {
    let breeds;
    try {
      let { data, error } = await supabase
        .from("dogs")
        .select("rating")
        .eq("Breed", dog);
      breeds = data;
      console.log(breeds)
      return breeds;
    } catch (e) {
      console.error(e);
    }    
  };

  const averages = await getRatings();

  return json(averages);
};
