import React from "react";
import AboutTheVendor from "./AboutTheVendor/AboutTheVendor";
import AlsoDeals from "./AlsoDeals/AlsoDeals";
import Reviews from "./Reviews/Reviews";
import { Tab } from "@headlessui/react";
import styles from "./ProductTabList.module.css";
import {
  PRODUCT_DETAILS_DATA_RESPONSE,
  VENDOR_PRODUCTS_ITEMS,
} from "src/Modules/CategoryModule/Types/ResponseTypes";
import { strings } from "src/Utils/Localization";

type PRODUCT_PICTURE_PROPS = {
  vendorProducts: Array<VENDOR_PRODUCTS_ITEMS>;
  productDetails: PRODUCT_DETAILS_DATA_RESPONSE | undefined;
  isLoading: boolean;
};

function ProductTabList(props: PRODUCT_PICTURE_PROPS) {
  const { productDetails, vendorProducts, isLoading } = props;
  const vendorId = productDetails?.productData?.vendorId;
  return (
    <div className={styles.tabSection}>
      <Tab.Group>
        <Tab.List className={`${styles.tabList} flex gap-5`}>
          <Tab className="text-suvaGrey text-[17px] font-[400]">
            {strings?.about_the_vendor}
          </Tab>
          <Tab className="text-suvaGrey text-[17px] font-[400]">
          {strings?.also_deals_in}
          </Tab>
          <Tab className="text-suvaGrey text-[17px] font-[400]">{strings?.reviews}</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <AboutTheVendor
              productDetails={productDetails}
              isLoading={isLoading}
            />
          </Tab.Panel>
          <Tab.Panel>
            <AlsoDeals vendorProducts={vendorProducts} vendorId={vendorId}/>
          </Tab.Panel>
          <Tab.Panel>
            <Reviews productDetails={productDetails} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default ProductTabList;
