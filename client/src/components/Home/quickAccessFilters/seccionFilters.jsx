import FilterTemplate from './FilterTemplate';
import {genres} from '../../../Redux/actions';
import {useDispatch} from 'react-redux';

export default function SeccionFilters() {
  const dispatch = useDispatch();
  dispatch(genres());

  return (
    <div>
      <h1>Home</h1>
      <div>
        <ul></ul>
      </div>
    </div>
  );
}
