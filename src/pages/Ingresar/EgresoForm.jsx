// src/pages/Ingresar/EgresoForm.jsx

import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";
import styles from "./EgresoForm.module.css";
import { guardarEgreso } from "../../services/firebaseService";
import {
  categoriasEgreso,
  itemsEgreso,
  mediosEgreso
} from "../../utils/listados";
import { useIdioma } from "../../context/IdiomaContext";

export default function EgresoForm({ onBack }) {
  const { t } = useIdioma();

  const [f, setF] = useState({
    fecha: "",
    medioPago: "",
    categoria: "",
    item: "",
    cantidad: 1,
    numeroDoc: "",
    descripcion: "",
    proveedor: "",
    total: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si cambia la categoría, reseteamos el item dependiente
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

    const itemsForCat = itemsEgreso[f.categoria] || [];
    if (itemsForCat.length && !f.item) return t("error_item_requerido");

    const cantidad = Number.parseInt(f.cantidad, 10);
    const total = Number.parseFloat(f.total);
    if (!Number.isFinite(cantidad) || cantidad < 1) return t("error_cantidad_valida");
    if (!Number.isFinite(total) || total < 0) return t("error_total_valido");

    // Whitelist checks
    if (!categoriasEgreso.some((c) => c.value === f.categoria)) return t("error_categoria_invalida");
    if (itemsForCat.length && !itemsForCat.some((it) => it.value === f.item)) return t("error_item_invalido");
    if (f.medioPago && !mediosEgreso.some((m) => m.value === f.medioPago)) return t("error_medio_invalido");

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

    const data = { ...f };
    data.cantidad = Number.parseInt(data.cantidad, 10);
    data.total = Number.parseFloat(data.total);

    // Fecha a medianoche local (YYYY-MM-DD)
    const [year, month, day] = (data.fecha || "").split("-").map(Number);
    if (![year, month, day].every(Number.isFinite)) {
      setError(t("error_fecha_invalida"));
      return;
    }
    const dtLocal = new Date(year, month - 1, day);
    data.fecha = Timestamp.fromDate(dtLocal);

    // Payload normalizado
    const payload = {
      fecha: data.fecha,
      medioPago: data.medioPago || "",
      categoria: data.categoria,
      item: data.item || "",
      cantidad: data.cantidad,
      numeroDoc: data.numeroDoc || "",
      descripcion: data.descripcion || "",
      proveedor: data.proveedor || "",
      total: data.total
    };

    setIsSubmitting(true);
    setError("");
    try {
      const res = await guardarEgreso(payload);
      if (res && res.success) {
        alert(t("egreso_guardado_correctamente"));
        onBack();
      } else {
        console.error("guardarEgreso response:", res);
        setError(t("error_guardar_egreso"));
      }
    } catch (err) {
      console.error(err);
      setError(t("error_guardar_egreso"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemsForSelectedCategory = itemsEgreso[f.categoria] || [];

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <h2>{t("formulario_egreso")}</h2>

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
        <select
          id="medioPago"
          name="medioPago"
          value={f.medioPago}
          onChange={handleChange}
        >
          <option value="">{t("seleccionar_medio")}</option>
          {mediosEgreso.map((opt) => (
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
          {categoriasEgreso.map((opt) => (
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
        {!f.categoria && (
          <small className={styles.helper}>
            {t("helper_seleccionar_categoria_para_item")}
          </small>
        )}
        {f.categoria && itemsForSelectedCategory.length === 0 && (
          <small className={styles.helper}>
            {t("helper_sin_items_para_categoria")}
          </small>
        )}
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

      {/* Proveedor */}
      <div className={styles.field}>
        <label htmlFor="proveedor">{t("proveedor")}</label>
        <input
          type="text"
          id="proveedor"
          name="proveedor"
          value={f.proveedor}
          onChange={handleChange}
        />
      </div>

      {/* Número de documento */}
      <div className={styles.field}>
        <label htmlFor="numeroDoc">{t("numero_documento")}</label>
        <input
          type="text"
          id="numeroDoc"
          name="numeroDoc"
          value={f.numeroDoc}
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
        <button
          type="submit"
          className={styles.botonArena}
          disabled={isSubmitting}
        >
          {isSubmitting ? t("guardando") : t("guardar_egreso")}
        </button>
        <button
          type="button"
          className={styles.volver}
          onClick={onBack}
          disabled={isSubmitting}
        >
          {t("volver")}
        </button>
      </div>
    </form>
  );
}