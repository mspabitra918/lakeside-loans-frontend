"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

import { api } from "@/src/lib/api";
import { validateStepOne, validateStepTwo } from "./validation";
import { Stepper, STEPS } from "@/src/components/ui/Stepper";
import { initialValues } from "./state";
import { ApplyFormValues } from "./types";

export default function ApplyForm() {
  const router = useRouter();

  const headingRef = useRef<HTMLHeadingElement>(null);

  const [step, setStep] = useState(0);

  const [values, setValues] = useState<ApplyFormValues>(initialValues);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [pending, setPending] = useState(false);

  const errorCount = Object.keys(errors).length;

  const formatUSPhone = (value: string) => {
    let digits = value.replace(/\D/g, "");

    // Remove leading US country code (1)
    if (digits.startsWith("1")) {
      digits = digits.slice(1);
    }

    // Limit to 10 digits
    digits = digits.slice(0, 10);

    if (digits.length <= 3) {
      return digits;
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleChange = (name: string, value: string | boolean) => {
    setValues((prev) => ({
      ...prev,
      [name]:
        name === "phone" && typeof value === "string"
          ? formatUSPhone(value)
          : value,
    }));

    // Clear this field's error as soon as the user edits it.
    setErrors((prev) => {
      if (!(name in prev)) return prev;

      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const nextStep = () => {
    const validationErrors = validateStepOne(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setStep(1);

      requestAnimationFrame(() => {
        headingRef.current?.focus();
      });
    }
  };

  const previousStep = () => {
    setStep(0);

    requestAnimationFrame(() => {
      headingRef.current?.focus();
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 0) {
      nextStep();
      return;
    }

    const validationErrors = validateStepTwo(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setPending(true);
      const payload = {
        ...values,
        amountRequested: Number(values.amountRequested),
        termMonths: Number(values.termMonths),
      };

      const application = await api.apply(payload);

      // firstName comes from the form we just submitted — the API does not
      // echo PII back, by design.
      const query = new URLSearchParams({
        reference: application.reference,
        status: application.status,
        firstName: values.firstName,
      });

      router.push(`/success?${query.toString()}`);
    } catch (err) {
      console.error(err);
      alert("Unable to submit your application.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
      <Stepper current={step} />

      <form noValidate onSubmit={handleSubmit} className="space-y-10">
        {/* Header */}
        <div className="flex items-baseline justify-between gap-4">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-xl font-semibold tracking-tight text-slate-900 outline-none"
          >
            {STEPS[step]?.title}
          </h2>

          <p className="shrink-0 text-sm text-slate-600">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        {/* Validation Summary */}
        {errorCount > 0 && (
          <div
            role="alert"
            className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            Please correct{" "}
            {errorCount === 1 ? "the field" : `the ${errorCount} fields`} marked
            below.
          </div>
        )}

        {/* Step One */}
        <div hidden={step !== 0}>
          <StepOne
            values={values}
            errors={errors}
            onNext={nextStep}
            onChange={handleChange}
          />
        </div>

        {/* Step Two */}
        <div hidden={step !== 1}>
          <StepTwo
            values={values}
            errors={errors}
            pending={pending}
            onBack={previousStep}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
