const whatsappNumber = process.env.NEXT_PUBLIC_TRANSFROID_WHATSAPP?.replace(/\D/g, "") ?? "";

const whatsappMessage =
  "Hola, quiero solicitar información sobre un servicio de transporte refrigerado con Transfroid.";

export const siteConfig = {
  name: "TRANSFROID FAM SAS",
  email: "comercial@transfroid.com",
  contactEmail: "reservas@transfroid.com",
  phoneDisplay: "+57 300 000 0000",
  phoneHref: "+573000000000",
  whatsappNumber: whatsappNumber || null,
  whatsappHref: whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    : null,
  whatsappMessage,
} as const;
