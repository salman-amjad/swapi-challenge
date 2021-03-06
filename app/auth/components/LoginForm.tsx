import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { Typography, Grid, Box, Button } from "@material-ui/core"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "15px" }}>
        Login
      </Typography>

      <Form
        schema={Login}
        submitText="Login"
        secondaryButtonText="Sign Up"
        secondaryButtonRoute={Routes.SignupPage()}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />

        <Grid item xs={12}>
          <Link href={Routes.ForgotPasswordPage()}>
            <Typography variant="button" style={{ cursor: "pointer" }}>
              Forgot your password?
          </Typography>
          </Link>
        </Grid>
      </Form>
    </>
  )
}

export default LoginForm
