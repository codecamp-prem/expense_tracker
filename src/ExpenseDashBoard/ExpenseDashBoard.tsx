import ExpenseType from "../models/ExpenseType";
import ExpenseFilter from "./ExpenseFilter";

interface Props {
  lists: ExpenseType[];
  deleteExpense: (id: string) => void;
  filterCategory: (category: string) => void;
}

const ExpenseDashBoard = ({ lists, deleteExpense, filterCategory }: Props) => {
  if (lists.length === 0) return null;

  return (
    <>
      <div className="mb-3">
        <label htmlFor="category" className="form-label"></label>
        <ExpenseFilter onSelectCategory={filterCategory} />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list.id}>
                <td>{list.description}</td>
                <td>${list.amount}</td>
                <td>{list.category}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteExpense(list.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>
                $
                {lists
                  .reduce((acumulator, list) => list.amount + acumulator, 0)
                  .toFixed(2)}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};
export default ExpenseDashBoard;
