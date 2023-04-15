import { json } from "@sveltejs/kit";
import supabase from "../../../lib/db";

export const GET = async ({url}) => {
  const dog = url.searchParams.get('dog')

  const getAverages = async () => {
    let breeds;
    try {
      let { data, error } = await supabase
        .from("dogs")
        .select("avg_energy, avg_obedience, avg_size, avg_compassion, avg_health, avg_cleanliness")
        .eq("Breed", dog);
      breeds = data;
      console.log(breeds)
      return breeds;
    } catch (e) {
      console.error(e);
    }    
  };

  const averages = await getAverages();

  return json(averages);
};
