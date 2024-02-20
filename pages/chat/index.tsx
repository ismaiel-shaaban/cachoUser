import React from "react";
import withProtectedRoute from "src/HOCs/withProtectedRoute";
import ChatBox from "src/Modules/ChatModule/Components/ChatBox/ChatBox";
import Layout from "src/Modules/LayoutModule/Component/Layout/Layout";

export function getServerSideProps(context: any) {
  const params = context.query;
  return {
    props: { params: params },
  };
}

function chatBox({ params }: any) {
  const {vendorId,vendorName}=params

  return (
    <>
      <Layout showNav={true} showBreadCrumbs={false} >
        <ChatBox vendorId={vendorId} vendorName={vendorName}/>
      </Layout>
    </>
  );
}

export default withProtectedRoute(chatBox);
