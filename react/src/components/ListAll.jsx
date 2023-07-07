import React, { useState, useEffect, useMemo } from "react";
import "/src/App.css";
import { Container, Form, Button } from "react-bootstrap";

export function ListAll() {
    const [expenses, setExpenses] = useState([
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
        }
    ]);
    const [total, setTotal] = useState("0.00");
    const [idToDelete, setIdToDelete] = useState(0);

    // pag nagload yung component
    useEffect(function () {
        loadExpenses();
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        if (e.target.description.value.trim() === '' || e.target.amount.value.trim() === '') {
            alert('Please add a description and amount');
        } else if (!isNaN(parseInt(e.target.description.value))){
            alert('Description cannot be a number');
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

    const loadExpenses = () => {
        const expensesFromStorage = localStorage.getItem("expenses");
        if (expensesFromStorage !== null) {
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
                    <ExpenseContainer data={expenses} />
                </div>
            </Container>
        </>
    )
}

function ExpenseContainer(props) {

    if (props.data.length > 0 ) {
        const items = useMemo(() => props.data.map((expense, index) =>      
        <li key={index} className={expense.amount>100 ? "expenseExceeds" : "expenseNotExceed"}>
            {expense.description}<span>{expense.amount}</span>
        </li>
        ), [props]);
        return <ul data-testid={"exp"} className="list">{items}</ul>;
    } else return <p>No Expense written</p>;
    
}