import { json } from "@sveltejs/kit";
import supabase from "../../../lib/db";

export const GET = async ({url}) => {
  const dog = url.searchParams.get('dog')

  const getRatings = async () => {
    let ratings;
    try {
      let { data, error } = await supabase
        .from("dogs")
        .select("rating")
        .eq("Breed", dog);
      ratings = data;
      console.log(ratings)
      return ratings;
    } catch (e) {
      console.error(e);
    }    
  };

  const averages = await getRatings();

  return json(averages);
};
