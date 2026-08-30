const header = document.getElementById('header');
const headerContentDiv = document.getElementById('header_content');
const mobileMenu = document.getElementById('mobile_menu');

const infoPanel = document.getElementById('info_panel');
const mediaPanel = document.getElementById('media_panel');
const media = document.getElementById('media');

const langButtons = document.querySelectorAll('#footer p');

let lang;

let currentLanguage = localStorage.getItem('language') || 'en' // can be: en, fi, ru
let currentPage = 'home' // can be: home, about, projects, contacts

const navMenu = ['home', 'about', 'projects', 'contact']

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Susnezhu',
    icon: 'fa-brands fa-square-github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/susnezhu/',
    icon: 'fa-brands fa-linkedin'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@susnezhu_dev',
    icon: 'fa-brands fa-tiktok'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/susnezhu',
    icon: 'fa-brands fa-instagram'
  }
];


langButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentLanguage = button.innerText

    localStorage.setItem('language', currentLanguage)
    
    get_data();
    console.log(currentLanguage)
  })
})


const updateHeader = (highlight) => {
  const buttons = headerContentDiv.querySelectorAll('button');

  buttons.forEach(button => {
    button.classList.toggle(
      'current_page',
      button.dataset.page === currentPage
    );
  });

  const currentButton =
    headerContentDiv.querySelector('.current_page');

  if (!currentButton) return;

  const buttonRect = currentButton.getBoundingClientRect();
  const headerRect = headerContentDiv.getBoundingClientRect();

  const x = buttonRect.left - headerRect.left;

  highlight.style.width = `${buttonRect.width}px`;
  highlight.style.setProperty('--highlight-x', `${x}px`);
};

const renderHeader = () => {
  headerContentDiv.innerHTML = '';
  mobileMenu.innerHTML = '';

  if (window.innerWidth >= 700) {
    // DESKTOP
    const highlight = document.createElement('div');
    highlight.classList.add('nav_highlight');

    navMenu.forEach(menuEl => {
      const button = document.createElement('button');

      button.innerText = lang.navigation[menuEl];
      button.dataset.page = menuEl;

      if (menuEl === currentPage) {
        button.classList.add('current_page');
      }

      button.addEventListener('click', () => {
        currentPage = menuEl;

        updateHeader(highlight);
        renderContent();
      });

      headerContentDiv.appendChild(button);
    });

    headerContentDiv.appendChild(highlight);

    updateHeader(highlight);
  } else {
    // MOBILE
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fa-solid fa-bars mobile_menu_btn"></i>';

    headerContentDiv.appendChild(menuButton);

    const mobileMenu = document.querySelector('.mobile_menu');

    navMenu.forEach(menuEl => {
      const button = document.createElement('button');

      button.innerText = lang.navigation[menuEl];
      button.dataset.page = menuEl;

      button.addEventListener('click', () => {
        currentPage = menuEl;
        renderContent();
      });

      mobileMenu.appendChild(button);
    });

    menuButton.addEventListener('click', () => {
      console.log(mobileMenu);
      mobileMenu.classList.toggle('closed');
    });
  }
};

const renderContent = () => {
  infoPanel.innerHTML = '';

  switch (currentPage) {
    case "home":
      media.src = './media/home.png'
      renderHome();
      break;
    case "about":
      media.src = './media/about.png'
      renderAbout();
      break;
    case "projects":
      media.src = './media/projects.png'
      renderProjects();
      break;
    case "contact":
      media.src = './media/contact.png'
      renderContact();
      break;
  
    default:
      break;
  }
}

function renderHome() {
  const homeMetaItems = [
    {
      icon: 'fa-solid fa-location-dot',
      title: lang.home.location
    },
    {
      icon: 'fa-solid fa-briefcase',
      title: lang.home.jobStatus
    }
  ]

  const homeActions = [
    {
      title: lang.home.hireButton,
      className: 'hire_button',
    },
    {
      title: lang.home.cvButton,
      className: 'cv_button'
    }
  ]

  infoPanel.innerHTML = `
    <div class="home_page">

      <h1>${lang.home.title}</h1>

      <p>${lang.home.description}</p>

      <div class="home_meta">
        ${homeMetaItems.map(item => `
          <div class="home_meta_item">
            <i class="${item.icon} meta_icon"></i>
            <p>${item.title}</p>
          </div>
        `).join('')}
      </div>

      <div class="home_actions">
        ${homeActions.map(action => `
          <button class="${action.className}" id="${action.className}">
            ${action.title}
          </button>
        `).join('')}
      </div>

      <hr>

      <div class="socials">
        <p>${lang.home.follow}</p>

        ${socialLinks.map(social => `
          <a 
            href="${social.url}" 
            target="_blank" 
            class="web_icon"
          >
            <i class="${social.icon} social_icon"></i>
          </a>
        `).join('')}
      </div>

    </div>
  `

  const hireButton = document.getElementById('hire_button');
  const cvButton = document.getElementById('cv_button');

  hireButton.addEventListener('click', () => {
    window.location.href = 'https://www.linkedin.com/in/susnezhu/'
  })

  cvButton.addEventListener('click', () => {
    if (!confirm(lang.home.confirm)) return;

    const link = document.createElement('a')
    
    link.href = './media/CV_Snezhana_Blagodatskis.pdf'
    link.download = 'Susanna_CV.pdf'
    link.click()

  })
}

function renderAbout() {
  
  infoPanel.innerHTML = `
    ${lang.about.content.map(el => `
      <h2>${el.title}</h2>

      ${el.lines.map(line => `
        <p>${line}</p>
      `).join('')}

    `).join('')}
  `
}

function renderProjects() {

  infoPanel.innerHTML = `
    <div class="projectPage">
      ${lang.projects.content.map(project => `
        <div class="project">
          <h3 class="project_header">${project.title}</h3>

          <p>${project.description}</p>

          <a href="${project.url}" target="_blank" class="project_button">
            <button>${project.urlTitle}</button>
          </a>
        </div>
      `).join('')}
    </div>
  `

}

function renderContact() {
  
  infoPanel.innerHTML = `
    <h2>${lang.contact.title}</h2>
    <p>${lang.contact.line1}</p>
    <p>${lang.contact.line2}</p>

    <div class="socials" style="margin: 50px 0px ">
      ${socialLinks.map(social => `
        <a 
          href="${social.url}" 
          target="_blank" 
          class="web_icon"
        >
          <i class="${social.icon} social_icon"></i>
        </a>
      `).join('')}
    </div>
  `
}

async function get_data() {
  const response = await fetch(`./lang_data/${currentLanguage}.json`);
  lang = await response.json();

  renderHeader();
  renderContent();
}


get_data()