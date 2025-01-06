// src/utils/formUtils.js
export const createInitialState = (fields) =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});