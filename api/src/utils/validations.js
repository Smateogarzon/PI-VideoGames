function Validation(inputs) {
  const pasMayus = /[A-Z]/,
    pasNum = /\d/,
    pasCharterEs = /[@$!%*?&]/;
  let error = {};

  if (!pasMayus.test(inputs))
    error.password1 = 'la contraseña, debe tener almenos una Mayuscula';
  if (!pasNum.test(inputs))
    error.password2 = 'la contraseña, debe tener almenos un numero';
  if (!pasCharterEs.test(inputs))
    error.password3 = 'la contraseña, debe tener almenos un caracter especial';
  if (inputs.length < 6)
    error.password4 = 'contraseña muy corta, debe tener almenos 6 caracteres';
  if (inputs.length > 10) error.password5 = 'contraseña muy larga';

  return error;
}

module.exports = Validation;
