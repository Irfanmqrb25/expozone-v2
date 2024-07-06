import {
  Body,
  Button,
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

interface ExpozoneVerifyEmailProps {
  token: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "";

export function VerificationEmail({ token }: ExpozoneVerifyEmailProps) {
  const confirmLink = `${baseUrl}/auth/email-verification?token=${token}`;
  return (
    <Html>
      <Head />
      <Preview>Expozone Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/assets/brand-logo.svg`}
                width="75"
                height="45"
                alt="expozone logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Konfirmasi Alamat Email Anda</Heading>
              <Text style={mainText}>
                Terima kasih telah memulai proses pembuatan akun Expozone baru.
                Kami ingin memastikan bahwa ini benar-benar Anda. Silakan
                konfirmasi dengan menekan tombol di bawah. Jika Anda tidak ingin
                membuat akun, Anda dapat mengabaikan pesan ini.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Tekan tombol untuk konfirmasi</Text>

                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={confirmLink}
                >
                  Konfirmasi
                </Button>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                Expozone tidak akan pernah menghubungi Anda melalui email untuk
                meminta Anda mengungkapkan atau memverifikasi kata sandi, nomor
                kartu kredit, atau informasi rekening bank Anda.
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
  padding: "20px 0",
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

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
