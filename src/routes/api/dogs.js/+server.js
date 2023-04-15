import { json } from "@sveltejs/kit";
import supabase from "../../../lib/db";

export const GET = async ({url}) => {
  const dog = url.searchParams.get('dog')

  const getAllDogs = async () => {
    let breeds;
    try {
      let { data, error } = await supabase.from("dogs").select("Breed");
      breeds = data;
      return breeds;
    } catch (e) {
      console.error(e);
    }
  };

  const dogs = await getAllDogs();

  return json(dogs);
};
