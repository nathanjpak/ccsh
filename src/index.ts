import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import axios from "axios";

// types
import { Coord, Polygon } from "@turf/helpers";

import dotenv from "dotenv";

dotenv.config();
const apiURL = process.env.API_URL || "";

// export const checkClinicianInPolygon = (clinicianData: Array<any>): boolean => {
//   return pointInPolygon(clinicianData[0], clinicianData[1]);
// };

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

export const sendEmail = () => {};

export const parentFunction = async () => {
  // let clinicianData = await fetchClinicianStatus(7);
  // console.log(clinicianData);
  try {
    for (let clinicianId = 1; clinicianId <= 7; clinicianId++) {
      let clinicianData = await fetchClinicianStatus(clinicianId);

      console.log(pointInPolygon(clinicianData[0], clinicianData[1]));
    }
  } catch (error) {
    // console.log(error);
    return null;
  }
};

parentFunction();
