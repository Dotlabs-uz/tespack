import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/custom/Header";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/components/custom/Footer";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Header />
					{children}
					<Footer />
				</NextIntlClientProvider>
				<script
					type="module"
					src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
				></script>
			</body>
		</html>
	);
}
