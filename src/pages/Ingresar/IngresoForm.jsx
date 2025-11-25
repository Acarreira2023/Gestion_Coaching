// src/pages/Ingresar/IngresoForm.jsx

import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import styles from "./IngresoForm.module.css";
import { guardarIngreso } from "../../services/firebaseService";
import {
  categoriasIngreso,
  itemsIngreso,
  modalidad,
  mediosIngreso
} from "../../utils/listados";
import { useIdioma } from "../../context/IdiomaContext";

export default function IngresoForm({ onBack }) {
  const { t } = useIdioma();

  const [f, setF] = useState({
    fecha: "",
    medioPago: "",
    categoria: "",
    item: "",
    modalidad: "",
    cantidad: 1,
    descripcion: "",
    cliente: "",
    total: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // reset dependent fields: if category changes clear item
    if (name === "categoria") {
      setF((prev) => ({ ...prev, categoria: value, item: "" }));
      setError("");
      return;
    }

    setF((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!f.fecha) return t("error_fecha_requerida");
    if (!f.categoria) return t("error_categoria_requerida");
    const itemsForCat = itemsIngreso[f.categoria] || [];
    if (itemsForCat.length && !f.item) return t("error_item_requerido");
    if (!f.modalidad) return t("error_modalidad_requerida");
    const cantidad = Number.parseInt(f.cantidad, 10);
    const total = Number.parseFloat(f.total);
    if (!Number.isFinite(cantidad) || cantidad < 1) return t("error_cantidad_valida");
    if (!Number.isFinite(total) || total < 0) return t("error_total_valido");
    // whitelist checks
    if (!categoriasIngreso.some((c) => c.value === f.categoria)) return t("error_categoria_invalida");
    if (itemsForCat.length && !itemsForCat.some((it) => it.value === f.item)) return t("error_item_invalido");
    if (!modalidad.some((m) => m.value === f.modalidad)) return t("error_modalidad_invalida");
    if (f.medioPago && !mediosIngreso.some((m) => m.value === f.medioPago)) return t("error_medio_invalido");
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Build payload and parse numeric fields
    const data = { ...f };
    data.cantidad = Number.parseInt(data.cantidad, 10);
    data.total = Number.parseFloat(data.total);

    // Parsear fecha a medianoche local (YYYY-MM-DD input)
    const [year, month, day] = (data.fecha || "").split("-").map(Number);
    if (![year, month, day].every(Number.isFinite)) {
      setError(t("error_fecha_invalida"));
      return;
    }
    const dtLocal = new Date(year, month - 1, day);
    data.fecha = Timestamp.fromDate(dtLocal);

    // Normalizar payload: sólo campos permitidos
    const payload = {
      fecha: data.fecha,
      medioPago: data.medioPago || "",
      categoria: data.categoria,
      item: data.item || "",
      modalidad: data.modalidad,
      cantidad: data.cantidad,
      descripcion: data.descripcion || "",
      cliente: data.cliente || "",
      total: data.total
    };

    setIsSubmitting(true);
    setError("");
    try {
      const res = await guardarIngreso(payload);
      if (res && res.success) {
        alert(t("ingreso_guardado_correctamente"));
        onBack();
      } else {
        console.error("guardarIngreso response:", res);
        setError(t("error_guardar_ingreso"));
      }
    } catch (err) {
      console.error(err);
      setError(t("error_guardar_ingreso"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemsForSelectedCategory = itemsIngreso[f.categoria] || [];

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <h2>{t("formulario_ingreso")}</h2>

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      {/* Fecha */}
      <div className={styles.field}>
        <label htmlFor="fecha">{t("fecha")}</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={f.fecha}
          onChange={handleChange}
          required
        />
      </div>

      {/* Medio de pago */}
      <div className={styles.field}>
        <label htmlFor="medioPago">{t("medio_pago")}</label>
        <select id="medioPago" name="medioPago" value={f.medioPago} onChange={handleChange}>
          <option value="">{t("seleccionar_medio")}</option>
          {mediosIngreso.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría */}
      <div className={styles.field}>
        <label htmlFor="categoria">{t("categoria")}</label>
        <select
          id="categoria"
          name="categoria"
          value={f.categoria}
          onChange={handleChange}
          required
        >
          <option value="">{t("seleccionar_categoria")}</option>
          {categoriasIngreso.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Item dependiente */}
      <div className={styles.field}>
        <label htmlFor="item">{t("item")}</label>
        <select
          id="item"
          name="item"
          value={f.item}
          onChange={handleChange}
          disabled={!f.categoria || itemsForSelectedCategory.length === 0}
        >
          <option value="">{t("seleccionar_item")}</option>
          {itemsForSelectedCategory.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
        {!f.categoria && <small className={styles.helper}>{t("helper_seleccionar_categoria_para_item")}</small>}
        {f.categoria && itemsForSelectedCategory.length === 0 && (
          <small className={styles.helper}>{t("helper_sin_items_para_categoria")}</small>
        )}
      </div>

      {/* Modalidad */}
      <div className={styles.field}>
        <label htmlFor="modalidad">{t("modalidad")}</label>
        <select id="modalidad" name="modalidad" value={f.modalidad} onChange={handleChange} required>
          <option value="">{t("seleccionar_modalidad")}</option>
          {modalidad.map((m) => (
            <option key={m.value} value={m.value}>
              {t(m.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Cantidad */}
      <div className={styles.field}>
        <label htmlFor="cantidad">{t("cantidad")}</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          min="1"
          value={f.cantidad}
          onChange={handleChange}
          required
        />
      </div>

      {/* Cliente */}
      <div className={styles.field}>
        <label htmlFor="cliente">{t("cliente")}</label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          value={f.cliente}
          onChange={handleChange}
        />
      </div>

      {/* Descripción */}
      <div className={styles.field}>
        <label htmlFor="descripcion">{t("descripcion")}</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={f.descripcion}
          onChange={handleChange}
        />
      </div>

      {/* Total */}
      <div className={styles.field}>
        <label htmlFor="total">{t("total")}</label>
        <input
          type="number"
          id="total"
          name="total"
          step="0.01"
          min="0"
          value={f.total}
          onChange={handleChange}
          required
        />
      </div>

      {/* Botones */}
      <div className={styles.buttons}>
        <button type="submit" className={styles.botonArena} disabled={isSubmitting}>
          {isSubmitting ? t("guardando") : t("guardar_ingreso")}
        </button>
        <button type="button" className={styles.volver} onClick={onBack} disabled={isSubmitting}>
          {t("volver")}
        </button>
      </div>
    </form>
  );
}