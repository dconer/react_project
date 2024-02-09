import { useState } from "react";

function helperSortItems(items, sortBy) {
  let sortedItems;
  if (sortBy === "input") sortedItems = items.slice();
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "finished")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.finished) - Number(b.finished));
  return sortedItems;
}

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onDeleteAllItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = helperSortItems(items, sortBy);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((note) => (
          <Note
            note={note}
            onToggleItem={onToggleItem}
            onDeleteItems={onDeleteItems}
            key={note.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="finished">Sort by finished status</option>
        </select>
        <button onClick={onDeleteAllItems}>Clear all</button>
      </div>
    </div>
  );
}

function Note({ note, onDeleteItems, onToggleItem }) {
  const { finished, description, priority, id } = note;

  return (
    <li>
      <input
        type="checkbox"
        value={finished}
        onChange={() => onToggleItem(id, finished)}
      />

      <span style={finished ? { textDecoration: "line-through" } : {}}>
        <strong style={{ color: "#15a937" }}>{priority})</strong> {description}
      </span>
      <button onClick={() => onDeleteItems(note.id)}>🗑️</button>
    </li>
  );
}
