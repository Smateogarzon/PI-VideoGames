export default function FilterTemplate({genre, imgGenre, text}) {
  return (
    <li>
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
