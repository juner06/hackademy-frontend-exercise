import { render } from "@testing-library/react";
import { ExpenseContainer } from "./ListAll.jsx";


describe(ExpenseContainer, () => {
    it("creates a new expense with a description and amount", () => {
        const { getByTestId } = render(<ExpenseContainer />);
        const expenseValue = getByTestId("exp").data.length;
        expect(expenseValue).toHaveLength(5);
    }); 
});

