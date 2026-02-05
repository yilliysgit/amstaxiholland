"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ContactFormData,
  ContactFormErrors,
  ContactFormState,
  CONTACT_SUBJECTS,
  ContactSubject,
} from "@/types/contactForm/contactForm";
import CustomSelect from "./CustomSelect";
import { Mail } from "lucide-react";

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const t = useTranslations("ContactPage.form");

  const [formState, setFormState] = useState<ContactFormState>({
    data: initialFormData,
    errors: {},
    isSubmitting: false,
    isSuccess: false,
    isError: false,
  });

  const validateForm = (): boolean => {
    const errors: ContactFormErrors = {};
    const { name, email, subject, message } = formState.data;

    if (!name.trim()) errors.name = t("fields.name.required");

    if (!email.trim()) {
      errors.email = t("fields.email.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t("fields.email.invalid");
    }

    if (!subject) errors.subject = t("fields.subject.required");
    if (!message.trim()) errors.message = t("fields.message.required");

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: undefined },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true, isError: false }));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState.data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setFormState({
        data: initialFormData,
        errors: {},
        isSubmitting: false,
        isSuccess: true,
        isError: false,
      });

      setTimeout(() => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
      }, 5000);
    } catch {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isError: true,
      }));
    }
  };

  return (
    <>
      {/* FORM HEADER - Premium Mercedes Style */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl border border-gray-200">
            <Mail className="w-6 h-6 text-gray-800" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {t("title")}
          </h3>
        </div>
        <p className="text-sm text-gray-600 font-light">{t("subtitle")}</p>
      </div>

      {/* SUCCESS */}
      {formState.isSuccess && (
        <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 border border-emerald-100">
          {t("success")}
        </div>
      )}

      {/* ERROR */}
      {formState.isError && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-100">
          {t("error")}
        </div>
      )}

      {/* FORM - Premium Mercedes Style */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* NAME */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
            {t("fields.name.label")}
          </label>

          <input
            type="text"
            name="name"
            value={formState.data.name}
            onChange={handleChange}
            placeholder={t("fields.name.placeholder")}
            className={`w-full px-4 py-3.5 bg-white border ${
              formState.errors.name ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 placeholder-gray-400 font-normal`}
          />

          {formState.errors.name && (
            <p className="mt-1 text-xs text-red-600">{formState.errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
            {t("fields.email.label")}
          </label>

          <input
            type="email"
            name="email"
            value={formState.data.email}
            onChange={handleChange}
            placeholder={t("fields.email.placeholder")}
            className={`w-full px-4 py-3.5 bg-white border ${
              formState.errors.email ? "border-red-300" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 placeholder-gray-400 font-normal`}
          />

          {formState.errors.email && (
            <p className="mt-1 text-xs text-red-600">{formState.errors.email}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
            {t("fields.phone.label")}
            <span className="text-gray-400 ml-1 font-normal">{t("fields.phone.optional")}</span>
          </label>

          <input
            type="tel"
            name="phone"
            value={formState.data.phone}
            onChange={handleChange}
            placeholder={t("fields.phone.placeholder")}
            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 placeholder-gray-400 font-normal"
          />
        </div>

        {/* SUBJECT */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
            {t("fields.subject.label")}
          </label>

          <CustomSelect
            value={formState.data.subject}
            onChange={(v) =>
              setFormState((prev) => ({
                ...prev,
                data: { ...prev.data, subject: v as ContactSubject },
              }))
            }
            options={CONTACT_SUBJECTS.map((s) => ({
              value: s,
              label: t(`fields.subject.options.${s}`),
            }))}
            placeholder={t("fields.subject.placeholder")}
            error={!!formState.errors.subject}
          />

          {formState.errors.subject && (
            <p className="mt-1 text-xs text-red-600">{formState.errors.subject}</p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2 uppercase tracking-[0.15em]">
            {t("fields.message.label")}
          </label>

          <textarea
            name="message"
            rows={4}
            value={formState.data.message}
            onChange={handleChange}
            placeholder={t("fields.message.placeholder")}
            className={`w-full px-4 py-3.5 bg-white border ${
              formState.errors.message ? "border-red-300" : "border-gray-200"
            } rounded-xl resize-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-all duration-300 text-gray-900 placeholder-gray-400 font-normal`}
          />

          {formState.errors.message && (
            <p className="mt-1 text-xs text-red-600">{formState.errors.message}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn-gradient-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formState.isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </>
  );
}