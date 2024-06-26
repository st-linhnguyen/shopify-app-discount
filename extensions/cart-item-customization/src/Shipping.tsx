import {
  reactExtension,
  Text,
  useApplyCartLinesChange,
  useShippingAddress,
  useCartLines,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useRef } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

const Extension = () => {
  const applyCartLinesChange = useApplyCartLinesChange();
  const shippingAddress = useShippingAddress();
  const cartLines = useCartLines();
  const isUpdatingCartLine = useRef(false);
  const isUpdatedAddress = useRef(false);

  useEffect(() => {
    console.log("isUpdatingCartLine", isUpdatingCartLine.current);
    if (shippingAddress.countryCode && !isUpdatedAddress.current) {
      console.log("------ Address was changed ------");
      isUpdatedAddress.current = true;
      if (!isUpdatingCartLine.current) {
        console.log("------ Update Shipping Fee ------");
        updateShippingFee();
      }
    }
  }, [JSON.stringify(shippingAddress)]);

  useEffect(() => {
    if (!isUpdatingCartLine.current && isUpdatedAddress.current) {
      updateShippingFee();
    }
  }, [isUpdatingCartLine.current]);

  const updateShippingFee = async () => {
    isUpdatingCartLine.current = true;
    isUpdatedAddress.current = false;
    let shippingFee: number | string;
    let retriedTime = 0;
    for (const item of cartLines) {
      shippingFee = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
      let result = await updateCartLine(item.id);

      while (result.type === "error" && retriedTime < 3) {
        retriedTime += 1;
        console.log(
          `------ Retrying ${item.merchandise.title} ${retriedTime} time ------`
        );
        result = await updateCartLine(item.id);
      }

      console.log({ ...result, shippingFee, name: item.merchandise.title });
    }
    console.log("Update shouldApplyshippingFee");
    isUpdatingCartLine.current = false;
  };

  const updateCartLine = async (id: string) => {
    const shippingFee = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);
    const result = await applyCartLinesChange({
      type: "updateCartLine",
      id: id,
      attributes: [{ key: "Shipping fee", value: `${formatVND(shippingFee)}` }],
    });
    return result;
  };

  const formatVND = (num: number) => {
    return (
      "₫" +
      num
        .toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          currencyDisplay: "symbol",
        })
        .replace(/[^\d.-]/g, "")
        .replace(".", ",")
    );
  };

  return <Text visibility='hidden'>Shipping Method</Text>;
};
