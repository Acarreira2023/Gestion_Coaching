// src/utils/listados.js

// -------------------- CATEGORÍAS --------------------
export const categoriasIngreso = [
  "SESIÓN",
  "TALLER",
  "RETO WHATSAPP",
  "EBOOKS",
  "AUDIOS"
].map((v) => ({
  value: v,
  labelKey: v.toLowerCase().replace(/\s+/g, "_")
}));

export const categoriasEgreso = [
  "COMISIONES",
  "PUBLICIDAD",
  "ALQUILER",
  "REFRIGERIO",
  "IMPRESION",
  "ELEMENTOS DE TRABAJO",
  "LIBRERIA",
  "ENVIOS",
  "CAPACITACIONES",
  "TERAPIA PERSONAL",
  "MOVILIDAD"
].map((v) => ({
  value: v,
  labelKey: v.toLowerCase().replace(/\s+/g, "_")
}));

// -------------------- INGRESOS --------------------
export const sesion = ["SESIÓN"];
export const taller = ["NO NACIDOS", "RITO DEL ÚTERO", "EL ARTE DE AMARTE"];
export const ebooks = ["MANTRAS PARA TU FERTILIDAD", "99 PREGUNTAS PARA TU AMOR PROPIO"];
export const retoWhatsapp = ["#21DIASPARATUAMORPROPIO"];
export const audios = ["MEDITACIONES"];
export const modalidadRaw = ["PRESENCIAL", "ONLINE", "GRABADO"];
export const mediosIngresoRaw = ["EFECTIVO", "MERCADO LIBRE", "TRANSFERENCIA BANCARIA", "OPENPAY"];

// -------------------- EGRESOS --------------------
export const comisiones = ["MERCADO LIBRE", "PAYPAL", "OPENPAY", "BANCARIAS"];
export const publicidades = ["INSTAGRAM", "META"];
export const alquiler = ["SALA", "CONSULTORIO"];
export const refrigerio = ["BEBIDAS", "COMIDA", "DESCARTABLES"];
export const impresion = ["TARJETAS", "FOLLETOS", "SOUVENIRS", "DECORACIÓN"];
export const elementosDeTrabajo = ["VELAS","TRIPODE","AURICULARES","MANTAS","PIEDRAS","ORÁCULO","COLCHONETAS","ALMOHADONES","MANTELES"];
export const libreria = ["ÚTILES", "LIBROS"];
export const capacitaciones = ["ONLINE", "PRESENCIAL"];
export const terapiaPersonal = ["SESIONES", "TALLERES"];
export const movilidad = ["TRANSPORTE PÚBLICO", "TAXI Y OTROS", "ESTACIONAMIENTO"];
export const envios = ["CORREO"];
export const mediosEgresoRaw = ["EFECTIVO", "MERCADO LIBRE", "TRANSFERENCIA BANCARIA", "OPENPAY"];

// -------------------- HELPER --------------------
const toItems = (arr) =>
  arr.map((v) => ({
    value: v,
    labelKey: v.toLowerCase().replace(/\s+/g, "_")
  }));

// -------------------- ITEMS AGRUPADOS --------------------
// INGRESOS agrupados
export const itemsIngreso = {
  SESION: toItems(sesion),
  TALLER: toItems(taller),
  "RETO WHATSAPP": toItems(retoWhatsapp),
  EBOOKS: toItems(ebooks),
  AUDIOS: toItems(audios)
};

// EGRESOS agrupados
export const itemsEgreso = {
  COMISIONES: toItems(comisiones),
  PUBLICIDAD: toItems(publicidades),
  ALQUILER: toItems(alquiler),
  REFRIGERIO: toItems(refrigerio),
  IMPRESION: toItems(impresion),
  "ELEMENTOS DE TRABAJO": toItems(elementosDeTrabajo),
  LIBRERIA: toItems(libreria),
  ENVIOS: toItems(envios),
  CAPACITACIONES: toItems(capacitaciones),
  "TERAPIA PERSONAL": toItems(terapiaPersonal),
  MOVILIDAD: toItems(movilidad)
};

// -------------------- NORMALIZADOS --------------------
export const modalidad = toItems(modalidadRaw);
export const mediosIngreso = toItems(mediosIngresoRaw);
export const mediosEgreso = toItems(mediosEgresoRaw);