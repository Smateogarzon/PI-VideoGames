import {useDispatch, useSelector} from 'react-redux';
import {
  platform,
  deletePlatform,
  genres,
  deleteGenres,
} from '../../../Redux/actions';
import {Genres} from '../../../assets/genres';

export default function CreataeVideoG() {
  const dispatch = useDispatch();
  const createPlatform = useSelector((state) => state.platforms);
  const createGenres = useSelector((state) => state.genres);

  const handlePlatforms = (event) => {
    const {value} = event.target;
    dispatch(platform(value));
  };
  const deletePlatforms = (event) => {
    const {textContent} = event.target;
    dispatch(deletePlatform(textContent));
  };
  const handleGenres = (event) => {
    const {value} = event.target;
    dispatch(genres(value));
  };
  const deleteGenre = (event) => {
    dispatch(deleteGenres(event.target.textContent));
  };
  return (
    <div>
      <form>
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="description">description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"></textarea>
        <label htmlFor="platforms">add Platforms:</label>
        <select
          name="platforms"
          id="platforms"
          onChange={handlePlatforms}
          defaultValue="add">
          <option value={'add'} disabled={true}>
            Select platforms
          </option>
          <option value="pc" disabled={createPlatform.includes('pc')}>
            pc
          </option>
          <option value="xbox" disabled={createPlatform.includes('xbox')}>
            xbox
          </option>
          <option
            value="playstation"
            disabled={createPlatform.includes('playstation')}>
            playstation
          </option>
          <option
            value="nintendo"
            disabled={createPlatform.includes('nintendo')}>
            nintendo
          </option>
          <option value="mac" disabled={createPlatform.includes('mac')}>
            mac
          </option>
          <option value="android" disabled={createPlatform.includes('android')}>
            android
          </option>
          <option value="linux" disabled={createPlatform.includes('linux')}>
            linux
          </option>
          <option value="wii" disabled={createPlatform.includes('wii')}>
            wii
          </option>
          <option value="atari" disabled={createPlatform.includes('atari')}>
            atari
          </option>
          <option value="web" disabled={createPlatform.includes('web')}>
            web
          </option>
        </select>
        <div>
          {createPlatform.map((platform, index) => (
            <span key={index} onClick={deletePlatforms}>
              {platform}{' '}
            </span>
          ))}
        </div>
        <label htmlFor="genres">Add Genres:</label>
        <select
          name="genres"
          id="genres"
          onChange={handleGenres}
          defaultValue="add">
          <option value="add" disabled={true}>
            Select Genres
          </option>
          {Genres.map((genre, index) => (
            <option
              key={index}
              value={genre}
              disabled={createGenres.includes(genre)}>
              {genre}
            </option>
          ))}
        </select>
        <div>
          {createGenres.map((genre, index) => (
            <span key={index} onClick={deleteGenre}>
              {genre}{' '}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}
