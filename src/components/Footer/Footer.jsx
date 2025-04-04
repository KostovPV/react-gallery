import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2022;

  return (
    <footer className='footer'>
      <div className="footer__copyright">
        <small>
          Всички права запазени © {startYear}{currentYear > startYear ? `–${currentYear}` : ''}
        </small>
      </div>
    </footer>
  );
}
