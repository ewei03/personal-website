import { Link } from "react-router-dom";
import { SplitText } from "../components/ui.jsx";
import { ArrowLeft } from "../components/Icons.jsx";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh" }}>
      <div className="container">
        <SplitText text="This page wandered" accent="off." />
        <p className="fade-up" style={{ animationDelay: "400ms" }}>Nothing here.</p>
        <Link className="btn btn-primary fade-up" style={{ animationDelay: "550ms" }} to="/"><ArrowLeft /> Back home</Link>
      </div>
    </section>
  );
}
