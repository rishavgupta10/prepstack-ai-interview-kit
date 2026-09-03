import { RegisterForm } from "@/features/auth/components/register-form"
import { PublicRoute } from "@/shared/components/public-route"

const RegisterPage = () => {
    return (
        <PublicRoute>
            <RegisterForm />
        </PublicRoute>
    )
}

export default RegisterPage
