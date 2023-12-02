import base from "./base.js";

const endpoint = "/usuario";

const findOne = async (id) => await base.get(`${endpoint}/${id}`);
const findAll = async () => await base.get(endpoint);
const create = async (payload) => await base.post(endpoint, payload);
const update = async (payload) => await base.put(`${endpoint}/${id}`, payload);
const remove = async (id) => await base.delete(`${endpoint}/${id}`);
const api = { findAll, create, update, remove, findOne };

export default api;
