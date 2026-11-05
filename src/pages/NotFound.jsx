import { Link } from "react-router-dom";
import { SplitText } from "../components/ui.jsx";
import { ArrowLeft } from "../components/Icons.jsx";
import { useI18n } from "../i18n.jsx";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}>
      <div className="container">
        <SplitText text={t("This page wandered")} accent={t("off.")} />
        <p className="fade-up" style={{ animationDelay: "400ms" }}>{t("Nothing here.")}</p>
        <Link className="btn btn-primary fade-up" style={{ animationDelay: "550ms" }} to="/"><ArrowLeft /> {t("Back home")}</Link>
      </div>
    </section>
  );
}
