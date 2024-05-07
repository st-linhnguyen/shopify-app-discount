import {
  reactExtension,
  Text,
  useCartLineTarget,
  useApplyCartLinesChange,
  useShippingAddress,
  useSubscription,
  useApi,
  useDeliveryGroups,
  useDeliveryGroup
} from '@shopify/ui-extensions-react/checkout';
import { useEffect } from 'react';
import { CartLineItemApi } from '@shopify/ui-extensions/checkout';

export default reactExtension('purchase.checkout.cart-line-item.render-after', () => (
  <Extension />
));

const Extension = () => {
  const applyCartLinesChange = useApplyCartLinesChange();
  const {
    id
  } = useCartLineTarget();
  // const deliveryGroups = useDeliveryGroups();
  // const {
  //   selectedDeliveryOption,
  //   targetedCartLines,
  // } = useDeliveryGroup(deliveryGroups[0]);

  // // const temp = useDeliveryGroup(deliveryGroups[0]);


  // useEffect(() => {
  //   console.log(11111, selectedDeliveryOption);
  // }, [selectedDeliveryOption]);

  // useEffect(() => {
  //   console.log(22222, targetedCartLines[0]);
  // }, [targetedCartLines]);

  // console.log(111, shipping[0]);

  // useEffect(() => {
  //   const discount = Math.floor(Math.random() * (100 - 10 + 1) + 10);
  //   console.log('discount', discount);
  //   applyCartLinesChange({
  //     type: 'updateCartLine',
  //     id,
  //     attributes: [{ key: 'discount', value: `${discount}` }]
  //   }).then(res => console.log(res));
  // }, [JSON.stringify(address)]);

  return (
    <Text>Hello world</Text>
  );
};
