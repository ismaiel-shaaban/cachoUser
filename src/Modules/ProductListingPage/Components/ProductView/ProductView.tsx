import React from "react";
import ProductPicture from "./ProductPicture/ProductPicture";
import ProductTabList from "./ProductTabList/ProductTabList";
import styles from "./ProductView.module.css";
import useProductDetailsQuery from "src/Modules/CategoryModule/Hooks/useProductDetailsQuery";
import useVendorProductsQuery from "src/Modules/CategoryModule/Hooks/useVendorProductsQuery";
import Loader from "src/Components/Loader/Loader";


type PRODUCT_VIEW_PROPS = {
  productDetails: any;
  isLoading: boolean;
};

function ProductView(props: PRODUCT_VIEW_PROPS) {
  const { productDetails, isLoading } = props;

  const vendorId = productDetails?.productData?.vendorId;

  const vendorProductsQuery = useVendorProductsQuery(vendorId);

  const vendorProducts = vendorProductsQuery?.data?.data?.data?.list ?? [];

  const imageList = productDetails?.productData?.photos || [] || {};
  return (
    <>
      {isLoading && <Loader />}
      <section className="bg-sky py-[15px]">
        <div className={styles.warpView}>
          <div className={styles.productView}>
            <ProductPicture
              productDetails={productDetails}
              imageList={imageList}
              isLoading={isLoading}
            />
            <ProductTabList
              vendorProducts={vendorProducts}
              productDetails={productDetails}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductView;
