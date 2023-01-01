import {
  fetchClinicianStatus,
  pointInPolygon,
  sendOutOfZoneEmail,
} from "./functions";

export const parentFunction = async () => {
  try {
    for (let clinicianId = 0; clinicianId <= 7; clinicianId++) {
      console.log(`clinician Id: ${clinicianId}`);
      let clinicianData = await fetchClinicianStatus(clinicianId);

      console.log(`clinician Data: ${clinicianData}`);
      if (!clinicianData) continue;

      let isClinicianInZone = pointInPolygon(
        clinicianData[0],
        clinicianData[1]
      );

      // console.log(isClinicianInZone);

      if (!isClinicianInZone) sendOutOfZoneEmail(clinicianId);
    }
  } catch (error) {
    return null;
  }
};

parentFunction();
// fetchClinicianStatus(8);
