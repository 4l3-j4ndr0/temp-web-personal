

function validarFormulario() {

  // Obtener los valores de los campos
  let nameValue = getInfo("name_text");
  let emailValue = getInfo("email_text");
  let subjectValue = getInfo("subject_text");
  let messageValue = getInfo("message_text");

  // Validar que ningún campo esté vacío
  if (!nameValue || !emailValue || !subjectValue || !messageValue) {
      return false;
  }
  return true;
}
