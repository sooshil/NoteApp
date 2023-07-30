import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user"
import * as NotesApi from "../network/notes_api"

interface NavBarLoggedOutViewProps {
    onLoginClicked: () => void
    onSignUpClicked: () => void
}

const NavBarLoggedOutView = ({onLoginClicked, onSignUpClicked}: NavBarLoggedOutViewProps) => {

    return (
        <>
            <Button onClick={onLoginClicked}>Login</Button>
            <Button onClick={onSignUpClicked}>Sign Up</Button>
        </>
    );
}

export default NavBarLoggedOutView;