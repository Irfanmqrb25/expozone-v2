import { GetOrderItems } from "@/types";
import { Order } from "@prisma/client";
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReceiptEmailProps {
  orderId: string;
  order: Order & {
    orderItems: GetOrderItems[];
  };
  name: string;
}

export const ReceiptEmail = ({ orderId, order, name }: ReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Expozone Receipt</Preview>
    <Body style={main}>
      <Container style={container}>
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
        <Hr style={global.hr} />
        <Section style={message}>
          <Heading style={global.heading}>
            Terima kasih telah berbelanja di Expozone
          </Heading>
          <Text style={{ ...global.text, marginTop: 24 }}>
            Pesanan Anda telah berhasil diproses. Di bawah ini, Anda akan
            menemukan rincian lengkap dari pesanan Anda. Terima kasih atas
            pilihan Anda untuk berbelanja bersama kami, dan kami berkomitmen
            untuk terus memberikan pelayanan terbaik bagi Anda.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>{`Nama Pembeli: ${name}`}</Text>
          <Text style={adressTitle}>No. Pemesanan: {orderId}</Text>
        </Section>
        <Hr style={global.hr} />
        <Section
          style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
        >
          {order.orderItems.map((item) => (
            <Row key={item.id}>
              <Column>
                <Img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{ float: "left" }}
                  width="80px"
                />
              </Column>
              <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                <Text style={{ ...paragraph, fontWeight: "500" }}>
                  {item.product.name}
                </Text>
                <Text style={global.text}>{item.store.name}</Text>
              </Column>
            </Row>
          ))}
        </Section>
        <Hr style={global.hr} />
        <Text style={footerText}>
          Pesan ini diproduksi dan didistribusikan oleh Expozone, Expozone ©
          2024.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ReceiptEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
};

const footerText = {
  ...text,
  fontSize: "12px",
};
