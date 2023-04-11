import supabase from "../lib/db";

//Method to get all dog breeds
export const load = async () => {
  const getAllBreeds = async () => {
    let breeds = [];
    try {
      //Get all dog breeds
      let { data, error } = await supabase.from("dogs").select("Breed");
      breeds = data;

      return breeds
    } catch (e) {
      console.error(e);
    }
  };
  return {
    breeds: getAllBreeds()
  }
};
