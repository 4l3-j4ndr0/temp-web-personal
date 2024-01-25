/**
* Template Name: Arsha - v4.3.0
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
})()

// ######################   SEND MESSAGE   ######################

document.getElementById("send_message").addEventListener("click", function (evt) {
  
  if (validarFormulario()) {
    
    // Inicializa Email.js con tu clave API
    emailjs.init("H-WBr0WOAGOZdSpKz");
    enviarCorreo(evt);
  }
});

function enviarCorreo(evt) {
  evt.preventDefault()
  // mostrar div loading
  let loadingDiv = estadoFormulario.querySelector('.loading');
    loadingDiv.style.display = 'block';
    emailjs.send("service_w4j5gde", "template_w2bkqy6", {
    from_email: getInfo("email_text"),
    to_name: "AlexCode",
    from_name: getInfo("name_text"),
    subject: getInfo("subject_text"),
    message: getInfo("message_text"),
  })
    .then(function () {
      // Mostrar el div de sent-message y ocultar el de loading
      loadingDiv.style.display = 'none';
      let sentMessageDiv = estadoFormulario.querySelector('.sent-message');
      sentMessageDiv.style.display = 'block';
      // Después de 2 segundos, ocultar el div de sent-message
      setTimeout(function() {
        sentMessageDiv.style.display = 'none';
        // Limpiar los campos del formulario
        let formulario = document.getElementById('myForm');
        formulario.reset();
      }, 2000);
      
    }, function (error) {
      loadingDiv.style.display = 'none';
      let errorMessageDiv = estadoFormulario.querySelector('.error-message');
        errorMessageDiv.style.display = 'block';
        console.log(error)
        errorMessageDiv.textContent = 'Error: ' + error.status + ' '+ error.text;
    });

}

function getInfo(id) {
  // get label by ID
  let myInput = document.getElementById(id);

  // get value by textContent 
  let valueInput = myInput.value;

  // return value
  return valueInput;
}

function sendMessageForWhatsApp() {
  // Reemplaza '123456789' con el número de teléfono completo (incluyendo código del país)
  var numeroTelefono = '+17867781324'; // Ejemplo con código del país '+1' (Estados Unidos)

  // Reemplaza 'Hola, ¿cómo estás?' con tu mensaje predeterminado
  var mensajePredeterminado = '¡Hola! Estoy interesado en obtener más información sobre sus servicios. Me gustaría saber  [especifica cualquier detalle adicional que desee saber]. ¿Podría proporcionarme más detalles sobre: [menciona el servicio en el que esta interesado]. También, ¿Cuál es su disponibilidad para una posible consulta? Agradezco su tiempo y espero su pronta respuesta. ¡Gracias!';
  
  // Codifica el mensaje para que sea parte de la URL
  var mensajeCodificado = encodeURIComponent(mensajePredeterminado);
  
  // Abre la URL de WhatsApp con el número y el mensaje predeterminado
  window.location.href = 'https://wa.me/' + numeroTelefono + '?text=' + mensajeCodificado;
}

