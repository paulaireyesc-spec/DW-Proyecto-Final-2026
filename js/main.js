/* ---------------------------------------------------------------- 
      main.js
      Descripción: Este archivo contiene el código JavaScript para las interacciones de la página web completa.
      
      Estructura:
            - Interacción A: Desvanecimiento del título de sección de proyectos (index.html)
            - Interacción B: Estilos para la galería sticky de proyectos (index.html)
            - Interacción C: Menú móvil (mostrar/ocultar menú desplegable en toda la web)
            - Interacción D: Scroll del título de los banner (en todas las páginas con banner inicial)
            - Interacción E: Lightbox para las imágenes de los proyectos (en la página de cada proyecto)
---------------------------------------------------------------- */




/* => Interacción A: Desvanecimiento del título de sección de proyectos
      Descripción: Al hacer scroll, el título de la sección se desvanece
      Estructura:
            - Constantes
            - Función
            - Evento de scroll
*/
const projectPreview = document.querySelectorAll('.preview'); // Selecciona el contendor de cada proyecto.
const projectTitle = document.querySelector('.projects__h2'); // Selecciona el título de la sección de proyectos.

// Función que desvanece el título de la sección de proyectos
function opacityHandler() {
      // Obtenemos la posición del último proyecto
      const posicionScroll = projectPreview[3].getBoundingClientRect();

      // Si su distancia con el borde superior de la ventana es menor al 100%
      if (posicionScroll.top < window.innerHeight * 0.1) {
            projectTitle.style.opacity = '0'; // Desvanecemos el título
      } else {
            projectTitle.style.opacity = '1'; // Si no, el título vuelve a su estado original
      }
}

if (projectPreview.length) { // Si el array de proyectos no está vacío
      window.addEventListener('scroll', opacityHandler); // Añadimos el evento de scroll con la función de desvanecimiento del título
}




/* => Interacción B: Estilos para la galería sticky de proyectos
      Descripción: 
            1º - Al hacer scroll, los proyectos que no tienen el foco (están detrás) cambian de estilo.
            2º - El proyecto que tiene el foco se mantiene fijo en la pantalla, mientras los demás se van superponiendo a él.

      Estructura:
            - Constantes
            - Función
            - Eventos de scroll y resize

      ACLARACIÓN: Ayuda de ChatGPT para resolver el problema del cálculo de la superposición.
*/

const previews = document.querySelectorAll(".preview"); // Selecciona todos los contenedores de los proyectos.

// Función que actualiza el estilo de los proyectos según su posición en la pantalla.
function updatePreview() {
      previews.forEach((preview) => {
            // Reseteamos el estilo de los contenedores a su estado original (activo)
            preview.classList.remove("preview--disabled");
      });

      for (let i = 1; i < previews.length; i++) {
            const current = previews[i]; // Registramos la posición del proyecto actual
            const previous = previews[i - 1]; // Y la del proyecto anterior

            const currentProject = current.getBoundingClientRect(); // Recibimos la información del proyecto actual
            const previousProject = previous.getBoundingClientRect(); // Recibimos la información del proyecto anterior

            // Cuando el proyecto actual invade al anterior (se superpone)
            if (currentProject.top < previousProject.bottom) {
                  previous.classList.add("preview--disabled"); // Desactivamos el proyecto anterior
            }
      }
}

if (previews) { // Si existen los contenedores de proyectos

      window.addEventListener("scroll", updatePreview); // Se actualiza el contenedor según el scroll
      window.addEventListener("resize", updatePreview); // Actualiza el contenedor según el cambio de tamaño de la ventana

      updatePreview(); // Evitamos efectos raros llamando a la función al cargar la página, para que el estilo se actualice desde el principio.
}




/* => Interacción C: Menú móvil
      Descripción: Al hacer click en el icono del menú, se muestra el menú desplegable.
      Estructura:
            - Constantes
            - Función
            - Evento de click para mostrar/ocultar el menú desplegable
*/
const menuIcon = document.querySelector('.header__menu-icon'); // Selecciona el icono del menú
const mobileMenu = document.querySelector('.header__menu--mobile'); // Selecciona el menú para móviles
const header = document.querySelector('.header'); // Selecciona el encabezado

// Función para mostrar/ocultar el menú desplegable
function mobileMenuHandler() {
      // Si el menú tiene la clase activo
      if (mobileMenu.classList.contains('header__menu--active')) {
            // Lo reseteamos a su estado original (oculto)
            mobileMenu.classList.remove('header__menu--active');
            header.classList.remove('header--mobile');
      } else {
            // Si no, añadimos la clase activo para mostrar el menú
            mobileMenu.classList.add('header__menu--active');
            header.classList.add('header--mobile');
      }
}

// Escuchamos el click en el icono del menú para mostrar/ocultar el menú desplegable
menuIcon.addEventListener('click', mobileMenuHandler);




