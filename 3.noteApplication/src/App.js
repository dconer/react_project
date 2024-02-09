import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);
  // Create
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  // Delete item
  function handleDeleteItems(id) {
    setItems((items) => items.filter((itm) => itm.id !== id));
  }
  // Delete all
  function handleDeleteAllItems() {
    const isConfirmed = window.confirm("Do you want to delete all your notes?");
    if (!isConfirmed) return;
    setItems([]);
  }

  // Update
  function handleToggleItem(id) {
    setItems((itms) =>
      itms.map((itm) =>
        itm.id === id ? { ...itm, finished: !itm.finished } : itm
      )
    );
  }

  return (
    <div class="main">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItems={handleDeleteItems}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}
