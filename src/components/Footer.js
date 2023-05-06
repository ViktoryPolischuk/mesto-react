import React from "react";

const currentYear = new Date().getFullYear()

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__copyright">© {currentYear} Mesto Russia</p>
    </footer>
  )
}

export default Footer
