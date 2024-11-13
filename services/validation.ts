import * as validations from '@vuelidate/validators'

export type ValidationRule =
    | 'requiredValidator'
    | 'emailValidator'
    | 'minLengthValidator'
    | 'maxLengthValidator'
    | 'sameAsValidator'
    | 'numericValidator'
    | 'minValueValidator'
    | 'maxValueValidator'
    | 'integerValidator'
    | 'decimalValidator'
    | 'alphaValidator'
    | 'alphaNumValidator'
    | 'mobileValidator'
export const requiredValidator = (fieldName: string) =>
    validations.helpers.withMessage('هذا الحقل مطلوب', validations.required)
export const emailValidator = (fieldName: string) =>
    validations.helpers.withMessage(
        `${fieldName} ليس بريد الكتروني صالح`,
        validations.email
    )
export const minLengthValidator = (fieldName: string, minLength: number) =>
    validations.helpers.withMessage(
        ` يجب ان يكون على الاقل ${minLength} حروف`,
        validations.minLength(minLength)
    )
export const maxLengthValidator = (fieldName: string, maxLength: number) =>
    validations.helpers.withMessage(
        ` يجب ان يكون على الاكثر ${maxLength} حروف`,
        validations.maxLength(maxLength)
    )
export const sameAsValidator = (fieldName: string, fieldToMatch: string) =>
    validations.helpers.withMessage(
        ` يجب ان يطابق ${fieldToMatch}`,
        validations.sameAs(fieldToMatch)
    )
export const numericValidator = (fieldName: string) =>
    validations.helpers.withMessage(`يجب ان يكون رقم`, validations.numeric)
export const minValueValidator = (fieldName: string, minValue: number) =>
    validations.helpers.withMessage(
        `${fieldName} must be at least ${minValue}`,
        validations.minValue(minValue)
    )
export const maxValueValidator = (fieldName: string, maxValue: number) =>
    validations.helpers.withMessage(
        `${fieldName} must be at most ${maxValue}`,
        validations.maxValue(maxValue)
    )
export const integerValidator = (fieldName: string) =>
    validations.helpers.withMessage(
        `${fieldName} must be an integer`,
        validations.integer
    )
export const decimalValidator = (fieldName: string) =>
    validations.helpers.withMessage(
        `${fieldName} must be a decimal`,
        validations.decimal
    )
export const alphaValidator = (fieldName: string) =>
    validations.helpers.withMessage(
        `${fieldName} must contain only alphabetic characters`,
        validations.alpha
    )
export const alphaNumValidator = (fieldName: string) =>
    validations.helpers.withMessage(
        `${fieldName} must contain only alphanumeric characters`,
        validations.alphaNum
    )
// iraqi mobile number with +964 or 00964 or 077 or 078 or 079
export function mobileValidator(fieldName: string) {
    return validations.helpers.withMessage(
        `${fieldName} must be a valid mobile number`,
        (value: string) => {
            return /^(\+?964|00964|0)(77|78|79)\d{8}$/.test(value)
        }
    )
}
