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
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
export default App;
