export const projects = [
    {
    id: "life-memo",
      year: 2026,
      month: 9,
      title: "LifeMemo",
    description:
      "A design project focused on capturing and revisiting meaningful moments through a simple, personal web experience. Developed in a team of four, with a focus on user-centered design and iterative prototyping to create an intuitive and engaging interface.",
    links: []
  },
  {
    id: "drivr",
    year: 2026,
    month: 6,
    title: "driVR: A driving simulation in VR",
    description:
      "A VR driving simulation developed in a group of five to investigate how Virtual Reality can complement traditional driving-theory education. The project compared user experiences in VR and traditional learning methods, with my contributions focused on developing driving scenarios and implementing features that enhanced the overall user experience.",
    links: [
      {
        label: "View Repository",
        href: "https://github.com/einhar1/driVR"
      },
      {
        label: "Project report",
        disabled: true
      },
      {
        label: "Demo",
        href: "/videos/drivr-demo.mp4",
        video: true,
        videoTitle: "driVR demo"
      }
    ]
  },
  {
    id: "interpolation-perception-investigation",
    year: 2026,
    month: 5,
    title: "Interpolation Perception Investigation",
    description:
      "An investigation into how different movement-smoothing and interpolation techniques affect perceived responsiveness and game feel in a tank simulation.",
    links: [
      {
        label: "View Repository",
        href: "https://github.com/sebastiangalinski/DH2323-Interpolation"
      }
    ]
  },
  {
    id: "caustics",
    year: 2026,
    month: 1,
    title: "Caustics Simulation in Blender",
    description:
      "A computer graphics project simulating caustics - the light patterns formed by reflection and refraction. Developed in a team of two, with a focus on evaluating the accuracy and performance of the simulation model.",
    links: [
      {
        label: "Project Blog",
        href: "https://sebastiangalinski.github.io/DD1354-project/"
      },
      {
        label: "Demo",
        href: "/videos/caustics.mp4",
        video: true,
        videoTitle: "Caustics result"
      }
    ]
  },
  {
    id: "countryguessr",
    year: 2025,
    month: 1,
    title: "COUNTRYGUESSR: a Geography-based web game",
    description:
      "An interactive browser-based game designed to test and improve users’ geographical knowledge. Built in a team of three, with responsibility for maintaining a Model-View-Presenter architecture and improving usability through features such as smarter sorting based on relevant letters.",
    links: [
      {
        label: "View Repository",
        href: "https://gits-15.sys.kth.se/iprog-students/endler-maim-nfraheem-sebgal-HT25-Project"
      }
    ]
  },
  {
    id: "waste-classification",
    year: 2025,
    month: 1,
    title: "Real Waste Classification",
    description:
      "A machine learning project focused on classifying real-world waste data into different categories. Developed in a team of four, with a focus on building and evaluating a Random Forest classifier, including performance analysis and model validation.",
    links: [
      {
        label: "View Repository",
        href: "https://github.com/mehmetkucukler/ml-projekt-24"
      }
    ]
  },
  {
    id: "nordic-gambit",
    year: 2024,
    month: 1,
    title: "The Nordic Gambit: An Interactive Documentary",
    description:
      'As part of a 7 person team, we created an interactive documentary about Sweden during WW2, exploring some "what if" scenarios. As the interaction designer, I connected the different narrative paths and ensured a coherent storyline throughout the experience.',
    links: [],
    interactive: true,
    interactiveLabel: "interactive documentary"
  }
];

export function sortProjectsByDate(projectList) {
  return [...projectList].sort((first, second) =>
    second.year - first.year ||
    second.month - first.month ||
    first.title.localeCompare(second.title)
  );
}
