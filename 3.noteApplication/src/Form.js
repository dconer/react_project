import { useState } from "react";

export default function Form({ onAddItems }) {
  const [descriptionInput, setDescriptionInput] = useState("");
  const [prioritySelect, setPrioritySelect] = useState("1");

  const optionValues = Array.from({ length: 5 }, (_, i) => i + 1);

  function handleSubmit(e) {
    e.preventDefault();
    // Validate  data
    if (!descriptionInput) return;

    // Serialize data
    const newItem = {
      description: descriptionInput,
      priority: prioritySelect,
      finished: false,
      id: Date.now(),
    };

    onAddItems(newItem);
    // synchronize UI
    setDescriptionInput("");
    setPrioritySelect(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Set out to change. Write your first objective:</h3>

      <select
        title="Priority level"
        value={prioritySelect}
        onChange={(e) => {
          return setPrioritySelect(+e.target.value);
        }}
      >
        {optionValues.map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Write your future..."
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
