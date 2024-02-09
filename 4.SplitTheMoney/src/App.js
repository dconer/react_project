import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [users, setUsers] = useState(initialFriends);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleClickButton() {
    setIsClicked((c) => !c);
  }

  function handleSelection(friend) {
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <UserList users={users} onSelection={handleSelection} />

        {isClicked && <FormAddUser setUsers={setUsers} />}

        <Button action={handleClickButton}>
          {isClicked ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setUsers={setUsers}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </div>
  );
}

function UserList({ onSelection, users }) {
  return (
    <ul>
      {users.map((friend) => (
        <User friend={friend} key={friend.id} onSelection={onSelection} />
      ))}
    </ul>
  );
}

function User({ onSelection, friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {`You owe ${friend.name} ${-friend.balance}$ soles`}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$ soles
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button action={() => onSelection(friend)}>Select</Button>
    </li>
  );
}

function FormAddUser({ setUsers }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmitUser(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    setUsers((users) => [
      ...users,
      { name, balance: 0, image: `${image}?=${id}`, id: Date.now() },
    ]);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitUser}>
      <label>🫂 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, setUsers, setSelectedFriend }) {
  const [billValue, setBillValue] = useState("");
  const [yourExpense, setYourExpense] = useState("");
  const [whoPays, setWhoPays] = useState("user");
  const yourFriendExpense = billValue - yourExpense;

  function handleSplitBill(e, whoPays, yourFriendExpense, id) {
    e.preventDefault();
    console.log(whoPays, yourFriendExpense, id);
    setUsers((people) => {
      return people.map((person) => {
        let balance;
        if (person.id === id) {
          if (whoPays === "user") {
            balance = person.balance + yourFriendExpense;
          } else {
            balance = person.balance - yourFriendExpense;
          }
          return { ...person, balance };
        }

        return person;
      });
    });
    // setSelectedFriend(null);
  }

  return (
    <form className="form-split-bill">
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(e.target.value)}
      />

      <label>🪙 Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => setYourExpense(e.target.value)}
      />

      <label>🕴🏿{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={yourFriendExpense} />

      <label>🤑 Who's paying the bill</label>
      <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button
        action={(e) =>
          handleSplitBill(e, whoPays, yourFriendExpense, selectedFriend.id)
        }
      >
        Split bill
      </Button>
    </form>
  );
}

// componente
function Button({ action, children }) {
  return (
    <button onClick={action} className="button">
      {children}
    </button>
  );
}
