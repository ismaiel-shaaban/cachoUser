import Image from "next/image";
import Link from "next/link";
import React from "react";
import images from "src/Assets/images";
import styles from "./Footer.module.css";
import { strings } from "src/Utils/Localization";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section className="bg-primary pt-[30px] pb-[30px] ssm:pt-[30px] sm:pt-[30px] ">
        <div className="main-container mx-auto w-full ">
          <div className={`${styles.footerContent} flex-wrap`}>
            {/* ===== about start ===== */}
            <div className={`${styles.aboutContent}`}>
              <div className="relative w-[149px] ">
                <Image src={images.logo} className="footer _logo" />
              </div>
              <p className="font-normal text-[16px] leading-[28px] text-[#d3d6d8] mt-[25px] ssm:mt-[0px] sm:mt-[0px]">
                {strings?.welcome_to_cachoo}
                <br />
                {strings?.your_guide_to_the_market}
              </p>
              <ul className={`${styles.socialIcon}`}>
                <li>
                  <Link href="mailto:cachoo.a.f@gmail.com" passHref>
                    <Image
                      src={images.googleIcon}
                      alt="google icon"
                      width={"15px"}
                      height={"18px"}
                    />
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/cachoo_fa?s=09" passHref>
                    <a target="_blank">
                      <Image
                        src={images.twitterImg}
                        alt="twitter icon"
                        width={"15px"}
                        height={"18px"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://instagram.com/cachoo_fa?igshid=MzNlNGNkZWQ4Mg=="
                    passHref
                  >
                    <a target="_blank">
                      <Image
                        src={images.instagramIcon}
                        alt="instagram icon"
                        width={"13px"}
                        height={"18px"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/cachoo-%D9%83%D8%A7%D8%AA%D8%B4%D9%88-a3507329a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    passHref
                  >
                    <a target="_blank">
                      <Image
                        src={images.linkedinIcon}
                        alt="linedin icon"
                        width={"13px"}
                        height={"18px"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://youtube.com/@cachoo_fa?si=WwEGb3ZNEXkywQfn"
                    passHref
                  >
                    <a target="_blank">
                      <Image
                        src={images.youtubeImg}
                        alt="linedin icon"
                        width={"28px"}
                        height={"32px"}
                      />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/profile.php?id=61553168891303" passHref>
                    <a target="_blank">
                      <Image
                        src={images.facebookImg}
                        alt="linedin icon"
                        width={"18px"}
                        height={"22px"}
                      />
                    </a>
                  </Link>
                </li>
              </ul>
              <div className="flex  mt-[25px] gap-[15px]">
                <div
                  className="cursor-pointer h-[50px] w-[140px] relative rounded-[4px] shadow-[0_4px_4px_#00000040]"
                  onClick={() => {
                    window.open(
                      "https://play.google.com/store/games?device=windows&utm_source=apac_med&hl=en-IN&utm_medium=hasem&utm_content=Oct0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-py-Evergreen-Oct0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700065205026385_creativeid_535350509687_device_c&gclid=EAIaIQobChMIo_PNnO3HggMVnpZLBR0oJAAtEAAYASAAEgJCZPD_BwE&gclsrc=aw.ds"
                    );
                  }}
                >
                  <Image
                    src={images.googlePlay}
                    alt="google-play"
                    layout={"fill"}
                  />
                </div>

                <div
                  className={
                    " cursor-pointer h-[50px] w-[140px] relative rounded-[4px] shadow-[0_4px_4px_#00000040]"
                  }
                  onClick={() => {
                    window.open(
                      "https://www.apple.com/in/store?afid=p238%7Csfo291LJq-dc_mtid_187079nc38483_pcrid_680861337494_pgrid_109516736059_pntwk_g_pchan__pexid__&cid=aos-IN-kwgo-brand--slid---product-"
                    );
                  }}
                >
                  <Image src={images.appStore} alt="appStore" layout={"fill"} />
                </div>
              </div>
            </div>
            {/* ===== about end ===== */}
            {/* ====== service start ==== */}
            <div className="flex flex-col justify-center w-1/2">
                  <div className="flex  justify-between w-full">

                    <div className={`max-w-[167px] w-full ${styles.service}`}>
                      <h3 className="font-bold text-[18px] leading-[22px] text-white">
                        {strings?.quickLink}
                      </h3>
                      <ul className={`${styles.serviceLink}`}>
                        <li>
                          <Link href={"https://vendor-dev.cachooapp.com/signup"}>
                            <a target="_blank">{strings?.joinSales}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/category"}>{strings?.categories}</Link>
                        </li>
                        <li>
                          <Link href={"/"}>{strings?.home}</Link>
                        </li>
                        <li>
                          {/* <Link href={""}>{strings?.referral_program}</Link> */}
                        </li>
                      </ul>
                    </div>
                    {/* ====== service end ==== */}
                    {/* ====== Company start ==== */}
                    
                    <div className={`max-w-[167px] w-full ${styles.company}`}>
                      <h3 className="font-bold text-[18px] leading-[22px] text-white">
                        {strings?.company}
                      </h3>
                      <ul className={`${styles.serviceLink}`}>
                        <li>
                          <Link href="/about">{strings?.about}</Link>
                          {/* <button onClick={() => router.push("/about")}>
                            {strings?.about}
                          </button> */}
                        </li>
                        <li>
                          <Link href="/terms-and-conditions">{strings?.terms}</Link>
                          {/* <button onClick={() => router.push("/terms-and-conditions")}>
                            {strings?.terms}
                          </button> */}
                        </li>
                        <li>
                          <Link href={"/privacy-policy"}>
                            {strings?.privacy_policy}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={`${styles.heartShape} text-center mt-[40px]`}>
                    {/* <Image
                      src={images.heart}
                      alt="heart_shape"
                      width="54.52px"
                      height={"54.52px"}
                    /> */}
                    <p className="font-semibold text-[16px] leading-[20px] text-center text-white mt-[25px]">
                      {`${strings?.copyright_cachoo} ©${currentYear}. ${strings.cachoo}`}
                    </p>
                  </div>
            </div>
           
            {/* ====== Company end ==== */}
           
            {/* ====== More end ==== */}
          </div>
      
        </div>
      </section>
    </>
  );
}

export default Footer;
