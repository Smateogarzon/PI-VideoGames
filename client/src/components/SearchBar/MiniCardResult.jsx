import {FaWindows} from 'react-icons/fa';
import {FaXbox} from 'react-icons/fa';
import {FaPlaystation} from 'react-icons/fa';
import {BsNintendoSwitch} from 'react-icons/bs';
import {FaApple} from 'react-icons/fa6';
import {IoLogoAndroid} from 'react-icons/io';
import {FaLinux} from 'react-icons/fa6';
import {SiWii} from 'react-icons/si';
import {SiAtari} from 'react-icons/si';

export default function MiniCardResult(props) {
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
  };
  const renderIcon = new Set();

  if (props.platforms) {
    props.platforms.forEach((platform) => {
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
  const renderIconArray = Array.from(renderIcon);
  const morPlatforms =
    props.platforms.length > 4 ? props.platforms.length - 4 : false;

  return (
    <div style={{backgroundColor: 'red'}}>
      <div>
        <img
          src={props.image}
          alt={props.name}
          style={{maxWidth: '150px', maxHeight: '300px'}}
        />
      </div>
      <div>
        {renderIconArray.map((icon, i) => (
          <span key={i}>{icon}</span>
        ))}
        {morPlatforms && <span>+{morPlatforms}</span>}
      </div>
      <h5>{props.name}</h5>
    </div>
  );
}
