import styles from "../SalonDescription/SalonDescription.module.css";
import images from "../../../Assets/images";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import ProductTable from "./ProductTable/ProductTable";
import ServiceTable from "./ServiceTable/ServiceTable";
import { strings } from "src/Utils/Localization";
function SalonDescription() {
  return (
    <>
      <h5 className={styles.salonDescHead}>PDF</h5>
      <div className={styles.salonDescDiv}>
        <button className={styles.docDiv}>
          <div className={styles.docImg}>
            <Image src={images.documentCopy} alt="doc" />
          </div>
          <span className={styles.docSpan}>document_one.pdf</span>
        </button>
        <button className={styles.downldImg}>
          <Image src={images.download} alt="downld" />
        </button>
      </div>
      <div className={styles.tabDesign}>
        <Tab.Group>
          <Tab.List className={styles.tabList}>
            <Tab className={styles.prodTab}>Products</Tab>
            <Tab className={styles.prodTab}>{strings?.services}</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className={styles.productTable}>
                <ProductTable />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className={styles.productTable}>
                <ServiceTable />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}
export default SalonDescription;
