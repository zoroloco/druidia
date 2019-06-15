// define all of your navigation for the side bar nav on the side bar.
export const appNavigation = [
  {
    title: true,
    name: 'menu',
    wrapper: {               // optional wrapper object
      element: 'span',       // required valid HTML5 element tag
      attributes: {}
    },
    class: 'text-center'     // optional class names space delimited list for title item ex: 'text-center'
  },
  {
    name: 'home',
    url: '/home',
    icon: 'icon-home',
    children: [
      {
        name: 'Music Player',
        url: '/home/mplayer'
      },
      {
        name: 'Raspibot',
        url: '/home/raspibot',
        icon: 'icon-sunglasses'
      },
      {
        name: 'Baby Namer',
        url: '/home/babynamer',
        icon: 'fas fa-baby'
      }
      /*
      {
        name: 'movies',
        url: '/home/movies',
        icon: 'icon-film'
      },
      {
        name: 'humiditemp',
        url: '/home/humiditemp',
        icon: 'icon-drop'
      }
      */
    ]
  }
];
