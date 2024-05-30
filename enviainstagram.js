/**
 * Script para enviar mensajes automáticamente en Instagram Web.
 * Autor: Kcius
 */

async function enviarScript(scriptText, tiempoDeEspera = 250) {
  const lines = scriptText
    .split(/[\n\t]+/)
    .map((line) => line.trim())
    .filter((line) => line);

  const textarea = document.querySelector('div[contenteditable="true"][role="textbox"]');

  if (!textarea) {
    throw new Error('No hay una conversación abierta');
  }

  try {
    for (const line of lines) {
      textarea.focus();

      textarea.innerHTML = '';

      document.execCommand('insertText', false, line);

      const event = new InputEvent('input', { bubbles: true });
      textarea.dispatchEvent(event);

      await new Promise((resolve) => setTimeout(resolve, tiempoDeEspera));

      const buttons = document.querySelectorAll('div[role="button"][tabindex="0"]');
      const sendButton = Array.from(buttons).find(button => button.textContent.includes('Enviar'));

      if (!sendButton) {
        throw new Error('No se encontró el botón de enviar mensaje');
      }

      sendButton.click();

      await new Promise((resolve) => setTimeout(resolve, tiempoDeEspera));
    }

    return lines.length;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Mensajes a enviar. Edita las cadenas de texto aquí.
enviarScript(`
Hola,
aqui tu mensaje de prueba.
usalo con responsabilidad.
Saludos,
Kcius
`)
  .then((e) => console.log(`Código finalizado, ${e} mensajes enviados`))
  .catch(console.error);
