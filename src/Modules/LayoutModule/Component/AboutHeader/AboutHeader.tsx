import images from "src/Assets/images";
import Image from "next/image";
import { strings } from "src/Utils/Localization";

function AboutHeader() {
  return (
    <>
      <section className="bg-primary ssm:hidden sm:hidden">
        <div className={`bg-headColor `}>
          <div className={`flex flex-row py-[15px] px-[100px]`}>
            <div>
              <Image src={images.leftArrow} alt="left" />
            </div>
            <div className={`ml-[15px] mt-[2px]`}>
              <p className="text-[16px] font-[700]">{strings?.about}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AboutHeader;
