import { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Clanstvo.css";

const membershipModels = [
  {
    title: "Škola nogometa (U7-U11)",
    price: "50 EUR / mjesec",
    points: ["3 treninga tjedno", "Liga i nastupi na turnirima", "Podrška licenciranih trenera"],
  },
  {
    title: "Natjecateljske selekcije (U12-U19)",
    price: "50 EUR / mjesec",
    points: ["4 treninga tjedno", "Liga i prijateljske utakmice", "Individualni razvoj igrača"],
  },
  {
    title: "Podrška klubu",
    price: "60 EUR / godišnje",
    points: ["Članska iskaznica", "Poziv na klupske događaje", "Direktna podrška radu škole"],
  },
];

const benefits = [
  "Jasan plan treninga kroz cijelu sezonu",
  "Stručan rad trenera s djecom svih uzrasta",
  "Sigurno i poticajno okruženje za razvoj",
  "Redovita komunikacija s roditeljima i igračima",
];

const EMAIL_SERVICE_ID = "service_mu4ey3m";
const EMAIL_TEMPLATE_ID = "template_lalyc4z";
const EMAIL_PUBLIC_KEY = "PjBX4wgsPs_wWAWRH";
const WHATSAPP_TARGET_RAW = process.env.REACT_APP_WHATSAPP_NUMBER || "+385981747339";
const WHATSAPP_TARGET = WHATSAPP_TARGET_RAW.replace(/\D/g, "") || "+385981747339";
const WHATSAPP_DISPLAY = WHATSAPP_TARGET_RAW.startsWith("+")
  ? WHATSAPP_TARGET_RAW
  : `+${WHATSAPP_TARGET}`;

const Clanstvo = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [formValues, setFormValues] = useState({
    childName: "",
    birthDate: "",
    parentName: "",
    phone: "",
    user_email: "",
    notes: "",
  });

  const compiledMessage = useMemo(() => {
    const parts = [
      "Nova prijava za članstvo",
      `Dijete: ${formValues.childName || "-"}`,
      `Datum rodenja: ${formValues.birthDate || "-"}`,
      `Roditelj: ${formValues.parentName || "-"}`,
      `Telefon: ${formValues.phone || "-"}`,
      `E-mail: ${formValues.user_email || "-"}`,
      `Napomena: ${formValues.notes || "-"}`,
    ];

    return parts.join("\n");
  }, [formValues]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    setIsSending(true);
    setSendError("");

    try {
      await emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, formRef.current, {
        publicKey: EMAIL_PUBLIC_KEY,
      });

      setIsSent(true);
    } catch (error) {
      console.log("FAILED...", error?.text || error?.message || error);
      setSendError("Slanje trenutno nije uspjelo. Pokušaj ponovno.");
    } finally {
      setIsSending(false);
    }
  };

  const handleWhatsAppSend = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_TARGET}?text=${encodeURIComponent(compiledMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="clanstvo-page">
      <div className="clanstvo-atmosphere clanstvo-atmosphere-left" />
      <div className="clanstvo-atmosphere clanstvo-atmosphere-right" />

      <div className="clanstvo-shell">
        <header className="clanstvo-hero">
          <p className="clanstvo-kicker">NK POLET SVETA KLARA</p>
          <h1>Upiši dijete u NK Polet</h1>
          <p>
            Učlanjenjem u NK Polet dijete dobiva kvalitetan trening, natjecateljski razvoj
            i podršku trenerskog tima u sigurnom i sportskom okruženju.
          </p>
          <div className="clanstvo-hero-actions">
            <a href="#upis" className="clanstvo-btn clanstvo-btn-primary">Upiši dijete</a>
            <a href="#kontakt" className="clanstvo-btn clanstvo-btn-ghost">Kontaktiraj nas</a>
          </div>
        </header>

        <section className="clanstvo-layout-two">
          <article className="clanstvo-panel">
            <h2>Zašto odabrati Polet?</h2>
            <ul className="clanstvo-list">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Kako izgleda upis</h3>
            <ol className="clanstvo-steps">
              <li>Ispuni prijavu kroz obrazac ili WhatsApp poruku.</li>
              <li>Kontaktiramo te i dogovorimo probni trening.</li>
              <li>Nakon potvrde, igrač se priključuje odgovarajućoj grupi.</li>
            </ol>
          </article>

          <article className="clanstvo-panel">
            <h2>Modeli članstva</h2>
            <div className="clanstvo-models">
              {membershipModels.map((model) => (
                <div className="clanstvo-model-card" key={model.title}>
                  <p className="clanstvo-model-title">{model.title}</p>
                  <p className="clanstvo-model-price">{model.price}</p>
                  <ul>
                    {model.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="clanstvo-panel clanstvo-signup" id="upis">
          <h2>Prijava za članstvo / obrazac za kontakt</h2>
          <p>
            Ispuni osnovne podatke. Naš tim će se javiti s detaljima o terminu probnog
            treninga, grupi i svim koracima upisa.
          </p>

          <form
            id="clanstvo-form"
            ref={formRef}
            className="clanstvo-form"
            onSubmit={handleEmailSubmit}
          >
            <input
              type="hidden"
              name="user_name"
              value={formValues.parentName || formValues.childName || "Prijava članstva"}
              readOnly
            />
            <input type="hidden" name="message" value={compiledMessage} readOnly />

            <label>
              Ime i prezime djeteta
              <input
                type="text"
                name="childName"
                placeholder="Unesite ime i prezime"
                required
                value={formValues.childName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Datum rođenja
              <input
                type="date"
                name="birthDate"
                required
                value={formValues.birthDate}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ime i prezime roditelja
              <input
                type="text"
                name="parentName"
                placeholder="Unesite ime roditelja"
                required
                value={formValues.parentName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Kontakt telefon
              <input
                type="tel"
                name="phone"
                placeholder="npr. +385 91 123 4567"
                required
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </label>
            <label className="clanstvo-field-wide">
              E-mail
              <input
                type="email"
                name="user_email"
                placeholder="ime.prezime@email.com"
                required
                value={formValues.user_email}
                onChange={handleInputChange}
              />
            </label>
            <label className="clanstvo-field-wide">
              Napomena / kontakt poruka
              <textarea
                name="notes"
                rows="4"
                placeholder="Dob i prethodno iskustvo (opcionalno) ili Vaša poruka za kontakt"
                value={formValues.notes}
                onChange={handleInputChange}
              />
            </label>
          </form>

          <div className="clanstvo-signup-actions">
            <button
              type="submit"
              form="clanstvo-form"
              className="clanstvo-btn clanstvo-btn-primary"
              disabled={isSending}
            >
              {isSending ? "Šaljem prijavu..." : isSent ? "Prijava poslana" : "Pošalji prijavu"}
            </button>

            <button
              type="button"
              className="clanstvo-btn clanstvo-btn-whatsapp"
              onClick={handleWhatsAppSend}
            >
              Pošalji na WhatsApp
            </button>

            <p>Telefon: {WHATSAPP_DISPLAY}</p>
          </div>

          {isSent && <p className="clanstvo-status clanstvo-status-success">Prijava je uspješno poslana.</p>}
          {sendError && <p className="clanstvo-status clanstvo-status-error">{sendError}</p>}
        </section>

        <section className="clanstvo-layout-two" id="kontakt">
          <article className="clanstvo-panel">
            <h2>Kontakt i lokacija</h2>
            <p>NK Polet Sveta Klara</p>
            <p>Sveta Klara - Zagreb</p>
            <p>E-mail: info@nkpolet.hr</p>
            <p>Treninzi: ponedjeljak - petak, 18:00 - 21:00</p>
          </article>

          <article className="clanstvo-panel">
            <h2>Najčešća pitanja</h2>
            <details>
              <summary>Koja je minimalna dob za upis?</summary>
              <p>Primamo djecu od 6 godina, raspoređenu po dobnim kategorijama.</p>
            </details>
            <details>
              <summary>Je li moguć probni trening?</summary>
              <p>Da, probni trening je moguć uz prethodnu prijavu roditelja.</p>
            </details>
            <details>
              <summary>Treba li posebna oprema za početak?</summary>
              <p>Za prvi dolazak dovoljni su sportska odjeća i tenisice.</p>
            </details>
          </article>
        </section>
      </div>
    </section>
  );
};

export default Clanstvo;
