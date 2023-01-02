import {
  fetchClinicianStatus,
  pointInPolygon,
  sendErrorEmail,
  sendOutOfZoneEmail,
} from "./functions";

export const parentFunction = async () => {
  try {
    for (let clinicianId = 1; clinicianId <= 6; clinicianId++) {
      console.log(`clinician Id: ${clinicianId}`);
      let clinicianData = await fetchClinicianStatus(clinicianId);

      if (!clinicianData) continue;

      let isClinicianInZone = pointInPolygon(
        clinicianData[0],
        clinicianData[1]
      );

      if (!isClinicianInZone) sendOutOfZoneEmail(clinicianId);
    }
  } catch (error: unknown) {
    if (error instanceof Error) sendErrorEmail(error);
    return null;
  }
};

// run immediately once and then every 3 minutes
parentFunction();
setInterval(parentFunction, 3 * 60 * 1000); /* delay of 3 minutes */
