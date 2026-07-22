import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const read = (path) => readFile(new URL(path, root), "utf8");

test("assembles the complete homepage in the intended order", async () => {
  const page = await read("app/page.tsx");
  const expected = [
    "<TruckScrollHero />",
    "<IntroSection />",
    "<ProcessSection />",
    "<ServicesSection />",
    "<MetricsSection />",
    "<FleetSection />",
    "<FinalCTA />",
  ];

  let previous = -1;
  for (const component of expected) {
    const current = page.indexOf(component);
    assert.ok(current > previous, `${component} debe conservar el orden editorial`);
    previous = current;
  }

  assert.match(page, /openGraph:/);
  assert.match(page, /twitter:/);
  assert.match(page, /transporte refrigerado Colombia/);
});

test("uses one H1 and the approved Spanish hero story", async () => {
  const hero = await read("components/home/HeroSequence.tsx");
  assert.equal(hero.match(/<h1\b/g)?.length, 1);
  assert.match(hero, /MOVEMOS TU CARGA\. PROTEGEMOS SU TEMPERATURA\./);
  assert.match(hero, /Transportamos tu carga con responsabilidad, oportunidad y preservación de la cadena de frío\./);
  assert.match(hero, /SEGURIDAD Y CONTROL EN CADA KILÓMETRO\./);
  assert.match(hero, /Precisión, frescura intacta y tecnología para preservar la integridad de su mercancía\./);
  assert.match(hero, /TU TRANQUILIDAD ES NUESTRO COMPROMISO EN CADA KILÓMETRO\./);
  assert.match(hero, /DE LA CARRETERA AL CENTRO LOGÍSTICO\./);
  assert.doesNotMatch(hero, /warehouse/i);
});

test("uses the real brand asset and all operational imagery", async () => {
  const assets = [
    "public/images/transfroid/brand/transfroid-logo-vertical-768.webp",
    "public/images/transfroid/hero/hero-desktop-master.webp",
    "public/images/transfroid/hero/hero-mobile-master.webp",
    "public/images/transfroid/process/recoleccion.webp",
    "public/images/transfroid/process/conservacion.webp",
    "public/images/transfroid/process/trazabilidad.webp",
    "public/images/transfroid/process/entrega.webp",
    "public/images/transfroid/fleet/mula.webp",
    "public/images/transfroid/fleet/doble-troque.webp",
    "public/images/transfroid/fleet/sencillo.webp",
    "public/images/transfroid/fleet/turbo.webp",
    "public/images/transfroid/cta/cta-final-desktop.webp",
  ];

  await Promise.all(assets.map((asset) => access(new URL(asset, root))));
  const logo = await read("components/brand/BrandLogo.tsx");
  assert.match(logo, /transfroid-logo-vertical-768\.webp/);
  assert.doesNotMatch(logo, />\s*Transfroid\s*</i);
});

test("does not publish an invented WhatsApp destination", async () => {
  const config = await read("lib/siteConfig.ts");
  const cta = await read("components/home/FinalCTA.tsx");
  assert.match(config, /NEXT_PUBLIC_TRANSFROID_WHATSAPP/);
  assert.match(config, /replace\(\/\\D\/g, ""\)/);
  assert.match(cta, /siteConfig\.whatsappHref \?/);
  assert.doesNotMatch(cta, /href="https:\/\/wa\.me\//);
});

test("keeps motion alternatives and accessible process controls", async () => {
  const [styles, process, data, fleet] = await Promise.all([
    read("app/globals.css"),
    read("components/home/ProcessSection.tsx"),
    read("components/home/homeData.ts"),
    read("components/home/FleetSection.tsx"),
  ]);

  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(process, /role="tablist"/);
  assert.match(process, /aria-selected=/);
  assert.match(data, /Transporte refrigerado/);
  assert.match(data, /Seguimiento y cumplimiento/);
  assert.match(fleet, /fleetImages\.map/);
  assert.doesNotMatch(fleet, /role="tablist"/);
});

test("keeps PDF-approved process, service, and fleet content", async () => {
  const [data, intro, process, fleet, assets] = await Promise.all([
    read("components/home/homeData.ts"),
    read("components/home/IntroSection.tsx"),
    read("components/home/ProcessSection.tsx"),
    read("components/home/FleetSection.tsx"),
    read("components/home/transfroidImageAssets.ts"),
  ]);

  assert.match(data, /Atendemos el requerimiento de cada cliente con oportunidad/);
  assert.match(data, /la misma calidad con la que fue recibida/);
  assert.match(data, /Operaciones logísticas/);
  assert.match(data, /Seguimiento y cumplimiento/);
  assert.match(intro, /text-\[#751C3A\]/);
  assert.match(process, /text-\[clamp\(4\.5rem,6\.5vw,7rem\)\]/);
  assert.match(fleet, /fleetImages\.map/);
  assert.match(assets, /title: "Mula"/);
  assert.match(assets, /title: "Doble troque"/);
  assert.match(assets, /title: "Sencillo"/);
  assert.match(assets, /title: "Turbo"/);
});
