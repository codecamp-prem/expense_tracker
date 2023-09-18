// import { useState } from "react";
// import { ExpenseDashBoard } from "./ExpenseDashBoard";
// import ExpenseForm from "./Forms/ExpenseForm";
// import ExpenseType from "./models/ExpenseType";

// function App() {
//   const [lists, setLists] = useState<ExpenseType[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const onAddNewExpense = (newItem: ExpenseType) => {
//     setLists([...lists, newItem]);
//   };

//   const onDeleteExpense = (deleteId: string) => {
//     setLists(lists.filter((list) => list.id !== deleteId));
//   };

//   const filterCategory = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const visibleExpenses = selectedCategory
//     ? lists.filter((list) => list.category === selectedCategory)
//     : lists;

//   return (
//     <>
//       <ExpenseForm addExpense={onAddNewExpense} />
//       <ExpenseDashBoard
//         lists={visibleExpenses}
//         deleteExpense={onDeleteExpense}
//         filterCategory={filterCategory}
//       />
//     </>
//   );
// }
import useUsers from "./hooks/useUsers";
import UserService, { User } from "./services/user-service";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    //optimistic update
    setUsers(users.filter((u) => u.id !== user.id));

    UserService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];

    const newUser = { id: 0, name: "John Doe" };
    // Again Optimistic update
    setUsers([newUser, ...users]);

    UserService.create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];

    const updated_User = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updated_User : u)));

    UserService.update(updated_User).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
