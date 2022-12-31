import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import axios from "axios";

// types
import { Coord, Polygon } from "@turf/helpers";

import dotenv from "dotenv";

dotenv.config();
const apiURL = process.env.API_URL || "";

export const checkClinicianInPolygon = (): boolean => {
  return true;
};

export const pointInPolygon = (point: Coord, polygon: Polygon): boolean => {
  return booleanPointInPolygon(point, polygon);
};

export const fetchClinicianStatus = async (
  clinicianId: number
): Promise<any> => {
  const data = await axios(`${apiURL}/clinicianstatus/${clinicianId}`)
    .then((response) => {
      if (!response.data.error) return response.data.features;
      // send error email
    })
    .catch((error) => {
      // send error email
      console.log(error);
    });

  return data;
};

console.log(fetchClinicianStatus(7));
