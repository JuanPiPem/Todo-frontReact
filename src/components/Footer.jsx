// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="sticky bottom-0 bg-gray-100 text-center py-4 text-sm text-gray-500">
      © {new Date().getFullYear()} JP Lezcano. All rights reserved.
    </footer>
  );
};

export default Footer;
