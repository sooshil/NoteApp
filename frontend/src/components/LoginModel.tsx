import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api"
import { Modal, Form, Button} from "react-bootstrap";
import { TextInputField } from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css"

interface LoginModelProps {
    onDismiss: () => void,
    onLoginSuccess: (user: User) => void,
}

const LoginModel = ({onDismiss, onLoginSuccess}: LoginModelProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSuccess(user)
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />

                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting} className={styleUtils.width100}>Login
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

export default LoginModel;