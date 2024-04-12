import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function confirm() {
      try {
        const requestData = {
          orderId: searchParams.get("orderId"),
          amount: searchParams.get("amount"),
          paymentKey: searchParams.get("paymentKey"),
        };

        const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

        const response = await fetch(
          "https://api.tosspayments.com/v1/payments/confirm",
          {
            method: "POST",
            headers: {
              Authorization: encryptedSecretKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        const json = await response.json();

        if (!response.ok) {
          navigate(`/reserve/fail?message=${json.message}&code=${json.code}`);
          return;
        }

        console.log(json);
      } catch (error) {
        console.error("Error confirming payment:", error);
        navigate(`/reserve/fail?code=500&message=Internal Server Error`);
      }
    }

    confirm();
  }, [navigate, searchParams]);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
      </div>
    </div>
  );
}
