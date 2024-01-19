import MiniCardResult from './MiniCardResult';
export default function SearchResults({data}) {
  return (
    data.length > 0 && (
      <div>
        {data.map((item) => (
          <MiniCardResult key={item.id} {...item} />
        ))}
      </div>
    )
  );
}
