import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/custom/Header";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/custom/Footer";
import Maintenance from "@/components/custom/Maintenance";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();
	// const underMaintenance = true;

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Header />
					{children}
					<Footer />
					{/* {underMaintenance ? <Maintenance /> : null} */}
				</NextIntlClientProvider>
				<script
					type="module"
					src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
				></script>
			</body>
		</html>
	);
}
