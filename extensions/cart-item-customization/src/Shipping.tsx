import {
  reactExtension,
  Text,
  useApplyCartLinesChange,
  useShippingAddress,
  useCartLines
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useRef } from "react";

export default reactExtension('purchase.checkout.header.render-after', () => (
  <Extension />
));

const Extension = () => {
  const applyCartLinesChange = useApplyCartLinesChange();
  const shippingAddress = useShippingAddress();
  const shouldApplyshippingFee = useRef(false);
  const cartLines = useCartLines();

  useEffect(() => {
    shouldApplyshippingFee.current = true;
  }, [JSON.stringify(shippingAddress)]);

  useEffect(() => {
    if (shouldApplyshippingFee.current) {
      console.log('------ updateShippingFee Triggered ------');
      updateShippingFee();
      shouldApplyshippingFee.current = false;
    }
  }, [cartLines]);

  const updateShippingFee = async () => {
    let shippingFee: number | string;
    for (const item of cartLines) {
      shippingFee = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000);

      const result = await applyCartLinesChange({
        type: 'updateCartLine',
        id: item.id,
        attributes: [{ key: 'Shipping fee', value: `${formatVND(shippingFee)}` }]
      });
      console.log({ ...result, shippingFee });
    }
  };

  const formatVND = (num: number) => {
    return '₫' + num.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'symbol'
    }).replace(/[^\d.-]/g, '').replace('.', ',');
  };

  return (
    <Text visibility="hidden">Shipping Method</Text>
  );
};
