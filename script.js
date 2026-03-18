const menuDiv = document.getElementById('bubble-buttons-menu');
const scrollContainer = document.getElementById('bubble-scroll-container');
const bubbleBackBtn = document.getElementById('back_to_start_bubble_menu');
const myCursor = document.getElementById("myCursor");
const yearSpan = document.getElementById("current-year");
const headerText = document.getElementById('header-text');
const helloText = document.getElementById('hello-text');
const diveText = document.getElementById('dive');

const langButtons = document.querySelectorAll('.languageBtn');
const langDiv = document.getElementById('language-selector');

const pop_sound = new Audio('/sounds/pop.mp3');
const drowning_sound = new Audio('/sounds/drowning.mp3');
const bubbling_sound = new Audio('/sounds/bubbling.mp3')

pop_sound.volume = 0.2;
drowning_sound.volume = 0.1;
bubbling_sound.volume = 0.5;

language = 'en'
const activeLangBtn = document.getElementById(language + '-lang');
activeLangBtn.classList.add('active_lang');

const date = new Date();
yearSpan.innerText = date.getFullYear();


// LANGUAGE CHANGER

console.log(langButtons)

langButtons.forEach(langBtn => {
  langBtn.addEventListener('mouseover', function() {
    langBtn.classList.add('paused');
  })

  langBtn.addEventListener('mouseout', function() {
    langBtn.classList.remove('paused');
  })
});

function changeLanguage(lang) {
  language = lang;

  langButtons.forEach(btn => {
    btn.classList.remove('active_lang');
  })

  const activeLangBtn2 = document.getElementById(language + '-lang');
  activeLangBtn2.classList.add('active_lang');
      
  const nameLink = '<a class="blink" id="my-name-link">';
  
  const texts = {
    "hello": {
      "ru": "Привет! Меня зовут " + nameLink + "Сусанна</a>",
      "fi": "Hei! Minä olen " + nameLink + "Susanna</a>",
      "en": "Hello! I am " + nameLink + "Susanna</a>",
    },
    "slogan": {
      "ru": "Креативный программист с душой, сотканной из апельсинов",
      "fi": "Luova ohjelmoija, jonka sielu on kudottu appelsiinista",
      "en": "A creative programmer with a soul made of orange"
    },
    "dive": {
      "ru": "↓ ныряй",
      "fi": "↓ sukella",
      "en": "↓ dive in"
    }
  }

  // helloText.innerHTML = 'Hello! I am <a class="blink" id="my-name-link">Susanna</a>';
  helloText.innerHTML = texts['hello'][lang];
  headerText.innerHTML = texts['slogan'][lang];
  diveText.innerHTML = texts['dive'][lang]

  const myNameLink = document.getElementById('my-name-link');
  myNameLink.addEventListener('click', () => {
    window.open('https://www.linkedin.com/in/snezhana-blagodatskis-67645834b/', '_blank');
  })

}

changeLanguage('en')

bubbleBackBtn.addEventListener('mouseover', () => {
  bubbleBackBtn.classList.add('paused');
})

bubbleBackBtn.addEventListener('mouseout', () => {
  bubbleBackBtn.classList.remove('paused');
})


const orange = document.getElementById('fallImage');
const juice = document.getElementById('juice');
const bublesbg = document.getElementsByClassName('background-bubbles');
const skills = document.getElementsByClassName('skills');
const projects = document.getElementsByClassName('projects');
const about = document.getElementsByClassName('about');

const bubbleButtons = document.getElementsByClassName('bubbleBtn');


// orange fall animation
orange.addEventListener('click', () => {
  langDiv.style = 'transform: translateY(-100px); transition: all 2s ease'

  orange.classList.add('animate-fall');
  orange.classList.add('orange-zoom');

  menuDiv.classList.remove('events-none')

  setTimeout(() => {
    drowning_sound.currentTime = 0;
    drowning_sound.play();
  }, 500)

  setTimeout(() => {
    bubbling_sound.currentTime = 0;
    bubbling_sound.play();
  },1500)

  setTimeout(() => {
    bublesbg[0].style.display = 'none';
    juice.classList.add('zoom-juice');

    setTimeout(() => {
      orange.classList.add('orange-float');

      get_data()
      
    }, 5000)
  }, 1000)

});





