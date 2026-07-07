import { GiCoffeeCup, GiKnifeFork } from "react-icons/gi";
import { LuToilet } from "react-icons/lu";
import { GiDutchBike } from "react-icons/gi";
import { IoBeerOutline } from "react-icons/io5";
import { MdLocalHotel } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { GrLocationPin } from "react-icons/gr";

export const placeTypes = {
  1: {
    icon: GiCoffeeCup,
    label: "Café",
  },
  2: {
    icon: LuToilet,
    label: "Baño",
  },
  3: {
    icon: GiKnifeFork,
    label: "Comida",
  },
  4: {
    icon: GiDutchBike,
    label: "Ciclopuerto",
  },
  5:{
    icon: IoBeerOutline,
    label: "Bar",
  },
  6:{
    icon: MdLocalHotel,
    label: "Hotel",
  },
  7:{
    icon: CiStar,
    label: "Turístico",
  },
  8:{
    icon: GrLocationPin ,
    label: "Sin tipo",
  },


};