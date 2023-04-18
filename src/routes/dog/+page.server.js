import supabase from "../../lib/db";

//Method to get all dog breeds
export const load = async ({page, fetch, params}) => {
  const {input} = params;
  
  const { data, error } = await supabase
    .from("dogs")
    .select("avg_energy")
    .eq("Breed", input);
  console.log(input)
  console.log(data);
  if (error) {
    console.error(error);
    return {
      props:{
        data
      },
    };
  }

  return {
    energy: data,
  };
};
