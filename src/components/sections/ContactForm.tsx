"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormProps = { className?: string; showMoreContactsLink?: boolean };

export function ContactForm({ className = "", showMoreContactsLink = true }: ContactFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const { t } = useTranslation();

  function validate(): boolean {
    const next: typeof errors = {};
    if (nome.trim().length < 2) next.name = t("contactForm.validationNameMin");
    if (!EMAIL_REGEX.test(email.trim())) next.email = t("contactForm.validationEmailInvalid");
    if (mensagem.trim().length < 20) next.message = t("contactForm.validationMessageMin");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(
      t("contactForm.subject", { name: nome })
    );
    const body = encodeURIComponent(
      t("contactForm.body", {
        name: nome,
        email,
        message: mensagem,
      })
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setEnviado(true);
  }

  const inputBase =
    "w-full rounded-lg border bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-brand-red/50 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:ring-offset-2 focus:ring-offset-[#08000e] transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-10 w-full max-w-lg mx-auto text-left space-y-5 md:mx-0 md:max-w-none ${className}`.trim()}
      noValidate
    >
      <div>
        <label htmlFor="contact-nome" className="block text-sm font-medium text-white/80 mb-1.5">
          {t("contactForm.nameLabel")}
        </label>
        <input
          id="contact-nome"
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
          }}
          className={`${inputBase} ${errors.name ? "border-amber-500/50" : "border-white/20"}`}
          placeholder={t("contactForm.namePlaceholder")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-nome-error" : undefined}
        />
        {errors.name && (
          <p id="contact-nome-error" className="mt-1.5 text-xs text-amber-400/90" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-white/80 mb-1.5">
          {t("contactForm.emailLabel")}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
          }}
          className={`${inputBase} ${errors.email ? "border-amber-500/50" : "border-white/20"}`}
          placeholder={t("contactForm.emailPlaceholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1.5 text-xs text-amber-400/90" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="contact-mensagem" className="block text-sm font-medium text-white/80 mb-1.5">
          {t("contactForm.messageLabel")}
        </label>
        <textarea
          id="contact-mensagem"
          value={mensagem}
          onChange={(e) => {
            setMensagem(e.target.value);
            if (errors.message) setErrors((e) => ({ ...e, message: undefined }));
          }}
          rows={4}
          className={`${inputBase} resize-y ${errors.message ? "border-amber-500/50" : "border-white/20"}`}
          placeholder={t("contactForm.messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-mensagem-error" : undefined}
        />
        <p className="mt-1 text-xs text-white/45">{t("contactForm.messageHint")}</p>
        {errors.message && (
          <p id="contact-mensagem-error" className="mt-1.5 text-xs text-amber-400/90" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      {enviado ? (
        <p className="text-sm text-brand-orange" role="status">
          {t("contactForm.success")}
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg">
            {t("contactForm.submit")}
          </Button>
          {showMoreContactsLink && (
            <Button asChild variant="outline" size="lg">
              <Link href="/contato">{t("contactForm.moreContacts")}</Link>
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
