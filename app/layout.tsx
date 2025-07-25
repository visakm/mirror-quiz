import type { Metadata } from "next";
import { bostonian, ebGaramond, inter } from "@mirror-map/ui/fonts";
import WizardApolloWrapper from "~/providers/apollo/WizardApolloWrapper";
import WizardReduxWrapper from "~/providers/redux/WizardReduxWrapper";
import "../globals.sass";

export const metadata: Metadata = {
  title: "Mirror & Map",
  description: "Quiz to find your archetype",
  icons: {
    icon: "/favicon.ico",
  },
  applicationName: "Mirror and Map",
  keywords: [
    "Mirror & Map",
    "Mirror",
    "Map",
    "Astrology",
    "Houses",
    "Archetypes",
    "birth chart",
    "Quiz",
    "Supporting archetype",
    "Shadow archetype",
    "Primary archetype",
  ],
  robots: {
    index: true,
    follow: true,
  },
  authors: [
    { name: "Mohammad Mahdi Farnia", url: "https://t.me/mahdi_farnia" },
    { name: "Mehrdad Akhavan", url: "https://t.me/Mikkel_ak1" },
  ],
  openGraph: {
    title: "Mirror & Map",
    description: "Mirror & Map",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bostonian.variable}  ${ebGaramond.variable} ${inter.variable} antialiased`}
      >
        <WizardApolloWrapper>
          <WizardReduxWrapper>{children}</WizardReduxWrapper>
        </WizardApolloWrapper>
      </body>
    </html>
  );
}
