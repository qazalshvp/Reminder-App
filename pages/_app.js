// pages/_app.js
import "../styles/global.css"; // اضافه کردن فایل CSS عمومی
import "../styles/Home.module.css"; // اضافه کردن فایل CSS ماژول

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
