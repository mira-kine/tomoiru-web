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

export async function getFoodById(item) {
  try {
    const { data, error } = await client
      .from('food_recs')
      .select()
      .eq('id', item.id)
      .match();

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

export async function eatFood() {
  try {
    // create function
  } catch (error) {
    throw error;
  }
}
