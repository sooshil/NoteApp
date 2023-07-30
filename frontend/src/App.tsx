import { Container } from 'react-bootstrap';
import styles from "./styles/NotesPage.module.css";
import { useEffect, useState } from 'react';
import LoginModel from './components/LoginModel';
import NavBar from './components/NavBar';
import SignUpModel from './components/SignUpModel';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';


function App() {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await NotesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLoggedInUser();
    }, []); //this empty array insures this code will run once at the beginning.

    return (
        <div>
            <NavBar
                loggedInUser={loggedInUser}
                onLoginClicked={() => setShowLoginModal(true)}
                onSignUpClicked={() => setShowSignUpModal(true)}
                onLogoutSuccess={() => setLoggedInUser(null)}
            />
            <Container className={styles.notesPage}>
                <>
                    {
                        loggedInUser
                            ? <NotesPageLoggedInView />
                            : <NotesPageLoggedOutView />
                    }
                </>

            </Container>

            {
                showSignUpModal && <SignUpModel
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccess={(user) => {
                        setLoggedInUser(user);
                        setShowSignUpModal(false);
                    }}
                />
            }
            {
                showLoginModal && <LoginModel
                    onDismiss={() => setShowLoginModal(false)}
                    onLoginSuccess={(user) => {
                        setLoggedInUser(user);
                        setShowLoginModal(false);
                    }}

                />
            }
        </div>
    );
}

export default App;
