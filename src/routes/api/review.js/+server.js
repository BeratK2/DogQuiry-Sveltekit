import { json } from "@sveltejs/kit";
import supabase from "../../../lib/db";

export const GET = async ({url}) => {
  const dog = url.searchParams.get('dog');
  const rating = url.searchParams.get('rating');
  
  //Method to add JSON body to database and update averages
  const ratingSubmit = async () => {
    //Get JSON body for corresponding breed
    const { data, error } = await supabase
      .from("dogs")
      .select("rating")
      .eq("Breed", dog);
    if (error) {
      console.error(error);
      return;
    }

    let json_array;

    let my_rating = (JSON.parse(rating));

    //Check whether or not there is existing JSON data and append all data
    if (data[0]["rating"] === null) {
      json_array = my_rating;
    } else {
      json_array = data[0]["rating"];
      json_array.push(my_rating);
    }

    console.log(json_array)

    // Calculate the averages of value1, value2, and value3
    const avg_size =
      json_array.reduce((total, current) => total + current.Size, 0) / json_array.length;
    const avg_energy =
      json_array.reduce((sum, obj) => sum + obj.Energy, 0) / json_array.length;
    const avg_health =
      json_array.reduce((sum, obj) => sum + obj.Health, 0) / json_array.length;
    const avg_obedience =
      json_array.reduce((sum, obj) => sum + obj.Obedience, 0) /
      json_array.length;
    const avg_cleanliness =
      json_array.reduce((sum, obj) => sum + obj.Cleanliness, 0) /
      json_array.length;
    const avg_compassion =
      json_array.reduce((sum, obj) => sum + obj.Compassion, 0) /
      json_array.length;

    console.log(Math.round(avg_energy));

    //Update row with new array
    const { error: update_error } = await supabase
      .from("dogs")
      .update({ rating: json_array })
      .eq("Breed", dog);

    if (update_error) {
      console.error(update_error);
      return;
    }

    const { error: avgError } = await supabase
      .from("dogs")
      .update({
        avg_obedience: Math.round(avg_obedience),
        avg_size: Math.round(avg_size),
        avg_energy: Math.round(avg_energy),
        avg_health: Math.round(avg_health),
        avg_cleanliness: Math.round(avg_cleanliness),
        avg_compassion: Math.round(avg_compassion),
      })
      .eq("Breed", dog);

    if (avgError) {
      console.error(avgError);
    }

    console.log("Row updated successfully");
  };

  const submission = await ratingSubmit();

  return json(submission);

};
