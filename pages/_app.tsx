import "src/Modules/AuthModule/Services/AuthService";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { QueryClientProvider } from "react-query";
//@ts-ignore
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import useChatListeners from "src/Modules/ChatModule/Hooks/useChatListeners";
import { strings } from "src/Utils/Localization";
import moment from "moment";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import useNotification from "src/Hooks/useNotification";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const { language, loggedIn } = useAuthValue();
  const [keyName, setKeyName] = useState(false);
  const router = useRouter();
  const productCategoryQuery = router?.query?.search;
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (language === "ar") {
      body?.classList.add("arabicFont");
      body?.classList.remove("englishFont");
    } else {
      body?.classList.add("englishFont");
      body?.classList.remove("arabicFont");
    }
  }, [language]);
  useChatListeners();
  useNotification();
  useEffect(() => {
    if (mounted) {
      strings?.setLanguage(language ?? "en");
      language ? moment.locale(language) : moment.locale("en");
      setKeyName((c: any) => !c);
    }
  }, [mounted, language]);
  useEffect(() => {
    if (
      !loggedIn &&
      router.asPath !== "/login" &&
      router.asPath !== "/login?s=showOtp"
    ) {
      sessionStorage.setItem("lastRoute", JSON.stringify(router.asPath));
    }
  }, [router]);
  useEffect(() => {
    const searchData = JSON.parse(
      String(sessionStorage.getItem("productCategoryQuery"))
    );
    if (productCategoryQuery && router?.pathname === "/search-product") {
      router.replace(
        `${router?.pathname}?search=${
          language === "en" ? searchData[0] : searchData[1]
        }`
      );
    }
  }, [productCategoryQuery, language]);
  return (
    <Fragment key={keyName ? 0 : 1}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>
        {mounted ? (
          <QueryClientProvider client={queryClient}>
            <Head>
              <title>Cachoo</title>
              <link rel="shortcut icon" href="/favicon.ico" />
              <meta name="google" content="notranslate"></meta>
            </Head>
            <Component {...pageProps} />
            <ToastContainer icon={false} />
          </QueryClientProvider>
        ) : (
          <Fragment />
        )}
      </div>
    </Fragment>
  );
}

export default App;
