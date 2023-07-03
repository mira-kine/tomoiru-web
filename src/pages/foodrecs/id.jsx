// import React, { useState } from 'react';
// import { useFood } from '../../hooks/useFood';
// import './SelectedFood.css';

// export default function SelectedFood() {
//   // refactoring to set food display by ID
//   const { id } = useParams();
//   const { selectedFood } = useFood(id);
//   const navigateTo = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleBack = () => {
//     navigateTo('/dashboard/food-recs');
//   };

//   const handleEat = async () => {
//     //   set some type of selectedFood
//     setLoading(true);
//     // await eatFood(currentUser, selectedFood);
//     await new Promise((r) => setTimeout(r, 1500));
//     setLoading(false);
//     navigateTo('/dashboard');
//   };

//   return (
//     <>
//       {loading ? (
//         <div className="home-container">
//           <div id="loading-page">
//             {/* <img
//               alt="sushi loading prop"
//             /> */}
//           </div>
//         </div>
//       ) : (
//         <div className="home-container">
//           <div id="foodlist-with-display">
//             <div key={selectedFood.id} id="foodlist-container">
//               <div id="button-container">
//                 <span id="food-name-title">{selectedFood.name}</span>
//               </div>
//               <div id="food-description-container">
//                 <span>{selectedFood.description}</span>
//               </div>
//               <div id="button-options-container">
//                 <button className="button button--yellow" onClick={handleBack}>
//                   <div className="button__wrapper">
//                     <div className="button__text">Back to list</div>
//                   </div>
//                 </button>
//                 <button
//                   className="button button--yellow"
//                   onClick={() => handleEat(selectedFood)}
//                 >
//                   <div className="button__wrapper">
//                     <div className="button__text">Eat this!</div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
