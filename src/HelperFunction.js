import { redirectDocument } from "react-router-dom";

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const deleteItems = (key, id) => {
    const data = fetchData(key);
    if(id)
    {
        const newData = data.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    } 
    return localStorage.removeItem(key);
}

export const randomColor = () => {
    const red = Math.floor(Math.random() * 256); 
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256); 
    
    return `rgb(${red}, ${green}, ${blue})`; 
}


export const delaySecond = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * 800)
    })
}

export const calculateSpendBudget = (budgetID) => {
    const expenses = fetchData("Expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
      if (expense.budgetID !== budgetID) return acc
  
      return acc += expense.amount
    }, 0)
    return budgetSpent;
  }



export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    });
}

export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    });
}

export const formatDate = (dates) =>{
    return new Date(dates).toLocaleDateString()
}

export const getTheMatch = (key,comparison,value) => {
    const data = fetchData(key) ?? [];
    return data.filter((item)=> item[comparison] === value)

}

export const updateBalance = (operation, amount) => {
    const balance = fetchData("userBalance");
    let newBalance = 0;
    if(operation === "add"){
        newBalance = +balance + +amount
    }else if(operation === "substract"){
        newBalance = +balance - +amount
    }
    return localStorage.setItem("userBalance", JSON.stringify(newBalance));
    
}

