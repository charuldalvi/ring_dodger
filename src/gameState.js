import { atom } from "recoil";

export const shipPositionState = atom({
  key: "shipPosition", // unique ID (with respect to other atoms/selectors)
  default: { position: {}, rotation: {} }, // default value (aka initial value)
});

export const ringPositionState = atom({
  key: "ringPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: -4, y: 2.5, z: -50 },
    { x: 4, y: -2, z: -120 },
    { x: 2, y: 2, z: -180 },
    { x: 0, y: -2.5, z: -220 },
    { x: 4, y: -2.2, z: -260 },
    { x: 3, y: 2, z: -300 },
    { x: -2, y: 1.5, z: -340 },
    { x: 2, y: -1.5, z: -380 },
    { x: -1, y: 1, z: -420 },
    { x: -3, y: 2, z: -460 },
    { x: 4, y: -2, z: -520 },
    { x: 2, y: -2, z: -560 },
    { x: -2, y: 1, z: -600 },
    { x: -5, y: 3, z: -640 },
    { x: 5, y: -2, z: -700 },
    { x: 2, y: 2.5, z: -740 },
    { x: 0, y: 2, z: -780 },
    { x: -3, y: 1.2, z: -820 },
    { x: 1, y: 1.5 - 2, z: -860 },
    { x: 4, y: 1, z: -900 },
    { x: 2, y: -2.5, z: -940 },
    { x: 0, y: 2, z: -980 },
    { x: -3, y: 1.2, z: -1020 },
    { x: 1, y: 1.5 - 2, z: -1060 },
    { x: 4, y: 1, z: -2000 },
  ],
});

export const smallringPositionState = atom({
  key: "smallringPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: Math.random() * 10 - 4, y: Math.random() * 3, z: -80 },
    { x: Math.random() * 5 - 4, y: Math.random() * -2, z: -150 },
    { x: Math.random() * 8 - 4, y: Math.random() * 2, z: -200 },
    { x: Math.random() * -4, y: Math.random() * -3, z: -240 },
   
    { x: Math.random() * 1 - 4, y: Math.random() * 4 - 2, z: -320 },
    { x: Math.random() * 6 - 4, y: Math.random() * 1.5, z: -350 },
    
    { x: Math.random() * 1 - 4, y: Math.random() * 1, z: -440 },
    { x: Math.random() * 12 - 4, y: Math.random() * 2, z: -490 },
    { x: Math.random() * -4, y: Math.random() * 2 - 2, z: -540 },
    
    { x: Math.random() * 3 - 4, y: Math.random() * 3, z: -670 },
    { x: Math.random() * 15 - 4, y: Math.random() * -2, z: -720 },
    { x: Math.random() * 1 - 4, y: Math.random() * 2.5, z: -760 },
    
    { x: Math.random() * 5, y: Math.random()* 1.2, z: -840 },
    { x: Math.random() * 3, y: Math.random()* 1.5 - 2, z: -870 },
    { x: Math.random() * 1 - 4, y: Math.random() * 1, z: -920 },
  ],
});

export const pointcheckerPositionState = atom({
  key: "pointPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: -3.5, y: 2.5, z: -60 },
    { x: 4, y: -2, z: -130 },
    { x: 2, y: 2, z: -186 },
    { x: 0, y: -2.5, z: -226 },
    { x: 4, y: -2.2, z: -266 },
    { x: 3, y: 2, z: -306 },
    { x: -2, y: 1.5, z: -346 },
    { x: 2, y: -1.5, z: -386 },
    { x: -1, y: 1, z: -426 },
    { x: -3, y: 2, z: -466 },
    { x: 4, y: -2, z: -526 },
    { x: 2, y: -2, z: -566 },
    { x: -2, y: 1, z: -606 },
    { x: -5, y: 3, z: -646 },
    { x: 5, y: -2, z: -706 },
    { x: 2, y: 2.5, z: -746 },
    { x: 0, y: 2, z: -786 },
    { x: -3, y: 1.2, z: -826 },
    { x: 1, y: 1.5 - 2, z: -866 },
    { x: 4, y: 1, z: -906 },
    { x: 2, y: -2.5, z: -946 },
    { x: 0, y: 2, z: -986 },
    { x: -3, y: 1.2, z: -1026 },
    { x: 1, y: 1.5 - 2, z: -1066 },
    { x: 4, y: 1, z: -2006 },
  ],
});




export const meteorPositionState = atom({
  key: "meteorPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: -3.5, y: 2.5, z: -70 },
    { x: 4, y: -2, z: -142 },
    { x: 2, y: 2, z: -190 },
    { x: 0, y: -2.5, z: -230 },
    { x: 4, y: -2.2, z: -266 },
   
    { x: -2, y: 1.5, z: -346 },
    { x: 2, y: -1.5, z: -386 },
    { x: -1, y: 1, z: -426 },
    { x: -3, y: 2, z: -466 },
    
    { x: -2, y: 1, z: -606 },
    { x: -5, y: 3, z: -646 },
    { x: 5, y: -2, z: -706 },
    { x: 2, y: 2.5, z: -746 },
    { x: 0, y: 2, z: -786 },
    { x: -3, y: 1.2, z: -826 },
    { x: 1, y: 1.5 - 2, z: -866 },
    { x: 4, y: 1, z: -906 },
  ],
});


export const blackholePositionState = atom({
  key: "blackholePosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: 3.5, y: 2.5, z: -70 },
    { x: -2, y: 2, z: -190 },
  ],
});

export const lifelinePositionState = atom({
  key: "lifelinePosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: 3.5, y: 2.5, z: -70 },
    { x: -2, y: 2, z: -390 },
    { x: 2, y: 2, z: -690 },
  ],
});

export const lifelinepointPositionState = atom({
  key: "lifelinepointPosition", // unique ID (with respect to other atoms/selectors)
  default: [
    { x: 3.5, y: 2.5, z: -76 },
    { x: -2, y: 2, z: -396 },
    { x: 2, y: 2, z: -696 },
  ],
});

export const scoreState = atom({
  key: "score", // unique ID (with respect to other atoms/selectors)
  default: 10, // default value (aka initial value)
});


export const laserPositionState = atom({
  key: "laserPositions", // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const whitemeteorPositionState = atom({
  key: "meteorPositions", // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});
