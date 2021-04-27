import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { Grid, TextField, TextFieldProps, Box } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

export interface LabeledTextFieldProps extends PropsWithoutRef<TextFieldProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<TextFieldProps, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <Grid item xs={12}>
        <Box {...outerProps}>
          <TextField
            fullWidth
            label={label}
            {...input}
            disabled={submitting}
            {...props}
          // ref={ref}
          />

          {touched && normalizedError && (
            <Alert severity="error" role="alert" style={{ color: "red" }}>
              {normalizedError}
            </Alert>
          )}
        </Box>
      </Grid>
    )
  }
)

export default LabeledTextField
