import React from "react";
import "./App.css";
import { Container, Form, Button } from "react-bootstrap";

export function ListAll() {
    const [expenses, setExpenses] = React.useState([
        {
          "id": 1,
          "description": "Rent",
          "amount": 1000
        },
        {
          "id": 2,
          "description": "Groceries",
          "amount": 200
        },
        {
          "id": 3,
          "description": "Utilities",
          "amount": 150
        },
        {
          "id": 4,
          "description": "Transportation",
          "amount": 100
        },
        {
          "id": 5,
          "description": "Entertainment",
          "amount": 50
        },
       ]);
    const [total, setTotal] = React.useState("0.00");
    const [idToDelete, setIdToDelete] = React.useState(0);

    // pag nagload yung component
    React.useEffect(function () {
        loadExpenses();
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        if (e.target.description.value.trim() === '' || e.target.amount.value.trim() === '') {
            alert('Please add a text and amount');
        } else {
        const description = e.target.description.value;
        const amount = e.target.amount.value;
        const id = e.target.id.value;
        const expense = {
            id: id,
            description: description,
            amount: amount
        };
        
        var existingExpenses = localStorage.getItem("expenses");
        if (existingExpenses == null) {
            existingExpenses = [];
        }
        else {
            existingExpenses = JSON.parse(existingExpenses);
        }
        // safe na mag-add
        expense.id = existingExpenses.length + 1;
        existingExpenses.push(expense);
        var toSave = JSON.stringify(existingExpenses);
        localStorage.setItem("expenses", toSave);
        alert('Successfully added!');
        loadExpenses();
        }
    }

    /* const handleDelete = (idToDelete) => {
        setIdToDelete(idToDelete);
        const expenseFromStorage = localStorage.getItem("expenses");
        if (expenseFromStorage != null) {
            var expenseJsonData = JSON.parse(expenseFromStorage);
            var filteredExpenses = expenseJsonData.filter((expense) =>
                expense.id !== idToDelete
            );
            var filteredExpensesString = JSON.stringify(filteredExpenses);
            localStorage.setItem("expenses", filteredExpensesString);
            alert("Deleted!");
            loadExpenses();
        }
    } */


    const loadExpenses = () => {
        const expensesFromStorage = localStorage.getItem("expenses");
        if (expensesFromStorage != null) {
            const jsonExpenses = JSON.parse(expensesFromStorage);
            setExpenses(jsonExpenses);

            var totalExpense = 0;
            for (var i = 0; i < jsonExpenses.length; i++) {
                totalExpense += Number(jsonExpenses[i].amount);
                // totalExpense = totalExpense + Number(jsonExpenses[i].amount);
            }
            var totalExpenseFormatted = _numberWithCommas(totalExpense);
            setTotal(totalExpenseFormatted);
        }
    }

    const _numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }    



    return (
        <>
            <Container>
                <h2>June's Expense Tracker</h2>
            
                <Form onSubmit={handleSave}>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" type="text" placeholder="Enter description" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control step="0.01" name="amount" type="number" placeholder="Enter amount" />
                    </Form.Group>

                    <Button className="btn" color="#0F172A" type="submit">
                        Submit
                    </Button>
                </Form>

                <div>
                    <h3 className="text-center">Total Expenses PHP {total}</h3>
                </div>
                <div>
                    {expenses.map((expense, index) =>  
                        <ul key={index} className="list">
                            <li className={expense.amount>100 ? "expenseExceeds" : "expenseNotExceed"}>{expense.description}<span>${Math.abs(
                                expense.amount
                            )}</span>{/* <Button className="delete-btn" variant="danger" onClick={() => handleDelete(expense.id)}>x</Button> */}</li>
                        </ul>
                    )}
                </div>
            </Container>
        </>
    )
}