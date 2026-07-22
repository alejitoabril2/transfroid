"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "../../lib/siteConfig";

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white text-[#031B3A] shadow-[0_26px_80px_rgba(0,0,0,0.3)] lg:grid-cols-[0.38fr_0.62fr]">
      <aside className="relative overflow-hidden bg-[#071A35] p-7 text-white sm:p-9">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B7FF00]/12" />
        <div className="relative">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#B7FF00]">Contacto</p>
          <h3 className="mt-6 text-4xl font-semibold leading-none">Hablemos</h3>
          <p className="mt-4 max-w-sm text-base leading-7 text-white/72">Cuéntanos sobre tu operación y te ayudaremos a coordinar el próximo recorrido.</p>

          <div className="mt-8 space-y-3">
            <a className="block rounded-xl border border-white/15 bg-white/8 p-4 transition hover:border-[#B7FF00]/65 focus:outline-none focus:ring-2 focus:ring-[#B7FF00]" href={`mailto:${siteConfig.contactEmail}`}>
              <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#B7FF00]">Correo provisional</span>
              <span className="mt-2 block break-all text-sm font-semibold text-white">{siteConfig.contactEmail}</span>
            </a>
            <a className="block rounded-xl border border-white/15 bg-white/8 p-4 transition hover:border-[#B7FF00]/65 focus:outline-none focus:ring-2 focus:ring-[#B7FF00]" href={`tel:${siteConfig.phoneHref}`}>
              <span className="block font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#B7FF00]">Teléfono provisional</span>
              <span className="mt-2 block text-sm font-semibold text-white">{siteConfig.phoneDisplay}</span>
            </a>
          </div>
          {siteConfig.whatsappHref ? (
            <a className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#B7FF00] px-5 text-sm font-bold text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#B7FF00] focus:ring-offset-2 focus:ring-offset-[#071A35]" href={siteConfig.whatsappHref} rel="noreferrer" target="_blank">
              Hablar por WhatsApp
            </a>
          ) : (
            <span className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white/55" aria-disabled="true">
              WhatsApp pendiente
            </span>
          )}
        </div>
      </aside>

      <form className="p-7 sm:p-9" onSubmit={submit}>
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0077FF]">Reserva tu recorrido</p>
        <h3 className="mt-3 text-3xl font-semibold leading-none">Envíanos un mensaje</h3>
        <p className="mt-3 text-sm leading-6 text-[#466179]">Completa el formulario y te contactaremos con la información de tu solicitud.</p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Nombre
            <input className="min-h-12 rounded-xl border border-[#9CB4C8] px-4 text-[#031B3A] outline-none transition placeholder:text-[#6C8499] focus:border-[#0077FF] focus:ring-2 focus:ring-[#0077FF]/20" name="nombre" autoComplete="given-name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Apellido
            <input className="min-h-12 rounded-xl border border-[#9CB4C8] px-4 text-[#031B3A] outline-none transition placeholder:text-[#6C8499] focus:border-[#0077FF] focus:ring-2 focus:ring-[#0077FF]/20" name="apellido" autoComplete="family-name" required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Correo
            <input className="min-h-12 rounded-xl border border-[#9CB4C8] px-4 text-[#031B3A] outline-none transition placeholder:text-[#6C8499] focus:border-[#0077FF] focus:ring-2 focus:ring-[#0077FF]/20" name="correo" type="email" autoComplete="email" required />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Teléfono
            <input className="min-h-12 rounded-xl border border-[#9CB4C8] px-4 text-[#031B3A] outline-none transition placeholder:text-[#6C8499] focus:border-[#0077FF] focus:ring-2 focus:ring-[#0077FF]/20" name="telefono" type="tel" autoComplete="tel" required />
          </label>
        </div>

        <label className="mt-4 grid gap-2 text-sm font-medium">
          Mensaje
          <textarea className="min-h-32 resize-y rounded-xl border border-[#9CB4C8] px-4 py-3 text-[#031B3A] outline-none transition placeholder:text-[#6C8499] focus:border-[#0077FF] focus:ring-2 focus:ring-[#0077FF]/20" name="mensaje" required />
        </label>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-5 text-[#526B80]">Al enviar aceptas que te contactemos con base en la información proporcionada.</p>
          <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B7FF00] px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#031B3A] transition hover:bg-[#00D9FF] focus:outline-none focus:ring-2 focus:ring-[#031B3A] focus:ring-offset-2" type="submit">
            Enviar solicitud
          </button>
        </div>
        <p className="mt-4 text-sm font-medium text-[#0077FF]" aria-live="polite">
          {submitted ? "Recibimos tu solicitud. Un asesor se comunicará contigo pronto." : ""}
        </p>
      </form>
    </div>
  );
}
