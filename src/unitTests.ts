import { expect } from "chai";
import { pointInPolygon } from "./functions";
// import { fetchClinicianStatus } from "./functions";
import { Coord, Polygon } from "@turf/helpers";

describe("pointInPolygon Function", function () {
  // test Data
  let testPolygon: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [-122.26487159729002, 37.482282467501285],
        [-122.24324226379393, 37.482282467501285],
        [-122.24324226379393, 37.49855903614401],
        [-122.26487159729002, 37.49855903614401],
        [-122.26487159729002, 37.482282467501285],
      ],
    ],
  };

  it("it should return true for a point in polygon", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.25, 37.49],
      },
    };

    let result = pointInPolygon(testPoint, testPolygon);
    expect(result).to.be.a("boolean");
    expect(result).to.equal(true);
  });

  it("it should return false for a point outside of polygon", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.22101211547853, 37.478604425233506],
      },
    };

    let result = pointInPolygon(testPoint, testPolygon);
    expect(result).to.be.a("boolean");
    expect(result).to.equal(false);
  });

  it("it should return true for a vertex", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.26487159729002, 37.482282467501285],
      },
    };

    let result = pointInPolygon(testPoint, testPolygon);
    expect(result).to.be.a("boolean");
    expect(result).to.equal(true);
  });

  it("it should return true for a point on the border", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.25, 37.482282467501285],
      },
    };

    let result = pointInPolygon(testPoint, testPolygon);
    expect(result).to.be.a("boolean");
    expect(result).to.equal(true);
  });

  let testMultiPolygonPartA: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [-122.30946063995361, 37.548218088360116],
        [-122.31645584106445, 37.53875852887022],
        [-122.29770183563231, 37.53882658754147],
        [-122.30946063995361, 37.548218088360116],
      ],
    ],
  };
  let testMultiPolygonPartB: Polygon = {
    type: "Polygon",
    coordinates: [
      [
        [-122.28710174560547, 37.52000599905024],
        [-122.29216575622559, 37.51251728365287],
        [-122.28238105773926, 37.513130024958315],
        [-122.28710174560547, 37.52000599905024],
      ],
    ],
  };

  it("it should return true for a point inside a multipolygon", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.286, 37.515],
      },
    };

    let result = pointInPolygon(
      testPoint,
      testMultiPolygonPartA,
      testMultiPolygonPartB
    );
    expect(result).to.be.a("boolean");
    expect(result).to.equal(true);
  });

  it("it should return false for a point outside a multipolygon", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.286, 37.535],
      },
    };

    let result = pointInPolygon(
      testPoint,
      testMultiPolygonPartA,
      testMultiPolygonPartB
    );
    expect(result).to.be.a("boolean");
    expect(result).to.equal(false);
  });

  it("it should return true for a vertex of a multipolygon", function () {
    let testPoint: Coord = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-122.28710174560547, 37.52000599905024],
      },
    };

    let result = pointInPolygon(
      testPoint,
      testMultiPolygonPartA,
      testMultiPolygonPartB
    );
    expect(result).to.be.a("boolean");
    expect(result).to.equal(true);
  });
});

// describe("fetchClinicianStatus Function", function () {
//   it("it should return an array with clinician's position and polygon", async function () {
//     const result = await fetchClinicianStatus(7);
//     expect(result).to.be.an("array");
//     expect(result).to.have.property("length").that.equals(2);
//     expect(result[0]).to.have.property("geometry");
//     expect(result[0].geometry.type).to.equal("Point");
//     expect(result[0].geometry.coordinates.length).to.equal(2);
//     expect(result[1]).to.have.property("geometry");
//     expect(result[1].geometry.type).to.equal("Polygon");
//     expect(result[1].geometry.coordinates[0].length).to.equal(5);
//   });

//   it("it should return nothing if id is invalid", async function () {
//     const result = await fetchClinicianStatus(8);
//     expect(result).to.be.an("undefined");
//   });
// });
