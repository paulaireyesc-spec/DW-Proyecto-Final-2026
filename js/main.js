// INDEX.HTML - Interacciones

/* => Interacción A Sección de proyectos
      Descripción: Al hacer scroll, el título de la sección se desvanece
*/
const projectPreview = document.querySelectorAll('.preview');
const projectTitle = document.querySelector('.projects__h2');

// Si el array de proyectos no está vacío, añadimos el evento de scroll
if (projectPreview.length) {
      window.addEventListener('scroll', () => {
            // Obtenemos la posición del último proyecto
            const posicionScroll = projectPreview[3].getBoundingClientRect();

            // Si su distancia con el borde superior de la ventana es menor al 100%
            if (posicionScroll.top < window.innerHeight * 0.1) {
                  projectTitle.style.opacity = '0'; // Desvanecemos el título
            } else {
                  projectTitle.style.opacity = '1';
            }
      });
}

/* => Interacción B Sección de proyectos
      Descripción: Al hacer scroll, los proyectos que no tienen el foco cambian de estilo
      Constantes:
            - Reciclamos la constante projectPreview del bloque anterior, pero convertida en array

      ACLARACIÓN: Ayuda de ChatGPT para resolver el problema del cálculo de la superposición.
*/
const previews = [...document.querySelectorAll(".preview")];

if (previews) {
      // Función para actualizar el estilo de las previews según su posición entre sí
      function updatePreview() {
            previews.forEach((preview) => {
                  // Reseteamos el estado de cada preview
                  preview.classList.remove("preview--disabled");
            });

            // Bucle para definir el proyecto anterior y actual
            for (let i = 1; i < previews.length; i++) {
                  const current = previews[i]; // proyecto actual
                  const previous = previews[i - 1]; // proyecto anterior

                  const currentRect = current.getBoundingClientRect(); // información del proyecto actual
                  const previousRect = previous.getBoundingClientRect(); // información del proyecto anterior

                  // Cuando la actual invade a la anterior (se superpone)
                  if (currentRect.top < previousRect.bottom) {
                        previous.classList.add("preview--disabled"); // Desactivamos el proyecto anterior
                  }
            }
      }

      window.addEventListener("scroll", updatePreview); // Actualiza el estilo según el scroll
      window.addEventListener("resize", updatePreview); // Actualiza el estilo según el cambio de tamaño de la ventana

      updatePreview();
}

/* => Interacción C Menú móvil
      Descripción: Al hacer click en el icono del menú, se muestra el menú desplegable
*/
const menuIcon = document.querySelector('.header__menu-icon');
const mobileMenu = document.querySelector('.header__menu--mobile');
const header = document.querySelector('.header');

menuIcon.addEventListener('click', () => {
      if (mobileMenu.classList.contains('header__menu--active')) {
            mobileMenu.classList.remove('header__menu--active');
            header.classList.remove('header--mobile');
      } else {
            mobileMenu.classList.add('header__menu--active');
            header.classList.add('header--mobile');
      }
});


/* => Interacción D Scroll del título de bienvenida
      Descripción: Al hacer scroll hacia abajo, el título de bienvenida se mueve hacia la derecha, dejando ver todo el mensaje.

      ACLARACIÓN: Ayuda de ChatGPT para resolver cómo definir la dirección del scroll.
*/
const bannerTitle = document.querySelector('.banner__h1');
let lastScroll = window.scrollY;

if (bannerTitle) {
      window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll) {
                  bannerTitle.style.transform = `translateX(${currentScroll * -0.5}px)`; // Mueve el título hacia la izquierda
            } else if (currentScroll < lastScroll) {
                  bannerTitle.style.transform = `translateX(${-currentScroll * 0.5}px)`; // Mueve el título hacia la derecha
            }

            lastScroll = currentScroll;
      });
}



// PROYECTOS (individuales) - Interacciones
const projectsItem = document.querySelectorAll('.gallery picture'); // Solo seleccionamos los picture de la galería, para que el lightbox no se pueda activar con los videos que añadimos
const lightboxContainer = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox__img');
const lightboxPicture = document.querySelector('.lightbox__source');
const lightboxClose = document.querySelector('.lightbox__close');

if (projectsItem) {
      projectsItem.forEach((item) => {
            item.addEventListener('click', (e) => {
                  lightboxPicture.srcset = e.target.srcset;
                  lightboxImage.src = e.target.src;
                  setTimeout(() => {
                        lightboxContainer.classList.add('lightbox--active');
                  }, 0);
            });
      });
}
if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
            lightboxContainer.classList.remove('lightbox--active');
      });
}
