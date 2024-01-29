function ValidationForm(inputs) {
  const {name, description, background_image, released, platforms, genres} =
    inputs;
  const imageFormat = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/;
  const error = {};

  if (!name) error.name = 'falta nombre';
  if (!description) error.description = 'falta descripción';
  if (!imageFormat.test(background_image))
    error.background_image = 'falta imagen o formato incorrecto';
  if (!released) error.released = 'falta fecha';
  if (!platforms) error.platforms = 'falta plataforma';
  if (!genres) error.genres = 'falta genero';

  return error;
}
module.exports = ValidationForm;
