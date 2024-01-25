import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {classGenres} from '../../../Redux/actions';
import {smoothScrollToTop} from '../../../assets/scroll';

export default function FilterTemplate({genre, imgGenre, text}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (text !== 'Top Rated' && text !== 'Lowest Rated') {
      dispatch(classGenres(genre));
      navigate(`/filters/${genre}`);
      smoothScrollToTop();
    } else {
      dispatch(classGenres(text));
      navigate(`/filters/${text}`);
      smoothScrollToTop();
    }
  };
  return (
    <li onClick={handleClick}>
      {' '}
      <div>
        {imgGenre && (
          <img
            src={imgGenre}
            alt={`img: ${genre}`}
            style={{width: '50px', height: '56px', borderRadius: '10px'}}
          />
        )}
      </div>
      <div style={{display: 'flex', gap: '10px', margin: 0, padding: 0}}>
        <p>{genre}</p>
        <p>{text}</p>
      </div>
    </li>
  );
}
