import { useRouteError, Link, useNavigate } from "react-router-dom"


export const Error = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="bg-[#F2E1C2]">
            <h1>Uh oh! We’ve got a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div >
                <button
                    onClick={() => navigate(-1)}
                >

                    <span>Go Back</span>
                </button>
                <Link
                    to="/"
                >
                    <span>Go home</span>
                </Link>
            </div>
        </div>
    )
}

