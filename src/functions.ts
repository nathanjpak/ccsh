import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import axios from "axios";

// types
import { Coord, Polygon, MultiPolygon } from "@turf/helpers";

// config
import { apiURL } from "./config/dotenvConfig";
import { transporter, messageOptions } from "./config/nodemailerConfig";

export const pointInPolygon = (
  point: Coord,
  ...polygons: Polygon[]
): boolean => {
  if (polygons.length === 1) return booleanPointInPolygon(point, polygons[0]);

  // console.log("Multi!");

  let multiPolygon: MultiPolygon = {
    type: "MultiPolygon",
    coordinates: polygons.map((polygon) => {
      return polygon.coordinates;
    }),
  };

  return booleanPointInPolygon(point, multiPolygon);
};

export const fetchClinicianStatus = async (
  clinicianId: number
): Promise<any> => {
  const data = await axios(`${apiURL}/${clinicianId}`)
    .then((response) => {
      if (!response.data.error) return response.data.features;
      // send error email
      sendErrorEmail(response.data);
    })
    .catch((error) => {
      // send error email
      // status headers that are not 2xx
      if (error.response) {
        sendErrorEmail({
          data: error.response.data,
          status: error.response.status,
          header: error.response.header,
        });
        // request is not received
      } else if (error.request) {
        sendErrorEmail(error.request);
        // any other case
      } else {
        sendErrorEmail({ message: error.message });
      }
    });

  return data;
};

export const sendOutOfZoneEmail = (clinicianId: number) => {
  transporter.sendMail(
    {
      ...messageOptions,
      subject: "Clinician Status Alert. Clinician Out of Zone.",
      text: `Clinician ${clinicianId} is out of zone.`,
    },
    function (err: object) {
      if (err) return;
      // return string just for testing purposes
      return "Out of Zone";
    }
  );
};

export const sendErrorEmail = (error: object) => {
  const errorDetails = JSON.stringify(error);

  transporter.sendMail(
    {
      ...messageOptions,
      subject: "Clinician Status Error Alert.",
      text: `There was an error retrieving data from the API.
            There may be an issue with the API, AWS server, or the application.
            Error details are below:
            ${errorDetails}`,
    },
    function (err: object) {
      if (err) return;
      // return string just for testing purposes
      return "Error message";
    }
  );
};
