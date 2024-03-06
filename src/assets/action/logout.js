import { deleteItems } from "../../HelperFunction";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function logoutAction(){
    deleteItems("userName")
    deleteItems("Budgets")
    deleteItems("Expenses")
    deleteItems("userBalance")
    deleteItems("income")
    toast.success("you've deleted your account!")

    return redirect("/")
}