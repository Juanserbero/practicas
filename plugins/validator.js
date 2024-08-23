export default {
  textRules: [
    (v) =>
      !v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v) || 'El campo es sólo letras',
  ],
  numberRules: [
    /*      (v) => !!v || "Campo requerido",*/
    (v) => !v || /^[0-9 -]+$/.test(v) || 'El campo es sólo números',
  ],
}
