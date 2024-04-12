import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { getCookie } from "../../../common/util/cookieUtil";

const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "w45nqhBbc4qd16BKjixJm";

export default function Tosspayment({ reserve, onPaymentSuccess, closeModal }) {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price] = useState(reserve.r_total_price);
  const memberCookieValue = getCookie("member");

  const phoneNumber = memberCookieValue.m_phone.replace(/\D/g, "");

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          widgetClientKey,
          customerKey
        );
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  const handlePaymentRequest = async () => {
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: reserve.allProduct,
        customerName: memberCookieValue.m_name,
        customerEmail: memberCookieValue.m_email,
        customerMobilePhone: phoneNumber,
      });
      onPaymentSuccess();
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/* 결제하기 버튼 */}
      <button
        onClick={handlePaymentRequest}
        className="rounded p-4 m-2 text-xl w-40 text-white bg-blue-500"
      >
        결제하기
      </button>

      {/* 모달 닫기 버튼 */}
      <button
        onClick={closeModal}
        className="rounded p-4 m-2 text-xl w-40 text-white bg-blue-500"
      >
        결재창 닫기
      </button>
    </div>
  );
}
