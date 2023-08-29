// import React, { useEffect, useState } from "react";

// export function useFood(foodId) {
//   const [selectedFood, setSelectedFood] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFoodById = async () => {
//       try {
//         const resp = await getFoodById(foodId);
//         setSelectedFood(resp);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFoodById();
//   }, [foodId]);

//   if (loading) {
//     <h1>Loading...</h1>;
//   }

//   return { selectedFood, setSelectedFood };
// }
