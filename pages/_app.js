import React from "react";
import "../styles/globals.css";
import "../styles/mobilepage.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout/index";
import "font-awesome/css/font-awesome.css";
import "swiper/css";
import Script from "next/script";
import persistor from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { hotjar } from "react-hotjar";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    hotjar.initialize(3302739, 6);
  }, []);
  return (
    <>
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD15KqCiXEN2FKVzFgsO3Td-MyaeFotL84&libraries=places" />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GZSSE8GMGX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
                   window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-GZSSE8GMGX');;
               `}
      </Script>
      <Head>
        <meta
          name="p:domain_verify"
          content="74b83f2fc1f6b702815166d707bdcaad"
        />
        <meta
          name="google-site-verification"
          content="PoD0vRbbegsOcDDOZQHhcrbieW2ZPB616nsMmnWSKhA"
        />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined" &&
            `${window.location.origin}${useRouter().asPath}`
          }
          key="canonical"
        />
      </Head>
      <React.Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {() => (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </PersistGate>
        </Provider>
      </React.Fragment>
    </>
  );
}

export default MyApp;
