import {
  FaCar,
  FaDumbbell,
  FaEllipsisH,
  FaGift,
  FaGlassCheers,
  FaHome,
  FaMoneyBillWave,
  FaPills,
  FaPlane,
  FaShoppingCart,
  FaTv,
  FaUtensils
} from "react-icons/fa";

export const txTypesArray = ["income", "expense"];
export const txCategoriesArray = [
  { name: "salary", icon: FaMoneyBillWave },
  { name: "gift", icon: FaGift },
  { name: "groceries", icon: FaShoppingCart },
  { name: "housing", icon: FaHome },
  { name: "transportation", icon: FaCar },
  { name: "food", icon: FaUtensils },
  { name: "leisure", icon: FaGlassCheers },
  { name: "media", icon: FaTv },
  { name: "medicine", icon: FaPills },
  { name: "workout", icon: FaDumbbell },
  { name: "vacation", icon: FaPlane },
  { name: "other", icon: FaEllipsisH }
];
