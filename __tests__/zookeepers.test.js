const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");
jest.mock("fs");

test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    {
      name: "Darlene",
      id: "dsaf3",
    },
    zookeepers
  );
  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("dsaf3");
});

test("filters by query", () => {
  const sampleZookeepers = [
    {
      id: "3",
      name: "Erica",
      favoriteAnimal: "gorilla",
      age: 16,
    },
    {
      id: "4",
      name: "Noel",
      favoriteAnimal: "bear",
      age: 18,
    },
  ];

  const updatedZookeepers = filterByQuery(
    { favoriteAnimal: "gorilla" },
    sampleZookeepers
  );

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const sampleZookeepers = [
    {
      id: "3",
      name: "Erica",
      favoriteAnimal: "gorilla",
      age: 16,
    },
    {
      id: "4",
      name: "Noel",
      favoriteAnimal: "bear",
      age: 18,
    },
  ];

  const result = findById("3", sampleZookeepers);

  expect(result.name).toBe("Erica");
});

test("validates age", () => {
  const zookeeper = {
    id: "3",
    name: "Erica",
    favoriteAnimal: "gorilla",
    age: 16,
  };

  const invalidZookeeper = {
    id: "3",
    name: "Noel",
    favoriteAnimal: "bear",
    age: "16",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