/* => Interacción D: Scroll del título de los banners
      Descripción: Al hacer scroll hacia abajo, el título de los banners iniciales de cada página se mueven a la izquierda.
      Estructura:
            - Constantes
            - Variables
            - Función
            - Evento de scroll

      ACLARACIÓN: Ayuda de ChatGPT para resolver cómo definir la dirección del scroll.
*/
const bannerTitle = document.querySelector('.banner__h1'); // Seleccionamos el título del banner
let lastScroll = window.scrollY; // Registramos la posición del scroll

// Función para mover el título del banner según la dirección del scroll
function bannerScrollHandler() {
      const currentScroll = window.scrollY; // Actualizamos la posición del scroll cada vez que se ejectuta la función

      // Si el nuevo scroll es mayor que el anterior = scroll hacia abajo
      if (currentScroll > lastScroll) {
            bannerTitle.style.transform = `translateX(${currentScroll * -0.5}px)`; // Mueve el título hacia la izquierda

            // Si el nuevo scroll es menor que el anterior = scroll hacia arriba
      } else if (currentScroll < lastScroll) {
            bannerTitle.style.transform = `translateX(${-currentScroll * 0.5}px)`; // Mueve el título hacia la derecha
      }

      lastScroll = currentScroll; // Actualizamos la posición del scroll para la siguiente vez que se ejecute la función
}

if (bannerTitle) {
      window.addEventListener('scroll', bannerScrollHandler); // Escuchamos el evento de scroll para mover el título del banner
}



/* => Interacción E: Lightbox para las imágenes de los proyectos
      Descripción: Al hacer click en una imagen de la galería, se muestra un lightbox con la imagen ampliada.
      Estructura:
            - Constantes
            - Función
            - Evento de click
*/

const projectsItem = document.querySelectorAll('.gallery picture'); // Solo selecciona los picture de la galería, para que el lightbox no se pueda activar con los videos que añadimos
const lightboxContainer = document.querySelector('.lightbox'); // Selecciona el contenedor del lightbox
const lightboxImage = document.querySelector('.lightbox__img'); // Selecciona la imagen del lightbox (en su picture)
const lightboxPicture = document.querySelector('.lightbox__source'); // Selecciona el source del lightbox (en su picture)
const lightboxClose = document.querySelector('.lightbox__close'); // Selecciona el botón de cerrar del lightbox

// Función para mostrar el lightbox con la imagen ampliada
function lightboxHandler(e) {
      lightboxPicture.srcset = e.target.srcset; // Cambia el source del lightbox al de la imagen que se ha clicado
      lightboxImage.src = e.target.src; // Cambia la imagen del lightbox a la de la imagen que se ha clicado
      requestAnimationFrame(() => {
            lightboxContainer.classList.add('lightbox--active');
      }); // Añade la clase activo al contenedor del lightbox para mostrarlo
}


if (projectsItem) {
      projectsItem.forEach((item) => {
            item.addEventListener('click', lightboxHandler); // Por cada imagen, escucha el evento click y ejecuta la función lightboxHandler
      });
}

if (lightboxClose) {
      lightboxClose.addEventListener('click', () => lightboxContainer.classList.remove('lightbox--active')); // Escucha el evento click en el botón de cerrar y ejecuta la función lightboxCloseHandler
}





/* => Interacción F: Mensaje de confirmación de envío de formulario
      Descripción: Al enviar el formulario de contacto, se muestra un mensaje de confirmación con el nombre del usuario.
      Estructura:
            - Constantes
            - Función
            - Evento de submit y click
*/

const form = document.querySelector('.contact__form'); // Selecciona el formulario de contacto
const confirmationDialog = document.querySelector('.confirmation'); // Selecciona el contenedor del mensaje de confirmación
const dialogMessage = document.querySelector('.confirmation__message p'); // Selecciona el párrafo del mensaje de confirmación
const closeDialog = document.querySelector('.confirmation__btn'); // Selecciona el botón de cerrar del mensaje de confirmación
const nombreInput = document.getElementById('name'); // Selecciona el input del nombre en el formulario

// Función para mostrar el mensaje de confirmación al enviar el formulario
function formSubmitHandler(e) {
      e.preventDefault(); // Evita que se envíe el formulario y se recargue la página
      dialogMessage.textContent = `¡Gracias, ${nombreInput.value}! Nos pondremos en contacto contigo lo antes posible.`; // Cambia el texto del mensaje de confirmación para incluir el nombre del usuario
      confirmationDialog.classList.add('confirmation--active'); // Añade la clase activo al contenedor del mensaje de confirmación para mostrarlo
}

// Función para cerrar el mensaje de confirmación
function closeDialogHandler() {
      confirmationDialog.classList.remove('confirmation--active'); // Elimina la clase activo del contenedor del mensaje de confirmación para ocultarlo
}

if (form) {
      form.addEventListener('submit', formSubmitHandler); // Escucha el evento submit en el formulario y ejecuta la función formSubmitHandler
      closeDialog.addEventListener('click', closeDialogHandler); // Escucha el evento click en el botón de cerrar y ejecuta la función closeDialogHandler
}

