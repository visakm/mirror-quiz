"use client";
import React from "react";
import { ApolloWrapper } from "@mirror-map/apollo/client/csr";
import typePolicies from "./TypePolicy";

const WizardApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloWrapper cacheConfig={{ typePolicies }}>{children}</ApolloWrapper>
  );
};

export default WizardApolloWrapper;
