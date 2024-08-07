import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface TwoFactorTokenEmailProps {
  token: string;
}

export default function TwoFactorTokenEmail({
  token,
}: TwoFactorTokenEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Expozone Two Factor Authentication</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={
                  "https://utfs.io/f/4c7a2fa4-049e-4332-9103-c57f5a355ae7-96c2a5.png"
                }
                width="45"
                height="45"
                alt="Expozone Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Two Factor Authentication</Heading>
              <Text style={mainText}>
                Kode konfirmasi Anda ada di bawah ini - masukkan kode tersebut
                di kolom yang disediakan untuk menyelesaikan proses verifikasi.
              </Text>
              <Section>
                <Text style={verifyText}>Kode Verifikasi</Text>

                <Text style={codeText}>{token}</Text>
                <Text style={validityText}>
                  (Kode verifikasi valid selama 5 menit)
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Jika Anda tidak meminta email ini, tidak ada yang perlu
                dikhawatirkan, Anda dapat mengabaikannya dengan aman.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            Pesan ini diproduksi dan didistribusikan oleh Expozone, Expozone ©
            2024.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#000000",
  display: "flex",
  padding: "20px 35px",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
