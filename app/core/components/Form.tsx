import { ReactNode, PropsWithoutRef } from "react"
import { Link, WithRouterProps } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
export { FORM_ERROR } from "final-form"
import { Button, Grid } from "@material-ui/core"
import { Alert } from "@material-ui/lab"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  secondaryButtonText?: string;
  secondaryButtonRoute?: any;
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  secondaryButtonText,
  secondaryButtonRoute,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          <Grid container spacing={2}>
            {/* Form fields supplied as children are rendered here */}
            {children}

            {submitText && (
              <Grid item xs={12} style={{ marginTop: "6px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  {submitText}
                </Button>

                {secondaryButtonText && (
                  <Link href={secondaryButtonRoute}>
                    <Button
                      variant="text"
                      color="default"
                      style={{ marginLeft: "10px" }}
                    >
                      {secondaryButtonText}
                    </Button>
                  </Link>
                )}
              </Grid>
            )}

            {submitError && (
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <Alert severity="error" role="alert">
                  {submitError}
                </Alert>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    />
  )
}

export default Form
