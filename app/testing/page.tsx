import Container from "@/components/Container";
import { VerificationEmail } from "@/components/email/VerificationEmail";
import React from "react";

const page = () => {
  return (
    <Container>
      <VerificationEmail token="" />
    </Container>
  );
};

export default page;
