const menuDiv = document.getElementById('bubble-buttons-menu');
const scrollContainer = document.getElementById('bubble-scroll-container');
const bubbleBackBtn = document.getElementById('back_to_start_bubble_menu');
const myCursor = document.getElementById("myCursor");
const yearSpan = document.getElementById("current-year");

const date = new Date();
yearSpan.innerText = date.getFullYear();

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
  orange.classList.add('animate-fall');
  orange.classList.add('orange-zoom');

  menuDiv.classList.remove('events-none')

  setTimeout(() => {
    bublesbg[0].style.display = 'none';
    juice.classList.add('zoom-juice');

    setTimeout(() => {
      orange.classList.add('orange-float');

      get_data()
      
    }, 6000)
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

  let left = 250;
  let window_size = window.innerWidth;

  let amound_elements = 0;

  function open_menu() {
    amound_elements = 0;
    bubbleBackBtn.style.scale = 0;
    left = 250;

    content.forEach(element => {
      if(element['parent'] == current_parent) {
        amound_elements += 1;
        console.log(amound_elements);
      }
    });

    let scroll_width = (amound_elements * (180 + 50)) + 250 *2;
    scrollContainer.style.width = scroll_width + 'px';

    content.forEach(element => {
      if(element['parent'] == current_parent) {
        console.log(element)
        const bubble = create_bubble(element);
        left += 250;
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
    bubbleBtn.style = `width: 180px; height: 180px; top: 10px; left: ${left}px; animation-duration: ${random_duration}s`;
    bubbleBtn.textContent = element['title'];

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
        bubbleBtn.addEventListener('click', () => {

          const audio = new Audio(element['content']);
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
          alert("Sorry, links to projects are not working yet. Try another time")
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