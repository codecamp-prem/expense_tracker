import { useState } from "react";
import { ExpenseDashBoard } from "./ExpenseDashBoard";
import ExpenseForm from "./Forms/ExpenseForm";
import ExpenseType from "./models/ExpenseType";

function App() {
  const [lists, setLists] = useState<ExpenseType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const onAddNewExpense = (newItem: {}) => {
    setLists([...lists, newItem]);
  };

  const onDeleteExpense = (deleteId: string) => {
    setLists(lists.filter((list) => list.id !== deleteId));
  };

  const filterCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const visibleExpenses = selectedCategory
    ? lists.filter((list) => list.category === selectedCategory)
    : lists;

  return (
    <>
      <ExpenseForm addExpense={onAddNewExpense} />
      <ExpenseDashBoard
        lists={visibleExpenses}
        deleteExpense={onDeleteExpense}
        filterCategory={filterCategory}
      />
    </>
  );
}

export default App;
