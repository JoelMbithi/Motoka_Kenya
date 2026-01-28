/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useCallback } from "react"
import type { z } from "zod"
import { validateForm } from "@/lib/validation"

interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>
  initialData: T
  onSubmit?: (data: T) => Promise<void> | void
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  initialData,
  onSubmit,
}: UseFormValidationOptions<T>) {
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateSingleField = useCallback(
    (field: keyof T, value: any) => {
      // For single field validation, we validate the entire form
      // and extract the error for the specific field
      const testData = { ...data, [field]: value }
      const result = validateForm(schema, testData)
      return (result.errors as Record<string, string>)[field as string] || null
    },
    [schema, data],
  )

  const updateField = useCallback(
    (field: keyof T, value: any) => {
      setData((prev) => ({ ...prev, [field]: value }))

      // Clear error when user starts typing
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field as string]
          return newErrors
        })
      }
    },
    [errors],
  )

  const validateFieldOnBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field]: true }))

      const error = validateSingleField(field, data[field])
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }))
      }
    },
    [data, validateSingleField],
  )

  const validateAllFields = useCallback(() => {
    const result = validateForm(schema, data)
    setErrors(result.errors)

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(data).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    return result.isValid
  }, [schema, data])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }

      const isValid = validateAllFields()
      if (!isValid || !onSubmit) return

      setIsSubmitting(true)
      try {
        await onSubmit(data)
      } catch (error) {
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [data, onSubmit, validateAllFields],
  )

  const reset = useCallback(() => {
    setData(initialData)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialData])

  const getFieldError = useCallback(
    (field: keyof T) => {
      return touched[field as string] ? errors[field as string] : undefined
    },
    [errors, touched],
  )

  const isFieldValid = useCallback(
    (field: keyof T) => {
      return !getFieldError(field)
    },
    [getFieldError],
  )

  const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length > 0

  return {
    data,
    errors,
    touched,
    isSubmitting,
    isFormValid,
    updateField,
    validateFieldOnBlur,
    validateAllFields,
    handleSubmit,
    reset,
    getFieldError,
    isFieldValid,
  }
}
