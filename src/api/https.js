import axios from "axios";
import { endpoint } from "./endpoints";

export async function getReserva() {
  const { data } = await axios.get(endpoint.reserva.list());
  return data;
}

export async function getUserId(id) {
  const { data } = await axios.get(endpoint.usuario.id(id));
  return data;
}

export async function updateUser(info) {
  const { data } = await axios.put(endpoint.usuario.list(), info);
  return data;
}

export async function getLibros(id) {
  const { data } = await axios.get(endpoint.libro.list());
  return data;
}

export async function createLibro(info) {
  const { data } = await axios.post(endpoint.libro.list(), info);
  return data;
}

export async function updateLibro(info) {
  const { data } = await axios.put(endpoint.libro.list(), info);
  return data;
}

export async function deleteLibro(id) {
  const { data } = await axios.delete(endpoint.libro.id(id));
  return data;
}
