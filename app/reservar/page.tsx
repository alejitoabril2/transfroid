import type { Metadata } from "next";
import { ReservationForm } from "../../components/home/ReservationForm";

export const metadata: Metadata = {
  title: "Reservar servicio",
  description: "Solicita información para tu próximo recorrido con TRANSFROID FAM SAS.",
};

export default function ReservationPage() {
  return (
    <main className="relative overflow-hidden bg-[#F5FCFF] px-5 pb-16 pt-32 text-[#031B3A] md:px-10 md:pb-20 md:pt-40 lg:px-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(0,217,255,0.22),transparent_26%),radial-gradient(circle_at_92%_20%,rgba(183,255,0,0.2),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,119,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,119,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative mx-auto max-w-[1240px]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0077FF]">Reserva de servicio</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,5rem)] font-semibold uppercase leading-[0.9]">COORDINEMOS TU PRÓXIMO RECORRIDO.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#294761]">Completa tus datos y cuéntanos qué necesitas transportar. Te responderemos con una propuesta para tu operación.</p>
        </div>
        <div className="mt-10">
          <ReservationForm />
        </div>
      </div>
    </main>
  );
}
