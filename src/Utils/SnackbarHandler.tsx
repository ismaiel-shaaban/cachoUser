import { toast } from "react-toastify";

class SnackbarHandler {
  errorToast = (text: string) => {
    toast(text, { position: "bottom-center", type: "error", style:{background: '#FE0303', color: '#fff', fontStyle: 'normal', fontWeight: 500, fontSize: '15px', 
  } });
  };
  
  successToast = (text: string) => {
    toast(text, { position: "bottom-center", type: "success", style: {background: '#88B13E', color: '#fff', fontStyle: 'normal', fontWeight: 500, fontSize: '15px', 
  } });
  };

  normalToast = (text: string) => {
    toast(text, { position: "bottom-center", type: "default" });
  };
  notificationToast = (notification: any, onClick: () => void) => {
    toast(
      <div className={"customToast"}>
        <h5 className="font-[400] text-[16px] text-[#000;]">{notification?.notification?.title ?? "Notification"}</h5>
        <h6 className="font-[400] text-[13px] text-[#3D3D3D;]">{notification?.notification?.body ?? "body"}</h6>
      </div>,
      {
        position: "top-right",
        type: "default",
        onClick,
        autoClose: 1000,
        hideProgressBar: true,
      }
    );
  };
}


export default new SnackbarHandler();
