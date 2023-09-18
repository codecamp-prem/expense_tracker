import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../models/categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 character(s)" }),
  amount: z
    .number({ invalid_type_error: "Amount field is required." })
    .min(1, { message: "Amount must be greater than or equal to 1" }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});

type formData = z.infer<typeof schema>;

interface Props {
  addExpense: (newItem: {}) => void;
}
const ExpenseForm = ({ addExpense }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    let id = crypto.randomUUID().toString();
    addExpense({ id, ...data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
            min="1"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
