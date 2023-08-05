
import { useEffect, useState } from 'react';
import LoginModel from './components/LoginModel';
import NavBar from './components/NavBar';
import SignUpModel from './components/SignUpModel';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPages';
import PrivacyPage from './pages/PrivacyPage';
import PageNotFound from './pages/NoteFoundPage';
import styles from "./styles/App.module.css";


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
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []); //this empty array insures this code will run once at the beginning.

    return (
        <BrowserRouter>
            <div>
                <NavBar
                    loggedInUser={loggedInUser}
                    onLoginClicked={() => setShowLoginModal(true)}
                    onSignUpClicked={() => setShowSignUpModal(true)}
                    onLogoutSuccess={() => setLoggedInUser(null)}
                />

                <Container className= {styles.pageContainer}>
                    <Routes>
                        <Route
                            path='/'
                            element={<NotesPage loggedInUser={loggedInUser} />}
                        />
                        <Route
                            path='/privacy-policy'
                            element={<PrivacyPage />}
                        />
                        <Route
                            path='/*'
                            element={<PageNotFound />}
                        />
                    </Routes>
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
        </BrowserRouter>
    );
}

export default App;
