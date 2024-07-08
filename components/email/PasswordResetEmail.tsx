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
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ExpozoneVerifyEmailProps {
  token: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "";

export function ResetPasswordEmail({ token }: ExpozoneVerifyEmailProps) {
  const confirmLink = `${baseUrl}/auth/forgot-password/new?token=${token}`;
  return (
    <Html>
      <Head />
      <Preview>Expozone Reset Password</Preview>
      <Tailwind>
        <Body style={main}>
          <Container style={container}>
            <Section style={coverSection}>
              <Section style={imageSection}>
                <Img
                  src={
                    "https://utfs.io/f/4c7a2fa4-049e-4332-9103-c57f5a355ae7-96c2a5.png"
                  }
                  alt="expozone logo"
                  width={45}
                  height={45}
                />
              </Section>
              <Section style={upperSection}>
                <Heading style={h1}>Permintaan Ubah Kata Sandi</Heading>
                <Text style={mainText}>
                  Klik tombol di bawah ini untuk mengubah kata sandi Anda. Link
                  akan kadaluarsa dalam 1 jam.
                </Text>
                <Section style={verificationSection}>
                  <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={confirmLink}
                  >
                    Reset Password
                  </Button>
                </Section>
              </Section>
              <Hr />
              <Section style={lowerSection}>
                <Text style={cautionText}>
                  Expozone tidak akan pernah menghubungi Anda melalui email
                  untuk meminta Anda mengungkapkan kata sandi, nomor kartu
                  kredit, atau informasi rekening bank Anda.
                </Text>
              </Section>
            </Section>
            <Text style={footerText}>
              Pesan ini diproduksi dan didistribusikan oleh Expozone, Expozone ©
              2024.
            </Text>
          </Container>
        </Body>
      </Tailwind>
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

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center" as const,
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