/* BUBLE MENU */

// document.addEventListener('mousemove', function(event) {
//   myCursor.style.left = event.clientX + 'px';
//   myCursor.style.top = event.clientY + 'px';
// })


async function get_data() {
  let current_parent = 0;

  const response = await fetch('./information.json');
  const data = await response.json();

  const content_types = data['content-type'];
  const content = data['content'];

  let left = 230;
  let window_size = window.innerWidth;

  let amound_elements = 0;

  function open_menu() {
    amound_elements = 0;
    bubbleBackBtn.style.scale = 0;
    left = 230;

    content.forEach(element => {
      if(element['parent'] == current_parent) {
        amound_elements += 1;
        console.log(amound_elements);
      }
    });

    let scroll_width = (amound_elements * (150 + 50)) + 180 * 2;
    scrollContainer.style.width = scroll_width + 'px';

    content.forEach(element => {
      if(element['parent'] == current_parent) {
        console.log(element)

        const bubble = create_bubble(element);
        left += 180;
        scrollContainer.appendChild(bubble);
      }
    });
    
    menuDiv.scroll(Math.floor((scroll_width/2) - Math.floor(window_size/2)), 0);
    popUp_bubbles();
  }

  open_menu();

  function create_bubble(element) {

    const random_duration = Math.floor(Math.random() * 16) + 10;

    const bubbleBtn = document.createElement('div');
    bubbleBtn.classList = 'bubbleBtn';
    bubbleBtn.style = `top: 10px; left: ${left}px; animation-duration: ${random_duration}s`;
    bubbleBtn.textContent = element['title'][language];

    switch (element['type']) {
      case 1: // Menu bubble
        bubbleBtn.classList.add('menu-bubble');
        bubbleBtn.addEventListener('click', () => {

          scrollContainer.innerHTML = '';
          // bubbleStartBtn.style.scale = 0;
          current_parent = element['id']
          open_menu();
        })
        break;
      case 2: // Text bubble
        bubbleBtn.classList.add('text-bubble');
        break;
      case 3: // Audio bubble
        bubbleBtn.classList.add('audio-bubble');

        const audio = new Audio(element['content']);

        bubbleBtn.addEventListener('click', () => {

          audio.currentTime = 0;
          audio.play();

          bubbleBtn.classList.add('audio_playing')

          setTimeout(() => {
            bubbleBtn.classList.remove('audio_playing')
          }, 5000);
        })
        break;
      case 4: // link bubble
        bubbleBtn.title = 'Open link';
        bubbleBtn.classList.add('link-bubble');
        bubbleBtn.addEventListener('click', () => {

          if (element['content'] == '') {
            alert('Link to this project is not available')
          } else {
            window.open(element['content'], '_blank');
          }
        })
        break;
      default:
        console.log('content-type not found')
        break;
    }

    bubbleBtn.addEventListener('mouseover', () => {
      bubbleBtn.classList.add('paused');
      // myCursor.style.display = "block"; /* I'll fix this later */
    })

    bubbleBtn.addEventListener('mouseout', () => {
      bubbleBtn.classList.remove('paused');
      // myCursor.style.display = "none";
    })

    return bubbleBtn;
  }

  function popUp_bubbles() {
    const bubbleButtons = document.getElementsByClassName('bubbleBtn');

    let current_bubble = 0;

    let bubble_here = setInterval(() => {

      bubbleButtons[current_bubble].style.scale = 1;

      current_bubble += 1;

      if (current_bubble >= bubbleButtons.length) {
        clearInterval(bubble_here);
        if(!current_parent == 0) {
          bubbleBackBtn.style.scale = 1;
        }
      }

      pop_sound.currentTime = 0;
      pop_sound.play();
    }, 300);
  }

  bubbleBackBtn.addEventListener('click', () => {

    scrollContainer.innerHTML = '';
    current_parent = 0;
    open_menu()
  })
}

/* rewrite json file (will be used for sorting by parent value) */
// const fs = require('fs');
// const path = require('path');

// function rewrite_file() {
//   const jsonData = {"haha": "hahaha"};

//   fs.writeFile("test.json", jsonData, function(err) {
//     if (err){
//       console.log(err)
//     }
//   })

// }

// rewrite_file()