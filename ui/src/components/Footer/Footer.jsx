import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="line-wrapper">
        <hr className="line-hr" />
      </div>
      <div className="footer-links">
        <span className="about">ABOUT US</span>
        <span className="terms">TERMS OF SERVICES</span>
        <span className="dnr">DELIVERY AND RETURNS</span>
      </div>
    </div>
  );
}
