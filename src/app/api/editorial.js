import base from './base.js'

const endpoint = '/editorial';

const findAll = async () => await base.get(endpoint);
const create = async (payload) => await base.post (endpoint, payload);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);
const update = async(payload) => await base.put(endpoint, payload);
const remove= async(id)=> await base.delete(`${endpoint}/${id}`);

const api = { findAll, create, findOne, update, remove}

export default api;