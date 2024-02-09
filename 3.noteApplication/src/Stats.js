export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>🚀 Start adding some items to your packing list</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((itm) => itm.finished).length;
  const percentage = ((numPacked / numItems) * 100).toFixed(1);

  return (
    <footer className="stats">
      <em>
        {percentage === 100.0
          ? "You achieved it!!!!!! Ready to plan your next project?"
          : `You have ${numItems} objectives, ${numPacked} have been completed ✅(${percentage} %)`}
      </em>{" "}
    </footer>
  );
}
