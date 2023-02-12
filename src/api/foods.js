import { checkError, client } from './client';

export async function getFoods() {
  // function to get foods from the database
  try {
    const { data, error } = await client.from('food_recs').select('*');

    if (error) {
      throw error;
    }

    if (data) {
      return [...data];
    }
  } catch (error) {
    throw error;
  }
}

export async function getFoodById(id) {
  try {
    const { data, error } = await client
      .from('food_recs')
      .select()
      .match({ id })
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      return { ...data };
    }
  } catch (error) {
    throw error;
  }
}

export async function eatFood(currentUser, selectedFood) {
  try {
    // create function
    // what do I want to do? :
    // when I eat the food, add into my_foods and set as done = true
    // add cute animation
    // go back to dashboard
    // happiness meter goes up (later on)
    // if you eat the food, add to my_foods by id = rec_id in my_foods
    // insert according to session user
    //  set done as false
    const resp = await client.from('my_foods').insert({
      uuid: currentUser.id,
      name: selectedFood.name,
      rec_id: selectedFood.id,
      done: true,
    });
    return checkError(resp);
  } catch (error) {
    throw error;
  }
}
