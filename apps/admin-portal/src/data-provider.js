import { countryMappings } from "./resources/country";
import { cityMappings } from "./resources/city";

const mappings = {
  country: countryMappings,
  city: cityMappings,
};

const getMapper = (resourceName, methodName) => {
  const mapper = mappings[resourceName][methodName];

  console.log("Mapper found", resourceName, methodName, mapper);
  if (!mapper) {
    throw new Error(`Mapper not found for: ${resourceName}:${methodName}`);
  }

  return mapper;
};

const dataProvider = {
  getList: async (resource, params) => {
    const mapper = getMapper(resource, "getList");
    return await mapper(params);
  },

  getOne: async (resource, params) => {
    let mapper
    try {
      mapper = getMapper(resource, "getOne");
    } catch (error) {
      throw new Error("not implemented");
    }
    return await mapper(params);
  },
  getMany: async (resource, params) => {
    throw new Error("not implemented");
  },
  getManyReference: async (resource, params) => {
    throw new Error("not implemented");
  },
  create: async (resource, params) => {
    const mapper = getMapper(resource, "create");
    return await mapper(params);
  },
  update: async (resource, params) => {
    let mapper
    try {
      mapper = getMapper(resource, "update");
    } catch (error) {
      throw new Error("not implemented");
    }
    return await mapper(params);
  },
  updateMany: async (resource, params) => {
    throw new Error("not implemented");
  },
  delete: async (resource, params) => {
    const mapper = getMapper(resource, "delete");
    return await mapper(params);
  },
  deleteMany: async (resource, { ids }) => {
    const deleteMapper = getMapper(resource, "delete");
    const deletePromises = await Promise.all(
      ids.map(async (id) => await deleteMapper({ id }))
    );

    return { data: deletePromises };
  },
};

export default dataProvider;
