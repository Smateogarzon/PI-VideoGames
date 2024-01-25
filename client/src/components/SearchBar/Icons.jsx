import {FaWindows} from 'react-icons/fa';
import {FaXbox} from 'react-icons/fa';
import {FaPlaystation} from 'react-icons/fa';
import {BsNintendoSwitch} from 'react-icons/bs';
import {FaApple} from 'react-icons/fa6';
import {IoLogoAndroid} from 'react-icons/io';
import {FaLinux} from 'react-icons/fa6';
import {SiWii} from 'react-icons/si';
import {SiAtari} from 'react-icons/si';
import {SiWebmoney} from 'react-icons/si';

export default function Icons({platforms, cardP}) {
  const logsPlatforms = {
    pc: {name: 'pc', icon: <FaWindows />},
    xbox: {name: 'xbox', icon: <FaXbox />},
    playstation: {name: 'playstation', icon: <FaPlaystation />},
    nintendo: {name: 'nintendo', icon: <BsNintendoSwitch />},
    mac: {name: 'mac', icon: <FaApple />},
    android: {name: 'android', icon: <IoLogoAndroid />},
    linux: {name: 'linux', icon: <FaLinux />},
    wii: {name: 'wii', icon: <SiWii />},
    atari: {name: 'atari', icon: <SiAtari />},
    web: {name: 'web', icon: <SiWebmoney />},
  };

  const renderIcon = new Set();
  if (platforms) {
    platforms.forEach((platform) => {
      for (const key in logsPlatforms) {
        if (platform.toLowerCase().includes(logsPlatforms[key].name)) {
          renderIcon.add(logsPlatforms[key].icon);
        }
        if (renderIcon.size === 4) {
          break;
        }
      }
    });
  }
  const renderIconC = new Set();
  if (cardP && typeof cardP[0] === 'object') {
    cardP.forEach((platforms) => {
      for (const key in logsPlatforms) {
        if (
          platforms.platform.name
            .toLowerCase()
            .includes(logsPlatforms[key].name)
        ) {
          renderIconC.add(logsPlatforms[key].icon);
        }
      }
    });
  } else if (cardP) {
    cardP.forEach((platforms) => {
      for (const key in logsPlatforms) {
        if (platforms.toLowerCase().includes(logsPlatforms[key].name)) {
          renderIconC.add(logsPlatforms[key].icon);
        }
      }
    });
  }
  const renderIconArrayP = Array.from(renderIcon);
  const renderIconArrayC = Array.from(renderIconC);
  let morPlatforms = 0;
  if (renderIconArrayP.length) {
    morPlatforms = platforms.length > 4 ? platforms.length - 4 : false;
  }
  return (
    <>
      {renderIconArrayP.length > 0 &&
        renderIconArrayP.map((icon, i) => <span key={i}>{icon}</span>)}
      {renderIconArrayP.length > 0 && morPlatforms && (
        <span>+{morPlatforms}</span>
      )}
      {renderIconArrayC.length > 0 &&
        renderIconArrayC.map((icon, i) => <span key={i}>{icon}</span>)}
    </>
  );
}
