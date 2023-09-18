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
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    //.finally(() => {
    // get called when success or error so we don't
    // have to setLoading in .then and .catch
    // doesn't work in <React.StrictMode>
    //setLoading(false);
    //});

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    //optimistic update
    setUsers(users.filter((u) => u.id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default App;
