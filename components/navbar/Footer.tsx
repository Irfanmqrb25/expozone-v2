import { Locate, Mail, Phone } from "lucide-react";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="py-4 text-white bg-black">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="w-full md:w-1/3">
            <h3 className="mb-4 text-lg font-semibold">Tentang Kami</h3>
            <p>
              Expozone platform e-commerce terkemuka yang menawarkan beragam
              produk digital berkualitas tinggi dalam berbagai kategori.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontak Kami</h3>
            <ul className="space-y-2">
              <li>
                <Mail className="inline-block w-5 h-5 mr-2" />
                expozone@irfanmuqorib.dev
              </li>
              <li>
                <Phone className="inline-block w-5 h-5 mr-2" />
                +62 815 1133 7624
              </li>
              <li>
                <Locate className="inline-block w-5 h-5 mr-2" />
                Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>© 2024 Expozone.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
